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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Backend:</span>
        <span className={`badge ${backendStatus === 'online' ? 'badge-success' : backendStatus === 'offline' ? 'badge-error' : 'badge-warning'}`}>
          {backendStatus === 'online' ? 'Online' : backendStatus === 'offline' ? 'Offline' : 'Checking...'}
        </span>
        {backendStatus === 'offline' && (
          <button className="btn-secondary">
            Retry
          </button>
        )}
      </div>
      <div>
        <label className="form-label">API URL</label>
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => onApiUrlChange(e.target.value)}
          onFocus={() => setFocusedInput('apiUrl')}
          onBlur={() => setFocusedInput('')}
          placeholder="http://localhost:3000"
          className={`form-input ${focusedInput === 'apiUrl' ? 'form-input-focused' : ''}`}
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
