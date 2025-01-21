import { useNavigate } from "react-router-dom";
import { FirebaseContext } from '../firebaseContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from "react";
import { useTable } from 'react-table';

function Scoreboard() {
  const { firestore, user } = useContext(FirebaseContext);
  const [score, setScore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getScores = async () => {
      if (user) {
        const collectionRef = collection(firestore, 'users');
        const q = query(collectionRef, where("uid", "==", user.uid));

        try {
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();

            if (data.scores) {
              console.log("Scores: ", data.scores);
              setScore(data.scores); // Set the scores from Firestore
            }
          } else {
            setError('No scores found for this user.');
          }
        } catch (error) {
          console.error("Error fetching scores: ", error);
          setError('Error fetching scores. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user logged in.');
        setLoading(false);
      }
    };

    getScores(); // Call the async function inside useEffect
  }, [user, firestore]);

  // React Table setup
  const columns = React.useMemo(
    () => [
      {
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => new Date(value).toLocaleString(), // Format date
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: score });

  return (
    <div>
      <h1>Score Board</h1>
      {loading ? (
        <p>Loading scores...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid #ddd' }}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="2">No scores available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export default Scoreboard;
