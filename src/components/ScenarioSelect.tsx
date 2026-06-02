import React from 'react';
import { SCENARIOS } from '../scenarios/scenarioDefinitions';
import '../styles/ScenarioSelect.css';

interface ScenarioSelectProps {
  onScenarioSelected: (scenarioId: string) => void;
}

export const ScenarioSelect: React.FC<ScenarioSelectProps> = ({ onScenarioSelected }) => {
  return (
    <div className="scenario-select-container">
      <div className="scenario-select-content">
        <h1>Construction Safety Training Simulator</h1>
        <p className="subtitle">Select a training scenario to begin</p>

        <div className="scenarios-grid">
          {SCENARIOS.map(scenario => (
            <div
              key={scenario.id}
              className={`scenario-card scenario-${scenario.difficulty}`}
              onClick={() => onScenarioSelected(scenario.id)}
            >
              <div className="scenario-header">
                <h3>{scenario.name}</h3>
                <span className="difficulty-badge">{scenario.difficulty.toUpperCase()}</span>
              </div>
              <p className="scenario-description">{scenario.description}</p>
              <div className="scenario-meta">
                <span className="hazard-count">🎯 {scenario.hazards.length} Hazards</span>
                <span className="duration">⏱️ {scenario.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
