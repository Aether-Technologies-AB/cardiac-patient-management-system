import React, { useState, useEffect } from 'react';
import clinicalService from '../../services/clinical';
import './Clinical.css';

const VitalSigns = ({ patientId }) => {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await clinicalService.getVitalsForPatient(patientId);
        setVitals(response.data.data);
      } catch (error) {
        console.error('Failed to fetch vitals', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVitals();
  }, [patientId]);

  if (loading) return <p>Loading vital signs...</p>;

  return (
    <div className="clinical-section">
      <h4>Vital Signs</h4>
      {vitals.length > 0 ? (
        <table className="clinical-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>BP (Sys/Dia)</th>
              <th>Heart Rate</th>
              <th>Temp</th>
              <th>O2 Sat</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map(vital => (
              <tr key={vital.id}>
                <td>{new Date(vital.recorded_at).toLocaleDateString()}</td>
                <td>{`${vital.systolic_bp}/${vital.diastolic_bp}`}</td>
                <td>{vital.heart_rate}</td>
                <td>{vital.temperature}</td>
                <td>{vital.oxygen_saturation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vital signs recorded.</p>
      )}
    </div>
  );
};

export default VitalSigns;
