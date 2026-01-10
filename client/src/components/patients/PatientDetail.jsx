import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import './PatientDetail.css';
import VitalSigns from '../clinical/VitalSigns';
import MedicationList from '../clinical/MedicationList';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const response = await patientService.getPatient(id);
        setPatient(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) return <p>Loading patient details...</p>;
  if (error) return <p>Error fetching patient details: {error.message}</p>;
  if (!patient) return <p>No patient found.</p>;

  return (
    <div className="patient-detail-container">
      <h2>{`${patient.first_name} ${patient.last_name}`}</h2>
      
      {/* Basic Information */}
      <div className="patient-section">
        <h3>Información Básica</h3>
        <div className="patient-info-grid">
          <div className="info-item"><strong>DNI:</strong> {patient.dni}</div>
          <div className="info-item"><strong>Edad:</strong> {patient.age} años</div>
          <div className="info-item"><strong>Fecha de Nacimiento:</strong> {patient.date_of_birth}</div>
          <div className="info-item"><strong>Sexo:</strong> {patient.gender}</div>
          <div className="info-item"><strong>Tipo de Sangre:</strong> {patient.blood_type}</div>
        </div>
      </div>

      {/* Personal & Social Information */}
      <div className="patient-section">
        <h3>Información Personal y Social</h3>
        <div className="patient-info-grid">
          <div className="info-item"><strong>Religión:</strong> {patient.religion || 'No especificado'}</div>
          <div className="info-item"><strong>Estado Civil:</strong> {patient.marital_status || 'No especificado'}</div>
          <div className="info-item"><strong>Grado de Instrucción:</strong> {patient.education_level || 'No especificado'}</div>
          <div className="info-item"><strong>Ciudad de Origen:</strong> {patient.city_of_origin || 'No especificado'}</div>
          <div className="info-item"><strong>Ocupación:</strong> {patient.occupation || 'No especificado'}</div>
          <div className="info-item"><strong>Nivel de Actividad Física:</strong> {patient.physical_activity_level || 'No especificado'}</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="patient-section">
        <h3>Información de Contacto</h3>
        <div className="patient-info-grid">
          <div className="info-item"><strong>Teléfono:</strong> {patient.phone}</div>
          <div className="info-item"><strong>WhatsApp:</strong> {patient.whatsapp || 'No especificado'}</div>
          <div className="info-item"><strong>Correo:</strong> {patient.email}</div>
          <div className="info-item full-width"><strong>Dirección:</strong> {patient.address}</div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="patient-section">
        <h3>Contacto de Emergencia</h3>
        <div className="patient-info-grid">
          <div className="info-item"><strong>Nombre:</strong> {patient.emergency_contact_name}</div>
          <div className="info-item"><strong>Teléfono:</strong> {patient.emergency_contact_phone}</div>
          <div className="info-item"><strong>Relación:</strong> {patient.emergency_contact_relationship || 'No especificado'}</div>
        </div>
      </div>

      {/* Insurance Information */}
      <div className="patient-section">
        <h3>Información de Seguro</h3>
        <div className="patient-info-grid">
          <div className="info-item"><strong>Proveedor:</strong> {patient.insurance_provider}</div>
          <div className="info-item"><strong>Número de Póliza:</strong> {patient.insurance_number}</div>
        </div>
      </div>

      {/* CALM Program Information */}
      <div className="patient-section">
        <h3>Programa CALM</h3>
        <div className="patient-info-grid">
          <div className="info-item"><strong>Fecha de Ingreso:</strong> {patient.calm_program_date || 'No especificado'}</div>
        </div>
      </div>

      {/* Atherosclerotic Risk Factors */}
      <div className="patient-section">
        <h3>Factores de Riesgo Aterosclerótico</h3>
        <div className="risk-factors-grid">
          <div className={`risk-factor ${patient.hta ? 'present' : 'absent'}`}>
            <strong>HTA:</strong> {patient.hta ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.diabetes_mellitus ? 'present' : 'absent'}`}>
            <strong>Diabetes Mellitus:</strong> {patient.diabetes_mellitus ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.dislipidemia ? 'present' : 'absent'}`}>
            <strong>Dislipidemia:</strong> {patient.dislipidemia ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.tabaquismo ? 'present' : 'absent'}`}>
            <strong>Tabaquismo:</strong> {patient.tabaquismo ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.sedentarismo ? 'present' : 'absent'}`}>
            <strong>Sedentarismo:</strong> {patient.sedentarismo ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.obesidad_sobrepeso ? 'present' : 'absent'}`}>
            <strong>Obesidad/Sobrepeso:</strong> {patient.obesidad_sobrepeso ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.trastornos_sueño ? 'present' : 'absent'}`}>
            <strong>Trastornos del sueño:</strong> {patient.trastornos_sueño ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.ansiedad_depresion ? 'present' : 'absent'}`}>
            <strong>Ansiedad/Depresión:</strong> {patient.ansiedad_depresion ? 'Sí' : 'No'}
          </div>
          <div className={`risk-factor ${patient.consumo_alcohol ? 'present' : 'absent'}`}>
            <strong>Consumo de alcohol:</strong> {patient.consumo_alcohol ? 'Sí' : 'No'}
          </div>
        </div>
      </div>

      {/* Clinical Data */}
      <div className="patient-section">
        <h3>Datos Clínicos</h3>
        <VitalSigns patientId={id} />
        <MedicationList patientId={id} />
      </div>
    </div>
  );
};

export default PatientDetail;
