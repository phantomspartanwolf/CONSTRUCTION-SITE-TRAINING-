import { Hazard, HazardCategory } from '../types';

export const HAZARD_DEFINITIONS: Record<string, Omit<Hazard, 'id' | 'visible' | 'identified'>> = {
  unsecured_scaffolding: {
    name: 'Unsecured Scaffolding',
    description: 'Scaffolding without proper safety rails or securing',
    severity: 'critical',
    position: { x: 10, y: 5, z: 15 },
    radius: 4,
    category: 'fall',
  },
  missing_hard_hats: {
    name: 'Workers Without Hard Hats',
    description: 'Construction workers on site not wearing hard hats',
    severity: 'high',
    position: { x: -5, y: 0, z: 20 },
    radius: 3,
    category: 'ppe',
  },
  exposed_electrical: {
    name: 'Exposed Electrical Wiring',
    description: 'Uninsulated electrical cables or connections exposed',
    severity: 'critical',
    position: { x: 15, y: 2, z: 5 },
    radius: 2.5,
    category: 'electrical',
  },
  open_excavation: {
    name: 'Unprotected Excavation',
    description: 'Deep pit or trench without protective barriers',
    severity: 'critical',
    position: { x: -10, y: -3, z: 0 },
    radius: 5,
    category: 'structural',
  },
  unstable_materials: {
    name: 'Unstable Material Stack',
    description: 'Heavy materials stacked improperly without bracing',
    severity: 'high',
    position: { x: 20, y: 0, z: -10 },
    radius: 3,
    category: 'structural',
  },
  machinery_no_guards: {
    name: 'Machinery Without Guards',
    description: 'Operating equipment with missing safety guards',
    severity: 'critical',
    position: { x: 0, y: 1, z: -15 },
    radius: 3.5,
    category: 'equipment',
  },
  poor_ventilation: {
    name: 'Poor Ventilation Area',
    description: 'Confined space with inadequate air circulation',
    severity: 'high',
    position: { x: -15, y: 0.5, z: 10 },
    radius: 4,
    category: 'environmental',
  },
  wet_floor: {
    name: 'Wet / Slippery Surface',
    description: 'Floor wet from water or oil creating slip hazard',
    severity: 'medium',
    position: { x: 5, y: 0, z: -5 },
    radius: 2,
    category: 'fall',
  },
  missing_railings: {
    name: 'Missing Railings',
    description: 'Platform or elevated area without safety railings',
    severity: 'critical',
    position: { x: -8, y: 6, z: -8 },
    radius: 3,
    category: 'fall',
  },
  improper_storage: {
    name: 'Improper Tool Storage',
    description: 'Tools stored unsafely, creating falling object hazard',
    severity: 'medium',
    position: { x: 12, y: 0, z: 8 },
    radius: 2.5,
    category: 'equipment',
  },
};

export function createHazard(key: string, id: string): Hazard {
  const def = HAZARD_DEFINITIONS[key];
  if (!def) throw new Error(`Unknown hazard: ${key}`);
  
  return {
    ...def,
    id,
    visible: true,
    identified: false,
  };
}
