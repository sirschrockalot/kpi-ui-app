import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Send, Activity, AlertCircle, CheckCircle, RefreshCw, Server, Wifi, MessageSquare } from 'lucide-react';

// Type definitions
interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

interface StatusResponse {
  service: string;
  mode: string;
  timestamp: string;
  excludedUsers: string[];
  endpoints: Record<string, string>;
}

interface ConnectionsResponse extends ApiResponse {
  connections: {
    slack: string;
    aircall: string;
  };
}

interface CustomReportData {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  reportName: string;
}

interface CustomReportPayload {
  startTime: string;
  endTime: string;
  reportName: string;
}

type MessageType = 'info' | 'success' | 'error';

interface MessageAlertProps {
  message: string;
  type: MessageType;
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '24px',
    marginBottom: '24px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    margin: 0
  },
  subtitle: {
    color: '#6b7280',
    marginTop: '8px',
    fontSize: '1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px'
  },
  gridCustom: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  button: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  buttonPrimary: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  buttonSuccess: {
    backgroundColor: '#059669',
    color: 'white'
  },
  buttonPurple: {
    backgroundColor: '#7c3aed',
    color: 'white'
  },
  buttonOrange: {
    backgroundColor: '#ea580c',
    color: 'white'
  },
  buttonIndigo: {
    backgroundColor: '#4f46e5',
    color: 'white'
  },
  buttonRed: {
    backgroundColor: '#dc2626',
    color: 'white'
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  inputFocus: {
    borderColor: '#2563eb',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  },
  statusBox: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px'
  },
  statusTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px',
    fontSize: '14px'
  },
  statusContent: {
    fontSize: '14px',
    color: '#6b7280',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  badge: {
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  badgeSuccess: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  badgeError: {
    backgroundColor: '#fef2f2',
    color: '#991b1b'
  },
  alert: {
    borderLeft: '4px solid',
    padding: '16px',
    marginBottom: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  },
  alertInfo: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
    color: '#1d4ed8'
  },
  alertSuccess: {
    backgroundColor: '#dcfce7',
    borderColor: '#059669',
    color: '#047857'
  },
  alertError: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
    color: '#991b1b'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px'
  },
  apiUrlContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  reportRange: {
    fontSize: '14px',
    color: '#6b7280'
  },
  customReportFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  icon: {
    marginRight: '8px'
  },
  spin: {
    animation: 'spin 1s linear infinite'
  }
};

const DEFAULT_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:3000';
const JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN;

