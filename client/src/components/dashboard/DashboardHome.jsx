import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAuth from '../../hooks/useAuth';
import { mockApi } from '../../services/api';

const DashboardHome = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDiagnoses: 0,
    totalVitals: 0,
    totalLabTests: 0,
    criticalPatients: 0,
    highRiskPercentage: 0,
    clinicalMetrics: {
      totalVitalsRecorded: 0,
      totalLabTests: 0,
      totalDiagnoses: 0,
      criticalLabResults: 0,
      abnormalVitals: 0,
      medicationsManaged: 0
    },
    medicationStats: {
      antihypertensives: 0,
      anticoagulants: 0,
      statins: 0,
      diabetic_meds: 0,
      beta_blockers: 0
    },
    riskFactors: {},
    highRiskPatients: 0,
    recentActivity: [],
    patientDistribution: {
      byGender: {},
      byAgeGroup: {},
      byCondition: {}
    },
    avgSystolicBP: 0,
    avgDiastolicBP: 0,
    bpReadingsCount: 0,
    ageDistribution: [],
    calmProgramEnrollment: 0,
    calmProgramPercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use mock API for testing
      const response = await mockApi.get('/mock-dashboard/stats');
      console.log('Dashboard stats:', response.data);
      if (response.data.success) {
        setStats(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  // Prepare risk factor data for pie chart
  const riskFactorData = stats.riskFactors ? [
    { name: 'HTA', value: stats.riskFactors.hta || 0, color: '#ef4444' },
    { name: 'Diabetes', value: stats.riskFactors.diabetes || 0, color: '#f59e0b' },
    { name: 'Dislipidemia', value: stats.riskFactors.dislipidemia || 0, color: '#eab308' },
    { name: 'Tabaquismo', value: stats.riskFactors.smoking || 0, color: '#84cc16' },
    { name: 'Sedentarismo', value: stats.riskFactors.sedentary || 0, color: '#06b6d4' },
    { name: 'Obesidad', value: stats.riskFactors.obesity || 0, color: '#8b5cf6' },
    { name: 'Ansiedad', value: stats.riskFactors.anxiety || 0, color: '#ec4899' },
    { name: 'Alcohol', value: stats.riskFactors.alcohol || 0, color: '#6b7280' }
  ].filter(item => item.value > 0) : [];

  // Prepare age distribution data
  const ageData = stats.ageDistribution ? stats.ageDistribution.map(item => ({
    ageGroup: item.age_group,
    count: parseInt(item.count)
  })) : [];

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
            🏥 Sistema de Gestión de Pacientes Cardíacos
          </h1>
          <p style={{ color: '#6b7280' }}>Bienvenido, Dr. Admin</p>
        </div>
        <button 
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Total Pacientes</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalPatients}</p>
              <p style={{ color: '#22c55e', fontSize: '14px', marginTop: '4px' }}>Pacientes cardíacos activos</p>
            </div>
            <div style={{ fontSize: '36px' }}>👥</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Pacientes de Alto Riesgo</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>{stats.highRiskPatients}</p>
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{stats.highRiskPercentage}% del total</p>
            </div>
            <div style={{ fontSize: '36px' }}>⚠️</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Presión Arterial Promedio</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{stats.avgSystolicBP}/{stats.avgDiastolicBP}</p>
              <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Basado en {stats.bpReadingsCount} lecturas</p>
            </div>
            <div style={{ fontSize: '36px' }}>💓</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Programa CALM</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>{stats.calmProgramEnrollment}</p>
              <p style={{ color: '#22c55e', fontSize: '14px', marginTop: '4px' }}>{stats.calmProgramPercentage}% inscritos</p>
            </div>
            <div style={{ fontSize: '36px' }}>🫀</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Risk Factors Distribution */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
            📊 Distribución de Factores de Riesgo
          </h3>
          {riskFactorData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskFactorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskFactorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No hay factores de riesgo registrados
            </div>
          )}
        </div>

        {/* Age Distribution */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
            👥 Distribución por Edad
          </h3>
          {ageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="ageGroup" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No hay datos de edad disponibles
            </div>
          )}
        </div>
      </div>

      {/* Clinical Summary */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
          📋 Resumen Clínico
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>Diagnósticos Totales</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalDiagnoses}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>Lecturas de Signos Vitales</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalVitals}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>Medicamentos Activos</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalMedications}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>➕</div>
          <div style={{ fontWeight: '600', color: '#1f2937' }}>Agregar Paciente</div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>Registrar nuevo paciente cardíaco</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📋</div>
          <div style={{ fontWeight: '600', color: '#1f2937' }}>Ver Pacientes</div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>Explorar todos los registros</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontWeight: '600', color: '#1f2937' }}>Análisis</div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>Ver informes detallados</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
