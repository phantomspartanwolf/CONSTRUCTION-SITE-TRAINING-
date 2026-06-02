import { Vector3 } from '../types';

export class PlayerController {
  position: Vector3 = { x: 0, y: 1.7, z: 0 }; // Eye height of person
  rotation = { x: 0, y: 0 }; // Pitch and yaw

  private keys: Record<string, boolean> = {};
  private moveSpeed = 0.15;
  private mouseSensitivity = 0.002;
  private isPointerLocked = false;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Keyboard input
    document.addEventListener('keydown', e => {
      this.keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', e => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Pointer lock (click to enable, ESC to disable)
    document.addEventListener('click', () => {
      document.body.requestPointerLock?.();
      this.isPointerLocked = true;
    });

    document.addEventListener('pointerlockchange', () => {
      this.isPointerLocked = document.pointerLockElement === document.body;
    });

    // Mouse movement for look
    document.addEventListener('mousemove', e => {
      if (this.isPointerLocked) {
        this.rotation.y -= e.movementX * this.mouseSensitivity;
        this.rotation.x -= e.movementY * this.mouseSensitivity;

        // Clamp vertical rotation
        this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
      }
    });
  }

  /**
   * Update player position based on input
   */
  update(): void {
    // WASD movement
    const forward = new Vector3Calc(
      Math.sin(this.rotation.y),
      0,
      Math.cos(this.rotation.y)
    );

    const right = new Vector3Calc(
      Math.cos(this.rotation.y),
      0,
      -Math.sin(this.rotation.y)
    );

    const movement = new Vector3Calc(0, 0, 0);

    if (this.keys['w'] || this.keys['arrowup']) movement.add(forward);
    if (this.keys['s'] || this.keys['arrowdown']) movement.subtract(forward);
    if (this.keys['a'] || this.keys['arrowleft']) movement.subtract(right);
    if (this.keys['d'] || this.keys['arrowright']) movement.add(right);

    // Apply movement
    if (movement.length() > 0) {
      movement.normalize();
      this.position.x += movement.x * this.moveSpeed;
      this.position.z += movement.z * this.moveSpeed;
    }

    // Spacebar for jump (basic)
    if (this.keys[' ']) {
      // Jump logic would go here if needed
    }
  }

  getDirection(): Vector3 {
    return {
      x: Math.sin(this.rotation.y),
      y: Math.sin(this.rotation.x),
      z: Math.cos(this.rotation.y),
    };
  }

  reset(position: Vector3 = { x: 0, y: 1.7, z: -10 }): void {
    this.position = position;
    this.rotation = { x: 0, y: 0 };
  }
}

// Helper class for vector math
class Vector3Calc {
  constructor(public x: number, public y: number, public z: number) {}

  add(v: Vector3Calc): Vector3Calc {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  subtract(v: Vector3Calc): Vector3Calc {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  normalize(): Vector3Calc {
    const len = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
    return this;
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
}
