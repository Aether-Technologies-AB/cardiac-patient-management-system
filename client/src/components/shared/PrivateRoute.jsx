import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Or a spinner component
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
