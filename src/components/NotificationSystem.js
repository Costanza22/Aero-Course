import React, { useState, useEffect } from 'react';
import './NotificationSystem.css';

const NotificationSystem = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    // Carregar notificações salvas
    const savedNotifications = localStorage.getItem('aerocourse_notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // Verificar permissão de notificações
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Simular notificações automáticas
    const interval = setInterval(() => {
      checkForNewNotifications();
    }, 30000); // Verificar a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('aerocourse_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const checkForNewNotifications = () => {
    const now = new Date();
    const lastLogin = localStorage.getItem('last_login');
    
    // Simular notificações baseadas no tempo
    if (!lastLogin || (now - new Date(lastLogin)) > 24 * 60 * 60 * 1000) {
      addNotification({
        id: Date.now(),
        type: 'reminder',
        title: 'Lembrete de Estudo',
        message: 'Não esqueça de continuar seus estudos! Há novos módulos aguardando.',
        timestamp: now,
        read: false
      });
    }

    // Verificar progresso e sugerir próximos passos
    const progress = JSON.parse(localStorage.getItem('aerocourse_progress') || '[]');
    if (progress.length > 0 && progress.length < 6) {
      addNotification({
        id: Date.now() + 1,
        type: 'progress',
        title: 'Continue seu Progresso',
        message: `Você completou ${progress.length} de 6 módulos. Continue assim!`,
        timestamp: now,
        read: false
      });
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Manter apenas 10 notificações
    
    // Enviar notificação push se permitido
    if (permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  };

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        addNotification({
          id: Date.now(),
          type: 'system',
          title: 'Notificações Ativadas',
          message: 'Você receberá notificações sobre novos módulos e lembretes.',
          timestamp: new Date(),
          read: false
        });
      }
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder': return '⏰';
      case 'progress': return '📈';
      case 'system': return '⚙️';
      case 'new_module': return '🆕';
      case 'achievement': return '🏆';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'reminder': return '#ffd700';
      case 'progress': return '#4ade80';
      case 'system': return '#2a5298';
      case 'new_module': return '#f97316';
      case 'achievement': return '#a855f7';
      default: return '#6b7280';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-system">
      <div className="notification-toggle">
        <button 
          className="notification-btn"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          🔔
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
      </div>

      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notificações</h3>
            <div className="notification-actions">
              <button 
                className="action-btn"
                onClick={markAllAsRead}
                title="Marcar todas como lidas"
              >
                ✓
              </button>
              <button 
                className="action-btn"
                onClick={clearAllNotifications}
                title="Limpar todas"
              >
                🗑️
              </button>
            </div>
          </div>

          {permission !== 'granted' && (
            <div className="permission-request">
              <p>Ative as notificações para receber lembretes e atualizações!</p>
              <button 
                className="permission-btn"
                onClick={requestPermission}
              >
                Ativar Notificações
              </button>
            </div>
          )}

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div 
                    className="notification-icon"
                    style={{ backgroundColor: getNotificationColor(notification.type) }}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <button 
                    className="delete-notification"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem; 