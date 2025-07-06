// src/components/ReportForm.tsx
import React from 'react';

interface CustomReportData {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  reportName: string;
}

interface ReportFormProps {
  customReport: CustomReportData;
  onChange: (field: keyof CustomReportData, value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const styles = {
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    marginBottom: '8px'
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%'
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px'
  },
  fullWidth: {
    gridColumn: 'span 2'
  }
};

const ReportForm: React.FC<ReportFormProps> = ({ customReport, onChange, onGenerate, isLoading }) => {
  const handleInputChange = (field: keyof CustomReportData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div>
      <div style={styles.formContainer}>
        <div>
          <label style={styles.label}>Start Date</label>
          <input
            type="date"
            value={customReport.startDate}
            onChange={handleInputChange('startDate')}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>End Date</label>
          <input
            type="date"
            value={customReport.endDate}
            onChange={handleInputChange('endDate')}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Start Time</label>
          <input
            type="time"
            value={customReport.startTime}
            onChange={handleInputChange('startTime')}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>End Time</label>
          <input
            type="time"
            value={customReport.endTime}
            onChange={handleInputChange('endTime')}
            style={styles.input}
          />
        </div>
        <div style={styles.fullWidth}>
          <label style={styles.label}>Report Name (optional)</label>
          <input
            type="text"
            value={customReport.reportName}
            onChange={handleInputChange('reportName')}
            style={styles.input}
          />
        </div>
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        style={{
          ...styles.button,
          ...(isLoading ? styles.buttonDisabled : {})
        }}
      >
        Generate Custom Report
      </button>
    </div>
  );
};

export default ReportForm;
