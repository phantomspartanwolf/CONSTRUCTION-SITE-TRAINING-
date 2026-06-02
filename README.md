# Construction Safety Training Simulator

A web-based 3D interactive safety training simulator for construction site supervisors in Ghana. Built with Three.js, React, and TypeScript.

## Phase 1 - Foundation

### Features Included
- ✅ Three.js scene with realistic construction site environment
- ✅ First-person player movement (WASD + mouse look)
- ✅ 10 hazard definitions in realistic construction context
- ✅ Hazard detection system (proximity-based)
- ✅ 3 training scenarios (Beginner, Intermediate, Advanced)
- ✅ Supervisor decision UI
- ✅ Results report with scoring system
- ✅ Full-screen immersive 3D environment

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## How It Works

1. **Scenario Selection**: Users choose from three difficulty levels
2. **3D Environment**: Navigate a realistic construction site in first-person view
3. **Hazard Identification**: Get close to hazards (within detection radius) to see them
4. **Make Decisions**: Use supervisor actions (Stop Work, Isolate Area, Enforce PPE, Emergency Response)
5. **Performance Report**: Get detailed feedback on identified hazards and decisions made

## Project Structure

```
src/
├── types/              # TypeScript type definitions
├── scenes/             # Three.js scene setup
├── hazards/            # Hazard system
├── scenarios/          # Training scenario definitions
├── player/             # Player controller
├── components/         # React UI components
└── styles/             # CSS stylesheets
```

## Technology Stack

- **React 18.2** - UI framework
- **Three.js r128** - 3D graphics engine
- **TypeScript 5** - Type safety
- **CSS3** - Styling

## Phase 2 Roadmap

- [ ] Enhanced hazard system with consequences
- [ ] NPC characters with realistic behaviors
- [ ] Emergency scenario progression
- [ ] Advanced scoring algorithm
- [ ] Performance metrics dashboard
- [ ] Scenario time limits
- [ ] Audio feedback system
- [ ] Multiplayer capability

## License

MIT
