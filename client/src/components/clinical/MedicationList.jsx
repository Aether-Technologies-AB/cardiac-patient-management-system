import React, { useState, useEffect } from 'react';
import clinicalService from '../../services/clinical';
import './Clinical.css';

const MedicationList = ({ patientId }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await clinicalService.getMedicationsForPatient(patientId);
        setMedications(response.data.data);
      } catch (error) {
        console.error('Failed to fetch medications', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedications();
  }, [patientId]);

  if (loading) return <p>Loading medications...</p>;

  return (
    <div className="clinical-section">
      <h4>Medications</h4>
      {medications.length > 0 ? (
        <table className="clinical-table">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medications.map(med => (
              <tr key={med.id}>
                <td>{med.medication_name}</td>
                <td>{med.dosage}</td>
                <td>{med.frequency}</td>
                <td>{med.is_active ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medications prescribed.</p>
      )}
    </div>
  );
};

export default MedicationList;
