# SmarthomeKZ — AI-Powered IoT Security Platform

A futuristic, production-grade smart-home cybersecurity cockpit.
Built with React · Vite · TailwindCSS · Framer Motion · Recharts · Lucide.

## Features

- **Landing Page** — cinematic hero with animated 2D smart-house preview, features grid, animated live counters, futuristic footer.
- **Authentication** — glassmorphism login with animated background and password visibility toggle (`admin / admin`).
- **Smart Home Scheme** — top-view floor plan with rooms (Living, Kitchen, Bedroom, Office, Garage) and animated IoT devices.
- **Device Status System** — green / yellow / red / gray states with pulsing glow effects.
- **Device Panel** — futuristic side panel with telemetry, controls (turn off, reboot, isolate, block IP, rotate key) and red-team triggers.
- **Realtime Monitoring** — live throughput, anomaly and threat-score charts plus a radial security-score gauge.
- **Network Topology** — animated mesh of Core Server → MQTT Broker → IoT devices with secure/compromised channels.
- **AI Threat Analysis** — neural scanner UI, anomaly confidence chart and streaming insight feed.
- **Attack Simulation Center** — launch Brute Force, MITM, Replay, DDoS, Packet Spoofing and Port Scan drills.
- **Notifications System** — cinematic success / warning / danger alerts with auto-dismiss.
- **Event Logs** — live SIEM-style stream with level filters.
- **Devices Registry** — searchable grid of every IoT node with full metadata.

## Stack

- React 18 + Vite 5
- React Router 6
- TailwindCSS 3 (custom cyber theme, glassmorphism, neon glow utilities)
- Framer Motion (page + element animations)
- Recharts (live time-series + radial charts)
- Lucide Icons

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # serve production build
```

### Credentials

```
login:    admin
password: admin
```

## Project structure

```
src/
├── App.jsx                       # Routing + lazy-loaded pages
├── main.jsx
├── index.css                     # Cyber theme & utilities
├── context/
│   ├── AuthContext.jsx           # Auth state (admin / admin)
│   └── SecurityContext.jsx       # Devices, attacks, AI, logs, metrics
├── data/devices.js               # IoT fleet + attack catalog
├── layouts/DashboardLayout.jsx   # Sidebar + topbar shell
├── components/
│   ├── common/                   # Background, Panel, StatCard, NotificationStack...
│   └── scheme/                   # HouseScheme, DevicePanel
└── pages/
    ├── Landing.jsx
    ├── Login.jsx
    ├── Dashboard.jsx
    ├── SmartHome.jsx
    ├── NetworkTopology.jsx
    ├── AIAnalysis.jsx
    ├── AttackCenter.jsx
    ├── Devices.jsx
    └── Logs.jsx
```

## Design language

- **Palette** — deep space navy, neon cyan, electric blue, violet purple, alert red, status green.
- **Effects** — glassmorphism, scanlines, animated grids, particle flow, gradient borders, ping pulses.
- **Typography** — Orbitron for display, Inter for UI, JetBrains Mono for telemetry.

## License

MIT — built for demonstration.
