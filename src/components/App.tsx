import React, { useEffect, useRef, useState } from 'react';
import { ScenarioSelect } from './ScenarioSelect';
import { SimulationHUD } from './SimulationHUD';
import { ResultsReport } from './ResultsReport';
import { getScenarioById } from '../scenarios/scenarioDefinitions';
import { ConstructionSite } from '../scenes/ConstructionSite';
import { PlayerController } from '../player/PlayerController';
import { HazardDetector } from '../hazards/HazardDetector';
import { Hazard, SupervisorDecision, ResultsReport as ResultsReportType, SimulationState } from '../types';
import '../styles/App.css';

import * as THREE from 'three';

type AppState = 'menu' | 'simulation' | 'results';

export const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('menu');
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);
  const [resultsReport, setResultsReport] = useState<ResultsReportType | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ConstructionSite | null>(null);
  const playerRef = useRef<PlayerController | null>(null);
  const hazardDetectorRef = useRef<HazardDetector | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const hazardsNearRef = useRef<Hazard[]>([]);
  const animationRef = useRef<number | null>(null);

  // Handle scenario selection
  const handleScenarioSelected = (scenarioId: string) => {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) return;

    setSimulationState({
      scenario,
      isRunning: true,
      startTime: Date.now(),
      elapsedTime: 0,
      hazardsIdentified: [],
      decisions: [],
      score: 0,
    });

    setAppState('simulation');
  };

  // Initialize Three.js scene and renderer
  useEffect(() => {
    if (appState !== 'simulation' || !canvasRef.current || !simulationState) return;

    // Create scene
    const site = new ConstructionSite();
    sceneRef.current = site;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.7, -10);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize player and hazard detector
    const player = new PlayerController();
    playerRef.current = player;

    const hazardDetector = new HazardDetector(simulationState.scenario.hazards);
    hazardDetectorRef.current = hazardDetector;

    // Add hazard markers to scene
    site.addHazardMarkers(simulationState.scenario.hazards);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Update player
      player.update();

      // Update camera position and rotation
      camera.position.set(player.position.x, player.position.y, player.position.z);
      camera.rotation.order = 'YXZ';
      camera.rotation.y = player.rotation.y;
      camera.rotation.x = player.rotation.x;

      // Update hazards near player
      hazardsNearRef.current = hazardDetector.getHazardsNear(player.position, 15);

      // Update simulation time
      setSimulationState(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          elapsedTime: (Date.now() - prev.startTime) / 1000,
        };
      });

      // Render
      renderer.render(site.getScene(), camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvasRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [appState, simulationState]);

  // Handle hazard identification
  const handleHazardIdentify = (hazardId: string) => {
    if (!hazardDetectorRef.current || !simulationState) return;

    hazardDetectorRef.current.identifyHazard(hazardId);
    sceneRef.current?.highlightHazard(hazardId);

    setSimulationState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        hazardsIdentified: [...prev.hazardsIdentified, hazardId],
        score: prev.score + 10,
      };
    });
  };

  // Handle supervisor decision
  const handleDecision = (type: string, hazardId?: string) => {
    if (!simulationState) return;

    const decision: SupervisorDecision = {
      id: `decision-${Date.now()}`,
      timestamp: simulationState.elapsedTime,
      type: type as any,
      hazardId,
      consequence: 'Decision recorded',
      correctAction: true,
    };

    setSimulationState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        decisions: [...prev.decisions, decision],
        score: prev.score + 5,
      };
    });

    // Auto-end simulation for now (phase 1)
    endSimulation();
  };

  // End simulation and generate results
  const endSimulation = () => {
    if (!simulationState || !hazardDetectorRef.current) return;

    const missedHazards = hazardDetectorRef.current
      .getUnidentifiedHazards()
      .map(h => h.name);

    const report: ResultsReportType = {
      scenario: simulationState.scenario.name,
      duration: Math.round(simulationState.elapsedTime / 60),
      hazardsTotal: simulationState.scenario.hazards.length,
      hazardsIdentified: simulationState.hazardsIdentified.length,
      hazardsMissed: missedHazards,
      decisions: simulationState.decisions,
      criticalMistakes: [],
      overallScore: Math.min(100, simulationState.score),
      grade: simulationState.score >= 80 ? 'A' : simulationState.score >= 70 ? 'B' : 'C',
    };

    setResultsReport(report);
    setAppState('results');
  };

  // Render based on app state
  if (appState === 'menu') {
    return <ScenarioSelect onScenarioSelected={handleScenarioSelected} />;
  }

  if (appState === 'simulation' && simulationState) {
    return (
      <div className="simulation-container">
        <div ref={canvasRef} className="canvas-container" />
        <SimulationHUD
          elapsedTime={simulationState.elapsedTime}
          hazardsNear={hazardsNearRef.current}
          hazardsIdentified={simulationState.hazardsIdentified}
          score={simulationState.score}
          onHazardIdentify={handleHazardIdentify}
          onDecision={handleDecision}
        />
      </div>
    );
  }

  if (appState === 'results' && resultsReport) {
    return (
      <ResultsReport
        report={resultsReport}
        onRetry={() => {
          setAppState('menu');
          setSimulationState(null);
          setResultsReport(null);
        }}
      />
    );
  }

  return null;
};
