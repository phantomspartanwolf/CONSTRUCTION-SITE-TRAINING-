import { TrainingScenario, Hazard } from '../types';
import { createHazard, HAZARD_DEFINITIONS } from '../hazards/hazardDefinitions';

export const SCENARIOS: TrainingScenario[] = [
  {
    id: 'basic_foundation_pour',
    name: 'Foundation Pour - Beginner',
    description:
      'A concrete foundation pour operation. Learn to identify basic hazards during this common construction task.',
    difficulty: 'beginner',
    duration: 10,
    hazards: [
      createHazard('missing_hard_hats', 'h1'),
      createHazard('wet_floor', 'h2'),
      createHazard('unstable_materials', 'h3'),
    ],
    winConditions: [
      {
        type: 'identify_hazards',
        targetValue: 3,
        weight: 0.5,
      },
      {
        type: 'make_decision',
        targetValue: 2,
        weight: 0.3,
      },
      {
        type: 'avoid_critical_mistakes',
        targetValue: 0,
        weight: 0.2,
      },
    ],
  },
  {
    id: 'steel_erection',
    name: 'Steel Erection - Intermediate',
    description:
      'Complex multi-level steel structure assembly. Multiple critical hazards and critical decisions required.',
    difficulty: 'intermediate',
    duration: 15,
    hazards: [
      createHazard('unsecured_scaffolding', 'h4'),
      createHazard('missing_railings', 'h5'),
      createHazard('machinery_no_guards', 'h6'),
      createHazard('missing_hard_hats', 'h7'),
      createHazard('improper_storage', 'h8'),
    ],
    winConditions: [
      {
        type: 'identify_hazards',
        targetValue: 5,
        weight: 0.4,
      },
      {
        type: 'make_decision',
        targetValue: 3,
        weight: 0.4,
      },
      {
        type: 'avoid_critical_mistakes',
        targetValue: 0,
        weight: 0.2,
      },
    ],
  },
  {
    id: 'excavation_emergency',
    name: 'Excavation Site - Advanced',
    description:
      'Large-scale excavation with multiple simultaneous hazards. Requires quick hazard identification and critical decision-making under pressure.',
    difficulty: 'advanced',
    duration: 20,
    hazards: [
      createHazard('open_excavation', 'h9'),
      createHazard('exposed_electrical', 'h10'),
      createHazard('poor_ventilation', 'h11'),
      createHazard('unstable_materials', 'h12'),
      createHazard('machinery_no_guards', 'h13'),
      createHazard('missing_hard_hats', 'h14'),
      createHazard('improper_storage', 'h15'),
    ],
    winConditions: [
      {
        type: 'identify_hazards',
        targetValue: 6,
        weight: 0.3,
      },
      {
        type: 'make_decision',
        targetValue: 4,
        weight: 0.5,
      },
      {
        type: 'avoid_critical_mistakes',
        targetValue: 0,
        weight: 0.2,
      },
    ],
  },
];

export function getScenarioById(id: string): TrainingScenario | undefined {
  return SCENARIOS.find(s => s.id === id);
}
