import React from 'react';
import usePatients from '../../hooks/usePatients';
import { Link } from 'react-router-dom';
import './PatientList.css';

const PatientList = () => {
  const { patients, loading, error } = usePatients();

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>Error fetching patients: {error.message}</p>;

  return (
    <div className="patient-list-container">
      <div className="list-header"><h2>Patients</h2><Link to="/add-patient" className="add-btn">Add New Patient</Link></div>
      <table className="patient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DNI</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{`${patient.first_name} ${patient.last_name}`}</td>
              <td>{patient.dni}</td>
              <td>{patient.date_of_birth}</td>
              <td>
                <Link to={`/patients/${patient.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
