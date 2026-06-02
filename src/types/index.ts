// Core type definitions for the safety simulator

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Hazard {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  position: Vector3;
  radius: number; // Detection radius
  category: HazardCategory;
  visible: boolean;
  identified: boolean;
}

export type HazardCategory =
  | 'fall'
  | 'electrical'
  | 'ppe'
  | 'structural'
  | 'equipment'
  | 'environmental';

export interface SupervisorDecision {
  id: string;
  timestamp: number;
  type: DecisionType;
  hazardId?: string;
  areaPosition?: Vector3;
  consequence: string;
  correctAction: boolean;
}

export type DecisionType =
  | 'stop_work'
  | 'isolate_area'
  | 'enforce_ppe'
  | 'emergency_response'
  | 'document_hazard'
  | 'ignore_hazard';

export interface TrainingScenario {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  hazards: Hazard[];
  winConditions: WinCondition[];
}

export interface WinCondition {
  type: 'identify_hazards' | 'make_decision' | 'avoid_critical_mistakes';
  targetValue: number;
  weight: number; // for scoring
}

export interface SimulationState {
  scenario: TrainingScenario | null;
  isRunning: boolean;
  startTime: number;
  elapsedTime: number;
  hazardsIdentified: string[];
  decisions: SupervisorDecision[];
  score: number;
}

export interface ResultsReport {
  scenario: string;
  duration: number;
  hazardsTotal: number;
  hazardsIdentified: number;
  hazardsMissed: string[];
  decisions: SupervisorDecision[];
  criticalMistakes: string[];
  overallScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}
