import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li>Appointments</li>
        <li>Admin</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
