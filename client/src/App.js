import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import Login from './components/auth/Login';
import DashboardHome from './components/dashboard/DashboardHome';
import PatientList from './components/patients/PatientList';
import PatientDetail from './components/patients/PatientDetail';
import PatientForm from './components/patients/PatientForm';
import PrivateRoute from './components/shared/PrivateRoute';
import AlertNotifications from './components/shared/AlertNotifications';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AlertNotifications />
        <Navbar />
        <div className="container">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/:id" element={<PatientDetail />} />
                <Route path="/add-patient" element={<PatientForm />} />
                <Route path="/edit-patient/:id" element={<PatientForm />} />
              </Route>
              {/* Add other routes here */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

