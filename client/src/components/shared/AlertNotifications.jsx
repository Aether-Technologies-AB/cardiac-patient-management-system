import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import './AlertNotifications.css';

const AlertNotifications = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notification-container">
      {notifications.map((notif, index) => (
        <div key={index} className="notification-toast">
          <strong>{notif.type.replace('_', ' ')}</strong>
          <p>{notif.payload.message}</p>
        </div>
      ))}
    </div>
  );
};

export default AlertNotifications;
