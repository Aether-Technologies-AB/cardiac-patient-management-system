# Cardiac Patient Management System

A comprehensive cardiac patient management system with CALM (Cardiac Assessment and Lifestyle Management) program integration, designed for healthcare professionals to track, monitor, and manage cardiac patients effectively.

## 🏥 Features

### Patient Management
- **Complete Patient Profiles**: Full demographic and medical information
- **CALM Program Integration**: Track patient enrollment and progress
- **Auto-calculated Age**: Automatically computed from date of birth
- **Risk Factor Assessment**: Comprehensive atherosclerotic risk factor tracking

### Clinical Data Management
- **Vital Signs Tracking**: Blood pressure, heart rate, temperature monitoring
- **Medication Management**: Prescription tracking and adherence monitoring
- **Diagnosis Records**: Cardiac condition documentation
- **Lab Results**: Test result management and trending
- **Procedures**: Medical procedure tracking

### Risk Factor Analysis
- **9 Key Risk Factors**: HTA, Diabetes, Dislipidemia, Tabaquismo, Sedentarismo, Obesidad, Trastornos del Sueño, Ansiedad/Depresión, Consumo de Alcohol
- **High-Risk Identification**: Automatic flagging of patients with 3+ risk factors
- **Visual Analytics**: Risk factor distribution charts and demographics

### Dashboard & Analytics
- **Real-time Metrics**: Live patient statistics and clinical data
- **Risk Visualization**: Interactive charts for risk factor distribution
- **Age Demographics**: Patient age group analysis
- **CALM Program Metrics**: Enrollment and participation tracking
- **Blood Pressure Trends**: Average BP calculations and monitoring

## 🛠 Tech Stack

### Frontend
- **React**: Modern, component-based UI framework
- **Recharts**: Interactive data visualization library
- **React Hook Form**: Form handling and validation
- **Axios**: HTTP client for API communication
- **CSS Grid/Flexbox**: Responsive layout design

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **Sequelize**: ORM for database management
- **JWT**: JSON Web Token authentication
- **PostgreSQL**: Robust relational database

### Infrastructure
- **Docker**: Containerization support
- **GitHub Actions**: CI/CD pipeline
- **Environment Variables**: Secure configuration management

## 📊 Key Metrics

The system provides comprehensive cardiac metrics including:
- Total patient count and demographics
- High-risk patient identification (57% of current patients)
- Average blood pressure tracking (149/90 mmHg)
- CALM program enrollment (86% participation)
- Risk factor distribution analysis

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aether-Technologies-AB/cardiac-patient-management-system.git
   cd cardiac-patient-management-system
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   npm install
   
   # Frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb cardiac_management
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Database Migration**
   ```bash
   # Run database setup and seed data
   node create-tables.js
   node seed-simple.js
   ```

5. **Start the Application**
   ```bash
   # Start backend (port 5001)
   npm run dev:backend
   
   # Start frontend (port 3001) - in a new terminal
   npm run dev:frontend
   ```

### Default Credentials
- **Email**: admin@cardiac.com
- **Password**: admin123

## 📁 Project Structure

```
cardiac-patient-management-system/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── models/           # Sequelize models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Authentication middleware
│   │   └── config/          # Database configuration
│   └── server.js             # Backend entry point
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── context/         # React contexts
│   └── public/              # Static assets
├── scripts/                  # Database scripts
└── docs/                    # Documentation
```

## 🔧 Available Scripts

- `npm run dev:backend` - Start backend development server
- `npm run dev:frontend` - Start frontend development server
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `node create-tables.js` - Initialize database tables
- `node seed-simple.js` - Seed with sample data

## 🏥 CALM Program Features

The CALM (Cardiac Assessment and Lifestyle Management) program integration includes:

### Patient Enrollment
- Automatic enrollment tracking
- Program start date monitoring
- Participation percentage calculation

### Risk Assessment
- Comprehensive risk factor evaluation
- High-risk patient identification
- Risk factor distribution analysis

### Progress Monitoring
- Vital signs trending
- Medication adherence tracking
- Lifestyle modification support

## 📈 Data Models

### Patient Model
- **Demographics**: Name, DOB, gender, contact info
- **Social Factors**: Religion, education, occupation, activity level
- **Risk Factors**: 9 atherosclerotic risk factors
- **CALM Data**: Program enrollment and tracking

### Clinical Models
- **Vital Signs**: BP, heart rate, temperature
- **Medications**: Prescriptions and adherence
- **Diagnoses**: Cardiac conditions
- **Lab Results**: Test results and trends

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Doctor, nurse, staff, admin roles
- **Input Validation**: Comprehensive form validation
- **SQL Injection Protection**: ORM-based database queries

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive tablet layouts
- **Desktop Experience**: Full-featured desktop interface
- **Cross-Browser**: Chrome, Firefox, Safari, Edge support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Healthcare professionals who provided requirements
- Open-source community for excellent tools
- Cardiac patients who inspired this system

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Built with ❤️ for cardiac healthcare professionals**
