// src/components/MessageAlert.tsx
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface MessageAlertProps {
  message: string;
  type: 'info' | 'success' | 'error';
}

const MessageAlert: React.FC<MessageAlertProps> = ({ message, type }) => {
  if (!message) return null;

  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className={`alert ${type === 'error' ? 'alert-error' : type === 'success' ? 'alert-success' : 'alert-info'}`}>
      <Icon className="icon-action" size={20} />
      <span>{message}</span>
    </div>
  );
};

export default MessageAlert;
