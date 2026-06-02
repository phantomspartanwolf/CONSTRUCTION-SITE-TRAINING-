import React from 'react';
import { ResultsReport } from '../types';
import '../styles/ResultsReport.css';

interface ResultsReportProps {
  report: ResultsReport;
  onRetry: () => void;
}

export const ResultsReport: React.FC<ResultsReportProps> = ({ report, onRetry }) => {
  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      A: '#00cc00',
      B: '#ffaa00',
      C: '#ff6600',
      D: '#ff3300',
      F: '#cc0000',
    };
    return colors[grade] || '#333';
  };

  return (
    <div className="results-container">
      <div className="results-content">
        <h1>Training Simulation Complete</h1>

        <div className="results-grid">
          {/* Grade Card */}
          <div className="result-card grade-card" style={{ borderColor: getGradeColor(report.grade) }}>
            <div className="grade" style={{ color: getGradeColor(report.grade) }}>
              {report.grade}
            </div>
            <p>Overall Performance</p>
          </div>

          {/* Score Card */}
          <div className="result-card">
            <div className="score">{report.overallScore}%</div>
            <p>Final Score</p>
          </div>

          {/* Time Card */}
          <div className="result-card">
            <div className="metric">{report.duration} min</div>
            <p>Duration</p>
          </div>
        </div>

        {/* Hazard Summary */}
        <div className="result-section">
          <h2>Hazard Identification</h2>
          <div className="summary-stats">
            <div className="stat">
              <span className="label">Total Hazards:</span>
              <span className="value">{report.hazardsTotal}</span>
            </div>
            <div className="stat">
              <span className="label">Identified:</span>
              <span className="value correct">{report.hazardsIdentified}</span>
            </div>
            <div className="stat">
              <span className="label">Missed:</span>
              <span className="value incorrect">{report.hazardsTotal - report.hazardsIdentified}</span>
            </div>
          </div>

          {report.hazardsMissed.length > 0 && (
            <div className="missed-hazards">
              <h3>Hazards You Missed:</h3>
              <ul>
                {report.hazardsMissed.map((hazard, idx) => (
                  <li key={idx} className="missed">{hazard}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Critical Mistakes */}
        {report.criticalMistakes.length > 0 && (
          <div className="result-section">
            <h2>Critical Mistakes</h2>
            <ul className="mistakes-list">
              {report.criticalMistakes.map((mistake, idx) => (
                <li key={idx} className="mistake">{mistake}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Decisions Made */}
        <div className="result-section">
          <h2>Decisions Made ({report.decisions.length})</h2>
          <ul className="decisions-list">
            {report.decisions.map((decision, idx) => (
              <li key={idx} className={decision.correctAction ? 'correct' : 'incorrect'}>
                <span className="decision-type">{decision.type.replace(/_/g, ' ').toUpperCase()}</span>
                <span className="decision-consequence">{decision.consequence}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          <button className="btn btn-primary" onClick={onRetry}>
            Try Again
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