const AircallSlackUI: React.FC = () => {
  const [apiUrl, setApiUrl] = useState<string>(DEFAULT_API_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [connections, setConnections] = useState<ConnectionsResponse | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [focusedInput, setFocusedInput] = useState<string>('');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline' | 'unknown'>('unknown');
  
  // Custom report form state
  const [customReport, setCustomReport] = useState<CustomReportData>({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    reportName: ''
  });

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  // Initialize with current date and check backend status
  useEffect(() => {
    const today = getCurrentDate();
    setCustomReport(prev => ({
      ...prev,
      startDate: today,
      endDate: today,
      startTime: '06:00',
      endTime: '20:00'
    }));
    
    // Check backend availability on startup
    checkBackendAvailability();
  }, []);

  // Periodically check backend status
  useEffect(() => {
    const interval = setInterval(checkBackendAvailability, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [apiUrl]);

  const checkBackendAvailability = async (): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (response.ok) {
        setBackendStatus('online');
        if (isOfflineMode) {
          setIsOfflineMode(false);
          showMessage('Backend service is back online!', 'success');
        }
      } else {
        throw new Error('Backend responded with error');
      }
    } catch (error) {
      setBackendStatus('offline');
      if (!isOfflineMode) {
        setIsOfflineMode(true);
        showMessage('Backend service is offline. Running in offline mode.', 'info');
      }
    }
  };

  const getMockData = {
    health: (): HealthResponse => ({
      status: 'healthy (mock)',
      timestamp: new Date().toISOString(),
      service: 'aircall-slack-agent-mock'
    }),
    
    status: (): StatusResponse => ({
      service: 'aircall-slack-agent',
      mode: 'development (mock)',
      timestamp: new Date().toISOString(),
      excludedUsers: ['user1@example.com', 'user2@example.com'],
      endpoints: {
        slack: 'https://hooks.slack.com/services/mock',
        aircall: 'https://api.aircall.io/v1/mock'
      }
    }),
    
    connections: (): ConnectionsResponse => ({
      success: true,
      message: 'Mock connections tested successfully',
      connections: {
        slack: 'connected',
        aircall: 'connected'
      }
    }),
    
    report: (type: string): ApiResponse => ({
      success: true,
      message: `Mock ${type} report generated successfully. In offline mode, no actual report was sent.`
    })
  };

  const showMessage = (text: string, type: MessageType = 'info'): void => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const makeRequest = async <T = ApiResponse>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${apiUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(JWT_TOKEN ? { 'Authorization': `Bearer ${JWT_TOKEN}` } : {}),
          ...options.headers
        },
        signal: controller.signal,
        ...options
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json() as T;
    } catch (error) {
      console.error('API Error:', error);
      
      // Check if it's a network error or timeout
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setBackendStatus('offline');
        setIsOfflineMode(true);
        throw new Error('Backend service is not available');
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const makeRequestWithFallback = async <T = ApiResponse>(
    endpoint: string,
    options: RequestInit = {},
    mockDataKey: keyof typeof getMockData,
    ...mockArgs: [any?]
  ): Promise<T> => {
    if (isOfflineMode) {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      return getMockData[mockDataKey](...mockArgs) as T;
    }
    
    try {
      return await makeRequest<T>(endpoint, options);
    } catch (error) {
      // Fallback to mock data if backend is unavailable
      setIsOfflineMode(true);
      setBackendStatus('offline');
      showMessage('Backend unavailable, using mock data', 'info');
      return getMockData[mockDataKey](...mockArgs) as T;
    }
  };

  const checkHealth = async (): Promise<void> => {
    try {
      const result = await makeRequestWithFallback<HealthResponse>('/health', {}, 'health');
      showMessage(`Health: ${result.status}`, 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showMessage(`Health check failed: ${errorMessage}`, 'error');
    }
  };

  const getStatus = async (): Promise<void> => {
    try {
      const result = await makeRequestWithFallback<StatusResponse>('/status', {}, 'status');
      setStatus(result);
      showMessage(isOfflineMode ? 'Status retrieved (mock data)' : 'Status retrieved successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showMessage(`Status check failed: ${errorMessage}`, 'error');
    }
  };

  const testConnections = async (): Promise<void> => {
    try {
      const result = await makeRequestWithFallback<ConnectionsResponse>('/test-connections', {}, 'connections');
      setConnections(result);
      const message = isOfflineMode ? 
        'Connection test completed (mock data)' : 
        (result.success ? 'All connections successful' : 'Some connections failed');
      showMessage(message, result.success ? 'success' : 'error');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showMessage(`Connection test failed: ${errorMessage}`, 'error');
    }
  };

  const generateReport = async (reportType: 'afternoon' | 'night'): Promise<void> => {
    try {
      const result = await makeRequestWithFallback<ApiResponse>(
        `/report/${reportType}`, 
        { method: 'POST' }, 
        'report',
        reportType
      );
      showMessage(result.message || 'Report generated successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showMessage(`Report generation failed: ${errorMessage}`, 'error');
    }
  };

  const generateCustomReport = async (): Promise<void> => {
    if (!customReport.startDate || !customReport.endDate || !customReport.startTime || !customReport.endTime) {
      showMessage('Please fill in all date and time fields', 'error');
      return;
    }

    try {
      // Convert local datetime to ISO format
      const startDateTime = new Date(`${customReport.startDate}T${customReport.startTime}:00`);
      const endDateTime = new Date(`${customReport.endDate}T${customReport.endTime}:00`);

      const payload: CustomReportPayload = {
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        reportName: customReport.reportName || `Custom Report ${customReport.startDate} to ${customReport.endDate}`
      };

      const result = await makeRequestWithFallback<ApiResponse>(
        '/report/custom',
        {
          method: 'POST',
          body: JSON.stringify(payload)
        },
        'report',
        'custom'
      );

      showMessage(result.message || 'Custom report generated successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showMessage(`Custom report generation failed: ${errorMessage}`, 'error');
    }
  };

  const toggleOfflineMode = (): void => {
    setIsOfflineMode(!isOfflineMode);
    showMessage(
      isOfflineMode ? 'Switched to online mode' : 'Switched to offline mode (mock data)',
      'info'
    );
  };

  const retryConnection = async (): Promise<void> => {
    showMessage('Retrying connection to backend...', 'info');
    await checkBackendAvailability();
  };

  const MessageAlert: React.FC<MessageAlertProps> = ({ message, type }) => {
    if (!message) return null;
    
    const alertStyle = type === 'error' ? styles.alertError : 
                      type === 'success' ? styles.alertSuccess : 
                      styles.alertInfo;
    
    const Icon = type === 'error' ? AlertCircle : CheckCircle;
    
    return (
      <div style={{...styles.alert, ...alertStyle}}>
        <Icon size={20} />
        <span>{message}</span>
      </div>
    );
  };

  const handleCustomReportChange = (field: keyof CustomReportData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCustomReport(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setApiUrl(e.target.value);
  };

  const getConnectionBadgeStyle = (status: string) => {
    return status === 'connected' ? styles.badgeSuccess : styles.badgeError;
  };

  const getBackendStatusStyle = () => {
    switch (backendStatus) {
      case 'online':
        return styles.badgeSuccess;
      case 'offline':
        return styles.badgeError;
      default:
        return { backgroundColor: '#fef3c7', color: '#92400e' }; // yellow for unknown
    }
  };

  const getBackendStatusText = () => {
    switch (backendStatus) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      default:
        return 'Checking...';
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  const getButtonStyle = (baseStyle: any) => ({
    ...styles.button,
    ...baseStyle,
    ...(loading ? styles.buttonDisabled : {}),
    ':hover': loading ? {} : { opacity: 0.9 }
  });

  const getInputStyle = (inputName: string) => ({
    ...styles.input,
    ...(focusedInput === inputName ? styles.inputFocus : {})
  });

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          button:hover:not(:disabled) {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          
          input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
        `}
      </style>
      
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.card}>
          <div style={styles.header as React.CSSProperties}>
            <div>
              <h1 style={styles.title}>
                <MessageSquare size={32} style={styles.icon} color="#2563eb" />
                Aircall Slack Agent
              </h1>
              <p style={styles.subtitle}>Generate and send call activity reports to Slack</p>
            </div>
            <div style={styles.apiUrlContainer}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Backend:</span>
                <span style={{...styles.badge, ...getBackendStatusStyle()}}>
                  {getBackendStatusText()}
                </span>
                {backendStatus === 'offline' && (
                  <button
                    onClick={retryConnection}
                    style={{
                      padding: '4px 8px',
                      fontSize: '12px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Retry
                  </button>
                )}
              </div>
              <div>
                <label style={styles.label}>API URL</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={handleApiUrlChange}
                  style={getInputStyle('apiUrl')}
                  onFocus={() => setFocusedInput('apiUrl')}
                  onBlur={() => setFocusedInput('')}
                  placeholder="http://localhost:3000"
                />
              </div>
              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <input
                    type="checkbox"
                    checked={isOfflineMode}
                    onChange={toggleOfflineMode}
                    style={{ cursor: 'pointer' }}
                  />
                  Force offline mode (use mock data)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        <MessageAlert message={message} type={messageType} />

        {/* Offline Mode Banner */}
        {isOfflineMode && (
          <div style={{
            ...styles.alert,
            backgroundColor: '#fef3c7',
            borderColor: '#f59e0b',
            color: '#92400e'
          }}>
            <AlertCircle size={20} />
            <div>
              <strong>Offline Mode:</strong> Backend service is not available. Using mock data for demonstration.
              {backendStatus === 'offline' && (
                <span> The system will automatically switch back when the backend becomes available.</span>
              )}
            </div>
          </div>
        )}

        <div style={styles.grid}>
          {/* System Status */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>
              <Server size={20} style={styles.icon} />
              System Status
            </h2>
            
            <div style={styles.buttonGroup as React.CSSProperties}>
              <button
                onClick={checkHealth}
                disabled={loading}
                style={getButtonStyle(styles.buttonPrimary)}
              >
                {loading ? 
                  <RefreshCw size={16} style={{...styles.icon, ...styles.spin}} /> : 
                  <Activity size={16} style={styles.icon} />
                }
                Check Health
              </button>
              
              <button
                onClick={getStatus}
                disabled={loading}
                style={getButtonStyle(styles.buttonSuccess)}
              >
                {loading ? 
                  <RefreshCw size={16} style={{...styles.icon, ...styles.spin}} /> : 
                  <Server size={16} style={styles.icon} />
                }
                Get Status
              </button>
              
              <button
                onClick={testConnections}
                disabled={loading}
                style={getButtonStyle(styles.buttonIndigo)}
              >
                {loading ? 
                  <RefreshCw size={16} style={{...styles.icon, ...styles.spin}} /> : 
                  <Wifi size={16} style={styles.icon} />
                }
                Test Connections
              </button>
            </div>

            {/* Status Information */}
            {status && (
              <div style={styles.statusBox}>
                <div style={styles.statusTitle}>Service Status</div>
                <div style={styles.statusContent as React.CSSProperties}>
                  <div style={styles.statusRow}>
                    <span style={{ fontWeight: '500' }}>Service:</span>
                    <span>{status.service}</span>
                  </div>
                  <div style={styles.statusRow}>
                    <span style={{ fontWeight: '500' }}>Mode:</span>
                    <span>{status.mode}</span>
                  </div>
                  <div style={styles.statusRow}>
                    <span style={{ fontWeight: '500' }}>Last Updated:</span>
                    <span>{formatTimestamp(status.timestamp)}</span>
                  </div>
                  <div style={styles.statusRow}>
                    <span style={{ fontWeight: '500' }}>Excluded Users:</span>
                    <span>{status.excludedUsers.length}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Connection Status */}
            {connections && (
              <div style={styles.statusBox}>
                <div style={styles.statusTitle}>Connection Status</div>
                <div style={styles.statusContent as React.CSSProperties}>
                  <div style={styles.statusRow}>
                    <span style={{ fontWeight: '500' }}>Slack:</span>
                    <span style={{...styles.badge, ...getConnectionBadgeStyle(connections.connections.slack)}}>
                      {connections.connections.slack}
                    </span>
                  </div>
                  <div style={styles.statusRow}>
                    <span style={{ fontWeight: '500' }}>Aircall:</span>
                    <span style={{...styles.badge, ...getConnectionBadgeStyle(connections.connections.aircall)}}>
                      {connections.connections.aircall}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Reports */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>
              <Send size={20} style={styles.icon} />
              Quick Reports
            </h2>
            
            <div style={styles.buttonGroup as React.CSSProperties}>
              <button
                onClick={() => generateReport('afternoon')}
                disabled={loading}
                style={getButtonStyle(styles.buttonPurple)}
              >
                {loading ? 
                  <RefreshCw size={16} style={{...styles.icon, ...styles.spin}} /> : 
                  <Send size={16} style={styles.icon} />
                }
                Generate Afternoon Report
              </button>
              
              <button
                onClick={() => generateReport('night')}
                disabled={loading}
                style={getButtonStyle(styles.buttonOrange)}
              >
                {loading ? 
                  <RefreshCw size={16} style={{...styles.icon, ...styles.spin}} /> : 
                  <Send size={16} style={styles.icon} />
                }
                Generate Night Report
              </button>
            </div>
          </div>
        </div>

        {/* Custom Report Section */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            <Calendar size={20} style={styles.icon} />
            Custom Report
          </h2>
          
          <div style={styles.gridCustom}>
            <div>
              <label style={styles.label}>Start Date</label>
              <input
                type="date"
                value={customReport.startDate}
                onChange={handleCustomReportChange('startDate')}
                style={getInputStyle('startDate')}
                onFocus={() => setFocusedInput('startDate')}
                onBlur={() => setFocusedInput('')}
              />
            </div>
            
            <div>
              <label style={styles.label}>Start Time</label>
              <input
                type="time"
                value={customReport.startTime}
                onChange={handleCustomReportChange('startTime')}
                style={getInputStyle('startTime')}
                onFocus={() => setFocusedInput('startTime')}
                onBlur={() => setFocusedInput('')}
              />
            </div>
            
            <div>
              <label style={styles.label}>End Date</label>
              <input
                type="date"
                value={customReport.endDate}
                onChange={handleCustomReportChange('endDate')}
                style={getInputStyle('endDate')}
                onFocus={() => setFocusedInput('endDate')}
                onBlur={() => setFocusedInput('')}
              />
            </div>
            
            <div>
              <label style={styles.label}>End Time</label>
              <input
                type="time"
                value={customReport.endTime}
                onChange={handleCustomReportChange('endTime')}
                style={getInputStyle('endTime')}
                onFocus={() => setFocusedInput('endTime')}
                onBlur={() => setFocusedInput('')}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Report Name (optional)</label>
            <input
              type="text"
              value={customReport.reportName}
              onChange={handleCustomReportChange('reportName')}
              style={getInputStyle('reportName')}
              onFocus={() => setFocusedInput('reportName')}
              onBlur={() => setFocusedInput('')}
              placeholder="Custom Report Name"
            />
          </div>
          
          <div style={styles.customReportFooter as React.CSSProperties}>
            <div style={styles.reportRange}>
              {customReport.startDate && customReport.endDate && (
                <span>
                  Report range: {customReport.startDate} {customReport.startTime} to {customReport.endDate} {customReport.endTime}
                </span>
              )}
            </div>
            
            <button
              onClick={generateCustomReport}
              disabled={loading}
              style={getButtonStyle(styles.buttonRed)}
            >
              {loading ? 
                <RefreshCw size={16} style={{...styles.icon, ...styles.spin}} /> : 
                <Send size={16} style={styles.icon} />
              }
              Generate Custom Report
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer as React.CSSProperties}>
          <p>Aircall Slack Agent © 2024 - Automated call reporting system</p>
        </div>
      </div>
    </div>
  );
};

export default AircallSlackUI;