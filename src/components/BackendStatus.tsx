// src/components/BackendStatus.tsx
import React from 'react';

interface BackendStatusProps {
  apiUrl: string;
  onApiUrlChange: (url: string) => void;
  backendStatus: 'online' | 'offline' | 'unknown';
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  retryConnection: () => void;
  focusedInput: string;
  setFocusedInput: (field: string) => void;
}

const BackendStatus: React.FC<BackendStatusProps> = ({
  apiUrl,
  onApiUrlChange,
  backendStatus,
  isOfflineMode,
  toggleOfflineMode,
  retryConnection,
  focusedInput,
  setFocusedInput
}) => {
  const getStatusStyle = () => {
    switch (backendStatus) {
      case 'online':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'offline':
        return { backgroundColor: '#fef2f2', color: '#991b1b' };
      default:
        return { backgroundColor: '#fef3c7', color: '#92400e' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Backend:</span>
        <span style={{ fontSize: 12, fontWeight: 500, padding: '2px 8px', borderRadius: 12, ...getStatusStyle() }}>
          {backendStatus === 'online' ? 'Online' : backendStatus === 'offline' ? 'Offline' : 'Checking...'}
        </span>
        {backendStatus === 'offline' && (
          <button
            onClick={retryConnection}
            style={{ padding: '4px 8px', fontSize: 12, border: 'none', borderRadius: 4, backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}
          >
            Retry
          </button>
        )}
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>API URL</label>
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => onApiUrlChange(e.target.value)}
          onFocus={() => setFocusedInput('apiUrl')}
          onBlur={() => setFocusedInput('')}
          placeholder="http://localhost:3000"
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, outline: 'none', borderColor: focusedInput === 'apiUrl' ? '#2563eb' : '#d1d5db', boxShadow: focusedInput === 'apiUrl' ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none' }}
        />
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <input
          type="checkbox"
          checked={isOfflineMode}
          onChange={toggleOfflineMode}
          style={{ cursor: 'pointer' }}
        />
        Force offline mode (use mock data)
      </label>
    </div>
  );
};

export default BackendStatus;
