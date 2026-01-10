import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import './PatientForm.css';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const fetchPatient = async () => {
        try {
          const response = await patientService.getPatient(id);
          const patient = response.data.data;
          // Set form values for editing
          Object.keys(patient).forEach(key => {
            setValue(key, patient[key]);
          });
        } catch (error) {
          console.error('Failed to fetch patient data', error);
        }
      };
      fetchPatient();
    }
  }, [id, isEditing, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await patientService.updatePatient(id, data);
      } else {
        await patientService.createPatient(data);
      }
      navigate('/patients');
    } catch (error) {
      console.error('Failed to save patient data', error);
    }
  };

  return (
    <div className="patient-form-container">
      <h2>{isEditing ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
        
        {/* Basic Information */}
        <div className="form-section">
          <h3>Información Básica</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nombres</label>
              <input {...register('first_name', { required: true })} />
              {errors.first_name && <span className="error">Este campo es requerido</span>}
            </div>

            <div className="form-group">
              <label>Apellidos</label>
              <input {...register('last_name', { required: true })} />
              {errors.last_name && <span className="error">Este campo es requerido</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>DNI</label>
              <input {...register('dni', { required: true })} />
              {errors.dni && <span className="error">Este campo es requerido</span>}
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input type="date" {...register('date_of_birth', { required: true })} />
              {errors.date_of_birth && <span className="error">Este campo es requerido</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Sexo</label>
              <select {...register('gender')}>
                <option value="">Seleccionar...</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de Sangre</label>
              <select {...register('blood_type')}>
                <option value="">Seleccionar...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </div>

        {/* Personal & Social Information */}
        <div className="form-section">
          <h3>Información Personal y Social</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Religión</label>
              <input {...register('religion')} placeholder="Ej: Católica, Evangélica, etc." />
            </div>

            <div className="form-group">
              <label>Estado Civil</label>
              <select {...register('marital_status')}>
                <option value="">Seleccionar...</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viudo">Viudo</option>
                <option value="Conviviente">Conviviente</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Grado de Instrucción</label>
              <select {...register('education_level')}>
                <option value="">Seleccionar...</option>
                <option value="Sin educación">Sin educación</option>
                <option value="Primaria Incompleta">Primaria Incompleta</option>
                <option value="Primaria Completa">Primaria Completa</option>
                <option value="Secundaria Incompleta">Secundaria Incompleta</option>
                <option value="Secundaria Completa">Secundaria Completa</option>
                <option value="Superior Incompleta">Superior Incompleta</option>
                <option value="Superior Completa">Superior Completa</option>
                <option value="Universitaria Incompleta">Universitaria Incompleta</option>
                <option value="Universitaria Completa">Universitaria Completa</option>
                <option value="Posgrado">Posgrado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ciudad de Origen</label>
              <input {...register('city_of_origin')} placeholder="Ej: Lima, Arequipa, etc." />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ocupación</label>
              <input {...register('occupation')} placeholder="Ej: Jubilado, Profesor, etc." />
            </div>

            <div className="form-group">
              <label>Nivel de Actividad Física</label>
              <select {...register('physical_activity_level')}>
                <option value="">Seleccionar...</option>
                <option value="Sedentario">Sedentario</option>
                <option value="Ligera">Ligera</option>
                <option value="Moderada">Moderada</option>
                <option value="Intensa">Intensa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-section">
          <h3>Información de Contacto</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              <input {...register('phone')} placeholder="+51 987 654 321" />
            </div>

            <div className="form-group">
              <label>WhatsApp</label>
              <input {...register('whatsapp')} placeholder="+51 987 654 321" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" {...register('email')} placeholder="correo@ejemplo.com" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Dirección Completa</label>
            <input {...register('address')} placeholder="Av. Arequipa 1234, Lince, Lima, Perú" />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="form-section">
          <h3>Contacto de Emergencia</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre del Contacto</label>
              <input {...register('emergency_contact_name')} placeholder="Nombre completo" />
            </div>

            <div className="form-group">
              <label>Teléfono de Emergencia</label>
              <input {...register('emergency_contact_phone')} placeholder="+51 987 654 321" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Relación con el Paciente</label>
              <select {...register('emergency_contact_relationship')}>
                <option value="">Seleccionar...</option>
                <option value="Esposo/a">Esposo/a</option>
                <option value="Hijo/a">Hijo/a</option>
                <option value="Padre/Madre">Padre/Madre</option>
                <option value="Hermano/a">Hermano/a</option>
                <option value="Tío/a">Tío/a</option>
                <option value="Primo/a">Primo/a</option>
                <option value="Amigo/a">Amigo/a</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="form-section">
          <h3>Información de Seguro</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Proveedor de Seguro</label>
              <input {...register('insurance_provider')} placeholder="Ej: EsSalud, Pacifico, etc." />
            </div>

            <div className="form-group">
              <label>Número de Póliza</label>
              <input {...register('insurance_number')} placeholder="Número de seguro" />
            </div>
          </div>
        </div>

        {/* CALM Program Information */}
        <div className="form-section">
          <h3>Programa CALM</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Ingreso al Programa CALM</label>
              <input type="date" {...register('calm_program_date')} />
            </div>
          </div>
        </div>

        {/* Atherosclerotic Risk Factors */}
        <div className="form-section">
          <h3>Factores de Riesgo Aterosclerótico</h3>
          <div className="risk-factors-form">
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('hta')} />
                <span>HTA (Hipertensión Arterial)</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('diabetes_mellitus')} />
                <span>Diabetes Mellitus</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('dislipidemia')} />
                <span>Dislipidemia</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('tabaquismo')} />
                <span>Tabaquismo</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('sedentarismo')} />
                <span>Sedentarismo</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('obesidad_sobrepeso')} />
                <span>Obesidad/Sobrepeso</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('trastornos_sueño')} />
                <span>Trastornos del sueño (ronquido, apnea probable)</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('ansiedad_depresion')} />
                <span>Ansiedad / Depresión</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('consumo_alcohol')} />
                <span>Consumo de alcohol</span>
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {isEditing ? 'Actualizar Paciente' : 'Crear Paciente'}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
