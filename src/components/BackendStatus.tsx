// src/components/BackendStatus.tsx
import React from 'react';

interface BackendStatusProps {
  backendStatus: 'online' | 'offline' | 'unknown';
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  retryConnection: () => void;
}

const BackendStatus: React.FC<BackendStatusProps> = ({
  backendStatus,
  isOfflineMode,
  toggleOfflineMode,
  retryConnection,
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
