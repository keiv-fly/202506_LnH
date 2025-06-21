# Top-Down Multi-Map Game Design (JavaScript 2024)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture and Folder Structure](#architecture-and-folder-structure)
3. [Division of Logic: UI vs Core by Map Type](#division-of-logic-ui-vs-core-by-map-type)
4. [Core Systems by Map Type](#core-systems-by-map-type)

   * [Battle Core](#battle-core)
   * [World Core](#world-core)
   * [City Core](#city-core)
5. [Shared Systems](#shared-systems)
6. [State Management](#state-management)
7. [Scenes & Flow](#scenes--flow)
8. [UI Components](#ui-components)
9. [Integration & Data Flow](#integration--data-flow)
10. [Testing & CI](#testing--ci)
11. [Extensibility & Next Steps](#extensibility--next-steps)

---

## Project Overview

A modular design for a top-down, tile-based game in Phaser with three fully separate core logic modules (Battle, World, City), each paired with its UI scene. Built in ES2024.

**Map Types:**

* **Battle Maps**: Turn-based combat with time-cost actions.
* **World Map**: Turn-based travel across nodes with time tracking.
* **City Map**: Real-time interaction scenes (trading, dialogue).

---

## Architecture and Folder Structure

```plaintext
/src
  /core
    /battle        # Battle-specific game rules
      battleCore.js    # Turn resolution, entity actions
      battleEntities.js
      battleCombat.js
      battleTurnManager.js
      battleTimeQueue.js
    /world         # World map travel logic
      worldCore.js     # Node graph travel, time progression
      worldEntities.js
      worldTurnManager.js
      worldTimeQueue.js
    /city          # Real-time city interaction logic
      cityCore.js      # Continuous update loop, NPC behaviors
      cityEntities.js
      cityInteraction.js
    /shared        # Shared utilities and types
      entities.js     # Base Entity class and stats
      eventEmitter.js # Shared event bus
  /phaser
    /scenes
      battleScene.js
      worldScene.js
      cityScene.js
    /ui
      /battle      # HUD for battles
        healthBar.js
        actionMenu.js
        turnLog.js
      /world       # HUD for world map
        worldHUD.js
        travelMenu.js
      /city        # Real-time UI
        tradeInterface.js
        dialogueBox.js
    index.js        # Phaser config and scene registration
/public
  index.html      # HTML entry point loading index.js and assets
  assets
```

```

---

## Division of Logic: UI vs Core by Map Type
Each map type has its own core module in `/src/core/{battle,world,city}`, completely independent of others:

| Map Type | Core Module        | Scene & UI Module         |
|----------|--------------------|---------------------------|
| Battle   | `/src/core/battle` | `battleScene.js` + `/ui/battle/*` |
| World    | `/src/core/world`  | `worldScene.js` + `/ui/world/*` |
| City     | `/src/core/city`   | `cityScene.js` + `/ui/city/*` |

Shared code (entities, events) lives in `/src/core/shared` and is imported by each core.

---

## Core Systems by Map Type

### Battle Core
- **battleCore.js**: Manages turn loop, action queue, and event emission.
- **battleEntities.js**: Player and Rat classes extend shared `Entity`.
- **battleCombat.js**: Damage, hit/miss, and status logic.
- **battleTurnManager.js** & **battleTimeQueue.js**: Schedule and dequeue actions by cost.

### World Core
- **worldCore.js**: Manages node graph, calculates travel duration, advances world time.
- **worldEntities.js**: `Hero` and `Town` entities.
- **worldTurnManager.js** & **worldTimeQueue.js**: Similar to battle but for travel actions.

### City Core
- **cityCore.js**: Initializes real-time update loop; processes interaction events immediately.
- **cityEntities.js**: `NPC`, `Vendor`, and interior objects.
- **cityInteraction.js**: Handles trading, dialogue, and triggers.

---

## Shared Systems
- **entities.js**: Base `Entity` with position, stats, actions list.
- **eventEmitter.js**: Simple pub/sub for events across core and UI.

---

## State Management
- **Battle & World:** Immutable `GameState` snapshots per turn.
- **City:** Mutable `LiveState` updated each frame.
- States reside within respective core modules.

---

## Scenes & Flow
1. **Index** registers three scenes.
2. **battleScene.js**: Instantiates `battleCore`, subscribes to battle events, renders tile map + sprites.
3. **worldScene.js**: Instantiates `worldCore`, subscribes to travel events, displays world nodes.
4. **cityScene.js**: Instantiates `cityCore`, starts real-time loop, displays interior.
5. **Transitions:** UI calls core’s `requestTransition(mapType, mapId)`, then `scene.start(...)`.

---

## UI Components
- **Battle UI** (`/ui/battle`): health bar, action menu, turn log.
- **World UI** (`/ui/world`): worldHUD, travelMenu.
- **City UI** (`/ui/city`): tradeInterface, dialogueBox.

UI modules import only their core’s events and APIs.

---

## Integration & Data Flow
1. **Scene Init** → load core module for chosen map type.
2. **Input** → UI component → core API (enqueue action or immediate call).
3. **Core Processing** → emits domain events.
4. **UI** → listens & updates view.
5. **Switch Maps** → core `requestTransition` → Phaser scene change.

---

## Testing & CI
- `/tests/core/battle`, `/tests/core/world`, `/tests/core/city` with Jest.
- `/tests/phaser` integration tests with Playwright.
- CI pipelines in `/tests/ci` run all suites and enforce coverage. Before running Playwright tests locally or in CI, install the browsers with `npx playwright install`.

---
## Build & Deployment
- Bundled with Vite. The `vite.config.js` sets `base: '/202506_LnH/'` so assets resolve correctly on GitHub Pages.
- Run `npm run deploy` to build and publish the `dist` directory using `gh-pages`.

## Extensibility & Next Steps
- Add new map cores (e.g., dungeon crawler, naval travel).
- Swap core implementations at runtime for modding support.
- Implement save/load per core state.

*End of design, fully separated core logic per map type.*

```
