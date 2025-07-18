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

const ReportForm: React.FC<ReportFormProps> = ({ customReport, onChange, onGenerate, isLoading }) => {
  const handleInputChange = (field: keyof CustomReportData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div>
      <div className="form-container">
        <div>
          <label className="form-label">Start Date</label>
          <input
            type="date"
            value={customReport.startDate}
            onChange={handleInputChange('startDate')}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">End Date</label>
          <input
            type="date"
            value={customReport.endDate}
            onChange={handleInputChange('endDate')}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Start Time</label>
          <input
            type="time"
            value={customReport.startTime}
            onChange={handleInputChange('startTime')}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">End Time</label>
          <input
            type="time"
            value={customReport.endTime}
            onChange={handleInputChange('endTime')}
            className="form-input"
          />
        </div>
        <div className="full-width">
          <label className="form-label">Report Name (optional)</label>
          <input
            type="text"
            value={customReport.reportName}
            onChange={handleInputChange('reportName')}
            className="form-input"
          />
        </div>
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className={`btn-primary ${isLoading ? 'btn-disabled' : ''}`}
      >
        Generate Custom Report
      </button>
    </div>
  );
};

export default ReportForm;
