import React, { useContext } from 'react';
import { FirebaseContext } from './firebaseContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(FirebaseContext); // Get the current user from FirebaseContext

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the children (the protected content)
  return children;
};

export default ProtectedRoute;
