import * as THREE from 'three';
import { Hazard, Vector3 } from '../types';

export class ConstructionSite {
  private scene: THREE.Scene;
  private hazardMarkers: Map<string, THREE.Object3D> = new Map();

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue
    this.setupLighting();
    this.buildEnvironment();
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sunLight.position.set(50, 50, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;
    this.scene.add(sunLight);
  }

  private buildEnvironment(): void {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b7355, // Brown
      metalness: 0.1,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Simple construction site buildings
    this.addConstructionBuilding({ x: 20, y: 0, z: 20 });
    this.addConstructionBuilding({ x: -20, y: 0, z: -20 });

    // Scaffolding structure
    this.addScaffolding({ x: 10, y: 0, z: 0 });

    // Material piles
    this.addMaterialPile({ x: -15, y: 0, z: 15 });
    this.addMaterialPile({ x: 15, y: 0, z: -15 });

    // Excavation pit
    this.addExcavationPit({ x: -10, y: 0, z: 0 });

    // Crane
    this.addCrane({ x: 0, y: 0, z: 20 });
  }

  private addConstructionBuilding(position: Vector3): void {
    const geometry = new THREE.BoxGeometry(15, 20, 15);
    const material = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.2,
      roughness: 0.7,
    });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(position.x, position.y + 10, position.z);
    building.castShadow = true;
    building.receiveShadow = true;
    this.scene.add(building);
  }

  private addScaffolding(position: Vector3): void {
    const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 10, 16);
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      metalness: 0.8,
      roughness: 0.3,
    });

    // Scaffolding poles
    for (let i = 0; i < 4; i++) {
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.set(
        position.x + (i % 2) * 8 - 4,
        position.y + 5,
        position.z + Math.floor(i / 2) * 8 - 4
      );
      pole.castShadow = true;
      pole.receiveShadow = true;
      this.scene.add(pole);
    }

    // Platform
    const platformGeometry = new THREE.BoxGeometry(10, 0.5, 10);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      metalness: 0.6,
      roughness: 0.4,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(position.x, position.y + 10, position.z);
    platform.castShadow = true;
    platform.receiveShadow = true;
    this.scene.add(platform);
  }

  private addMaterialPile(position: Vector3): void {
    const pileGeometry = new THREE.ConeGeometry(8, 6, 32);
    const pileMaterial = new THREE.MeshStandardMaterial({
      color: 0xa0a0a0,
      metalness: 0.1,
      roughness: 0.9,
    });
    const pile = new THREE.Mesh(pileGeometry, pileMaterial);
    pile.position.set(position.x, position.y + 3, position.z);
    pile.castShadow = true;
    pile.receiveShadow = true;
    this.scene.add(pile);
  }

  private addExcavationPit(position: Vector3): void {
    const pitGeometry = new THREE.CylinderGeometry(15, 15, 8, 32);
    const pitMaterial = new THREE.MeshStandardMaterial({
      color: 0x654321,
      metalness: 0,
      roughness: 1,
    });
    const pit = new THREE.Mesh(pitGeometry, pitMaterial);
    pit.position.set(position.x, position.y - 4, position.z);
    pit.receiveShadow = true;
    this.scene.add(pit);
  }

  private addCrane(position: Vector3): void {
    // Base
    const baseGeometry = new THREE.CylinderGeometry(2, 2, 1, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.9,
      roughness: 0.2,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(position.x, position.y + 0.5, position.z);
    base.castShadow = true;
    base.receiveShadow = true;
    this.scene.add(base);

    // Mast
    const mastGeometry = new THREE.CylinderGeometry(0.4, 0.4, 25, 16);
    const mastMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      metalness: 0.8,
      roughness: 0.3,
    });
    const mast = new THREE.Mesh(mastGeometry, mastMaterial);
    mast.position.set(position.x, position.y + 12.5, position.z);
    mast.castShadow = true;
    mast.receiveShadow = true;
    this.scene.add(mast);

    // Boom
    const boomGeometry = new THREE.BoxGeometry(20, 0.6, 0.6);
    const boom = new THREE.Mesh(boomGeometry, mastMaterial);
    boom.position.set(position.x + 10, position.y + 24, position.z);
    boom.castShadow = true;
    boom.receiveShadow = true;
    this.scene.add(boom);
  }

  /**
   * Add visual markers for hazards
   */
  addHazardMarkers(hazards: Hazard[]): void {
    hazards.forEach(hazard => {
      if (!this.hazardMarkers.has(hazard.id)) {
        const marker = this.createHazardMarker(hazard);
        this.scene.add(marker);
        this.hazardMarkers.set(hazard.id, marker);
      }
    });
  }

  private createHazardMarker(hazard: Hazard): THREE.Object3D {
    const group = new THREE.Group();

    // Transparent sphere to show hazard radius
    const geometrySphere = new THREE.SphereGeometry(hazard.radius, 16, 16);
    const materialSphere = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    group.add(sphere);

    // Central marker
    const geoMarker = new THREE.SphereGeometry(0.5, 16, 16);
    const matMarker = new THREE.MeshBasicMaterial({
      color: this.getSeverityColor(hazard.severity),
    });
    const marker = new THREE.Mesh(geoMarker, matMarker);
    group.add(marker);

    group.position.set(hazard.position.x, hazard.position.y, hazard.position.z);
    return group;
  }

  private getSeverityColor(severity: string): number {
    const colors: Record<string, number> = {
      critical: 0xff0000, // Red
      high: 0xff9900, // Orange
      medium: 0xffff00, // Yellow
      low: 0x00ff00, // Green
    };
    return colors[severity] || 0xff0000;
  }

  /**
   * Highlight a hazard when identified
   */
  highlightHazard(hazardId: string): void {
    const marker = this.hazardMarkers.get(hazardId);
    if (marker) {
      // Visual feedback (e.g., change color)
      const sphere = marker.children[1] as THREE.Mesh;
      if (sphere && sphere.material instanceof THREE.MeshBasicMaterial) {
        sphere.material.color.set(0x00ff00);
      }
    }
  }

  /**
   * Get the Three.js scene
   */
  getScene(): THREE.Scene {
    return this.scene;
  }

  /**
   * Get hazard markers for reference
   */
  getHazardMarker(hazardId: string): THREE.Object3D | undefined {
    return this.hazardMarkers.get(hazardId);
  }
}
