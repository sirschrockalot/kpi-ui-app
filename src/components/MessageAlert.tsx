// src/components/MessageAlert.tsx
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface MessageAlertProps {
  message: string;
  type: 'info' | 'success' | 'error';
}

const MessageAlert: React.FC<MessageAlertProps> = ({ message, type }) => {
  if (!message) return null;

  const getStyle = () => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: '#fef2f2',
          borderColor: '#dc2626',
          color: '#991b1b'
        };
      case 'success':
        return {
          backgroundColor: '#dcfce7',
          borderColor: '#059669',
          color: '#047857'
        };
      default:
        return {
          backgroundColor: '#dbeafe',
          borderColor: '#2563eb',
          color: '#1d4ed8'
        };
    }
  };

  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div
      style={{
        borderLeft: '4px solid',
        padding: 16,
        marginBottom: 24,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        ...getStyle()
      }}
    >
      <Icon size={20} />
      <span>{message}</span>
    </div>
  );
};

export default MessageAlert;
