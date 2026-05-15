// Initial IoT device fleet for the SmarthomeKZ platform.
export const ROOMS = [
  { id: 'living', name: 'Living Room', x: 4, y: 6, w: 44, h: 36 },
  { id: 'kitchen', name: 'Kitchen', x: 50, y: 6, w: 30, h: 22 },
  { id: 'bedroom', name: 'Bedroom', x: 50, y: 30, w: 30, h: 28 },
  { id: 'office', name: 'Office', x: 4, y: 44, w: 28, h: 24 },
  { id: 'garage', name: 'Garage', x: 34, y: 60, w: 46, h: 22 },
]

export const DEVICE_TYPES = {
  camera: { label: 'Smart Camera', icon: 'Cctv' },
  tv: { label: 'Smart TV', icon: 'Tv' },
  lock: { label: 'Smart Lock', icon: 'Lock' },
  lamp: { label: 'Smart Lamp', icon: 'Lamp' },
  thermostat: { label: 'Thermostat', icon: 'Thermometer' },
  smoke: { label: 'Smoke Detector', icon: 'Flame' },
  speaker: { label: 'Smart Speaker', icon: 'Speaker' },
  hub: { label: 'IoT Hub', icon: 'Router' },
  fridge: { label: 'Smart Fridge', icon: 'Refrigerator' },
  blinds: { label: 'Smart Blinds', icon: 'Blinds' },
}

const randIp = () => `192.168.1.${Math.floor(Math.random() * 230) + 10}`
const randMac = () =>
  '00:1B:44:' + Array.from({ length: 3 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()).join(':')

export const INITIAL_DEVICES = [
  // Living Room
  { id: 'd-cam-01', type: 'camera', name: 'Front-Door Camera', room: 'living', x: 8, y: 14 },
  { id: 'd-tv-01', type: 'tv', name: 'OLED Living TV', room: 'living', x: 26, y: 14 },
  { id: 'd-lamp-01', type: 'lamp', name: 'Mood Lamp', room: 'living', x: 38, y: 22 },
  { id: 'd-speaker-01', type: 'speaker', name: 'Atmos Speaker', room: 'living', x: 18, y: 34 },
  { id: 'd-blinds-01', type: 'blinds', name: 'Living Blinds', room: 'living', x: 40, y: 38 },

  // Kitchen
  { id: 'd-fridge-01', type: 'fridge', name: 'Smart Fridge', room: 'kitchen', x: 55, y: 11 },
  { id: 'd-smoke-01', type: 'smoke', name: 'Kitchen Smoke', room: 'kitchen', x: 70, y: 11 },
  { id: 'd-lamp-02', type: 'lamp', name: 'Kitchen Lamp', room: 'kitchen', x: 70, y: 22 },

  // Bedroom
  { id: 'd-lamp-03', type: 'lamp', name: 'Bed Lamp', room: 'bedroom', x: 55, y: 36 },
  { id: 'd-thermo-01', type: 'thermostat', name: 'Thermostat', room: 'bedroom', x: 70, y: 36 },
  { id: 'd-cam-02', type: 'camera', name: 'Nursery Cam', room: 'bedroom', x: 70, y: 50 },
  { id: 'd-speaker-02', type: 'speaker', name: 'Bed Speaker', room: 'bedroom', x: 55, y: 50 },

  // Office
  { id: 'd-hub-01', type: 'hub', name: 'Core IoT Hub', room: 'office', x: 14, y: 52 },
  { id: 'd-cam-03', type: 'camera', name: 'Office Cam', room: 'office', x: 24, y: 52 },
  { id: 'd-lamp-04', type: 'lamp', name: 'Desk Lamp', room: 'office', x: 24, y: 62 },

  // Garage
  { id: 'd-lock-01', type: 'lock', name: 'Garage Lock', room: 'garage', x: 40, y: 70 },
  { id: 'd-cam-04', type: 'camera', name: 'Driveway Cam', room: 'garage', x: 56, y: 66 },
  { id: 'd-smoke-02', type: 'smoke', name: 'Garage Smoke', room: 'garage', x: 72, y: 66 },
  { id: 'd-lock-02', type: 'lock', name: 'Main Door Lock', room: 'garage', x: 72, y: 74 },
].map((d, i) => ({
  ...d,
  ip: randIp(),
  mac: randMac(),
  encryption: 'AES-256-GCM',
  firmware: `v${(Math.random() * 3 + 1).toFixed(2)}.${i + 1}`,
  status: 'green', // green | yellow | red | gray
  cpu: Math.floor(Math.random() * 30) + 10,
  traffic: Math.floor(Math.random() * 120) + 20,
  threatScore: Math.floor(Math.random() * 12),
  lastActivity: Date.now() - Math.floor(Math.random() * 1000 * 60 * 8),
  vendor: ['Tesla', 'Aqara', 'Bosch', 'Xiaomi', 'Nest', 'Hue'][Math.floor(Math.random() * 6)],
}))

export const ATTACK_TYPES = [
  { id: 'brute', label: 'Brute Force', level: 'high', color: 'red' },
  { id: 'mitm', label: 'MITM Attack', level: 'critical', color: 'red' },
  { id: 'replay', label: 'Replay Attack', level: 'medium', color: 'yellow' },
  { id: 'ddos', label: 'DDoS Flood', level: 'high', color: 'red' },
  { id: 'spoof', label: 'Packet Spoofing', level: 'medium', color: 'yellow' },
  { id: 'scan', label: 'Port Scan', level: 'low', color: 'yellow' },
]
