import { Hazard, Vector3 } from '../types';

export class HazardDetector {
  private hazards: Map<string, Hazard>;

  constructor(hazards: Hazard[]) {
    this.hazards = new Map(hazards.map(h => [h.id, h]));
  }

  /**
   * Get hazards near a position within detection radius
   */
  getHazardsNear(position: Vector3, detectionRadius: number = 10): Hazard[] {
    return Array.from(this.hazards.values()).filter(hazard => {
      const distance = this.distance(position, hazard.position);
      return distance <= detectionRadius && !hazard.identified;
    });
  }

  /**
   * Mark a hazard as identified
   */
  identifyHazard(hazardId: string): boolean {
    const hazard = this.hazards.get(hazardId);
    if (hazard) {
      hazard.identified = true;
      return true;
    }
    return false;
  }

  /**
   * Get all unidentified hazards
   */
  getUnidentifiedHazards(): Hazard[] {
    return Array.from(this.hazards.values()).filter(h => !h.identified);
  }

  /**
   * Get all identified hazards
   */
  getIdentifiedHazards(): Hazard[] {
    return Array.from(this.hazards.values()).filter(h => h.identified);
  }

  /**
   * Calculate distance between two points
   */
  private distance(a: Vector3, b: Vector3): number {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) +
      Math.pow(a.y - b.y, 2) +
      Math.pow(a.z - b.z, 2)
    );
  }

  /**
   * Reset all hazards to unidentified state
   */
  reset(): void {
    this.hazards.forEach(h => (h.identified = false));
  }
}
