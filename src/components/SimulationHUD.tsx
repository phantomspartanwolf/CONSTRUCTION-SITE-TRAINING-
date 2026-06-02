import React from 'react';
import { Hazard, SupervisorDecision } from '../types';
import '../styles/SimulationHUD.css';

interface SimulationHUDProps {
  elapsedTime: number;
  hazardsNear: Hazard[];
  hazardsIdentified: string[];
  score: number;
  onHazardIdentify: (hazardId: string) => void;
  onDecision: (type: string, hazardId?: string) => void;
}

export const SimulationHUD: React.FC<SimulationHUDProps> = ({
  elapsedTime,
  hazardsNear,
  hazardsIdentified,
  score,
  onHazardIdentify,
  onDecision,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="simulation-hud">
      {/* Top bar */}
      <div className="hud-top">
        <div className="hud-timer">⏱️ {formatTime(elapsedTime)}</div>
        <div className="hud-score">Score: {score}</div>
      </div>

      {/* Left panel - Hazards nearby */}
      <div className="hud-left">
        <div className="hud-panel">
          <h3>Hazards Detected</h3>
          {hazardsNear.length === 0 ? (
            <p className="no-hazards">No hazards detected nearby</p>
          ) : (
            <ul className="hazards-list">
              {hazardsNear.map(hazard => (
                <li key={hazard.id} className={`hazard-item severity-${hazard.severity}`}>
                  <div className="hazard-name">{hazard.name}</div>
                  <div className="hazard-description">{hazard.description}</div>
                  <button
                    className="btn-identify"
                    onClick={() => onHazardIdentify(hazard.id)}
                    disabled={hazardsIdentified.includes(hazard.id)}
                  >
                    {hazardsIdentified.includes(hazard.id) ? '✓ Identified' : 'Identify'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right panel - Supervisor actions */}
      <div className="hud-right">
        <div className="hud-panel">
          <h3>Supervisor Actions</h3>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => onDecision('stop_work')}>
              🛑 Stop Work
            </button>
            <button className="action-btn" onClick={() => onDecision('isolate_area')}>
              🚧 Isolate Area
            </button>
            <button className="action-btn" onClick={() => onDecision('enforce_ppe')}>
              🧤 Enforce PPE
            </button>
            <button className="action-btn" onClick={() => onDecision('emergency_response')}>
              🚑 Emergency
            </button>
          </div>
        </div>
      </div>

      {/* Bottom - Instructions */}
      <div className="hud-bottom">
        <p>WASD to move • Mouse to look • Click on hazards to identify • Use buttons to make decisions</p>
      </div>
    </div>
  );
};
