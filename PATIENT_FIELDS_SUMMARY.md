# Patient Data Fields - CALM Program

## Basic Information
- **Nombre y apellidos** - first_name, last_name
- **Fecha de nacimiento** - date_of_birth
- **Edad (autocalculada)** - age (virtual field)
- **Sexo** - gender
- **DNI** - dni (unique identifier)

## Personal & Social Information
- **Religión** - religion
- **Estado civil** - marital_status
- **Grado de instrucción** - education_level
- **Ciudad de origen** - city_of_origin
- **Dirección completa** - address
- **Ocupación** - occupation
- **Nivel de actividad física** - physical_activity_level

## Contact Information
- **Teléfono** - phone
- **WhatsApp** - whatsapp
- **Correo** - email
- **Foto del paciente** - photo_url
- **Contacto de emergencia** - emergency_contact_name
- **Teléfono de emergencia** - emergency_contact_phone
- **Relación con contacto** - emergency_contact_relationship

## Medical Information
- **Tipo de sangre** - blood_type
- **Proveedor de seguro** - insurance_provider
- **Número de seguro** - insurance_number

## CALM Program Specific
- **Fecha de ingreso al Programa CALM** - calm_program_date

## System Fields
- **ID del paciente** - id (UUID)
- **Creado por** - created_by (user UUID)
- **Fecha de creación** - created_at
- **Fecha de actualización** - updated_at

## Features

### Auto-cálculo de Edad
The system automatically calculates the patient's age based on their date of birth:
```javascript
Age = Current Year - Birth Year
Adjustment if birthday hasn't occurred this year yet
```

### Example Patient Data
```json
{
  "first_name": "Juan",
  "last_name": "Perez",
  "age": 70,
  "date_of_birth": "1955-05-15",
  "gender": "male",
  "religion": "Católica",
  "marital_status": "Casado",
  "education_level": "Secundaria Completa",
  "city_of_origin": "Lima",
  "occupation": "Jubilado - Ex Contador",
  "physical_activity_level": "Sedentario",
  "phone": "+51 987 654 321",
  "whatsapp": "+51 987 654 321",
  "email": "juan.perez@email.com",
  "photo_url": "/uploads/patients/juan_perez.jpg",
  "emergency_contact_name": "Maria Perez",
  "emergency_contact_phone": "+51 987 654 322",
  "emergency_contact_relationship": "Esposa",
  "calm_program_date": "2025-01-15"
}
```

## API Usage

### Get all patients with new fields
```bash
GET /api/patients
Authorization: Bearer <token>
```

### Create new patient with all fields
```bash
POST /api/patients
Authorization: Bearer <token>
Content-Type: application/json

{
  "dni": "12345678",
  "first_name": "Juan",
  "last_name": "Perez",
  "date_of_birth": "1955-05-15",
  "gender": "male",
  "religion": "Católica",
  "marital_status": "Casado",
  "education_level": "Secundaria Completa",
  "city_of_origin": "Lima",
  "occupation": "Jubilado - Ex Contador",
  "physical_activity_level": "Sedentario",
  "phone": "+51 987 654 321",
  "whatsapp": "+51 987 654 321",
  "email": "juan.perez@email.com",
  "photo_url": "/uploads/patients/juan_perez.jpg",
  "address": "Av. Arequipa 2341, Lince, Lima, Peru",
  "emergency_contact_name": "Maria Perez",
  "emergency_contact_phone": "+51 987 654 322",
  "emergency_contact_relationship": "Esposa",
  "calm_program_date": "2025-01-15"
}
```

## Database Schema
The patients table now includes all the new fields with appropriate data types:
- VARCHAR for text fields
- DATE for dates
- UUID for relationships
- Auto-calculated age as virtual field
