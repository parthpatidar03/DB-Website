// Navigation Links Configuration
export const NAV_LINKS = [
  {
    id: '00',
    label: 'Projects',
    path: '/projects',
    notation: 'bracket', // [Projects]
  },
  {
    id: '01',
    label: 'Members',
    path: '/members',
    notation: 'curly', // {Members}
  },
  {
    id: '02',
    label: 'Blogs',
    path: '/blogs',
    notation: 'slash', // //Blogs
  },
];

// Project Categories for ML Projects
export const PROJECT_CATEGORIES = [
  {
    id: 'all',
    label: 'All Projects',
    query: 'SELECT * FROM projects',
    color: '#00F0FF',
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    query: 'SELECT * FROM projects WHERE category = "CV"',
    color: '#8A2BE2',
    icon: '👁️',
  },
  {
    id: 'nlp',
    label: 'Natural Language Processing',
    query: 'SELECT * FROM projects WHERE category = "NLP"',
    color: '#00FF41',
    icon: '📝',
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    query: 'SELECT * FROM projects WHERE category = "DL"',
    color: '#FF00FF',
    icon: '🧠',
  },
  {
    id: 'web',
    label: 'Web Development',
    query: 'SELECT * FROM projects WHERE category = "WEB"',
    color: '#FF6B6B',
    icon: '🌐',
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    query: 'SELECT * FROM projects WHERE category = "ML"',
    color: '#FFD700',
    icon: '📊',
  },
  {
    id: 'rl',
    label: 'Reinforcement Learning',
    query: 'SELECT * FROM projects WHERE category = "RL"',
    color: '#009688',
    icon: '🎮',
  },
];

// Tech Stack Options (Visual mapping for tags)
export const TECH_STACKS = {
  pytorch: { label: 'PyTorch', color: '#EE4C2C' },
  tensorflow: { label: 'TensorFlow', color: '#FF6F00' },
  keras: { label: 'Keras', color: '#D00000' },
  sklearn: { label: 'Scikit-learn', color: '#F7931E' },
  opencv: { label: 'OpenCV', color: '#5C3EE8' },
  huggingface: { label: 'HuggingFace', color: '#FFD21E' },
  react: { label: 'React', color: '#61DAFB' },
  nodejs: { label: 'Node.js', color: '#339933' },
  mongodb: { label: 'MongoDB', color: '#47A248' },
  fastapi: { label: 'FastAPI', color: '#009688' },
  flask: { label: 'Flask', color: '#000000' },
  docker: { label: 'Docker', color: '#2496ED' },
};

// Member Batches
export const MEMBER_BATCHES = [
  { id: '2026', label: 'Head', color: '#FFD700' },
  { id: '2027', label: 'Manager', color: '#00F0FF' },
  { id: '2028', label: 'Coordinator', color: '#8A2BE2' },
];

export const BATCH_ROLES = {
  '2026': 'Head',
  '2027': 'Manager',
  '2028': 'Coordinator',
};

// Member Domains
export const MEMBER_DOMAINS = [
  { id: 'cv', label: 'Computer Vision', color: '#8A2BE2' },
  { id: 'nlp', label: 'NLP', color: '#00FF41' },
  { id: 'web', label: 'Web Development', color: '#61DAFB' },
  { id: 'design', label: 'Design', color: '#FF00FF' },
];

// System Metrics (for navbar ticker)
export const SYSTEM_METRICS = {
  epoch: 42,
  accuracy: 0.982,
  loss: 0.014,
  status: 'STABLE',
  build: 'v2.1.0',
};

// Social Media Links
export const SOCIAL_LINKS = [
  // {
  //   id: 'github',
  //   label: 'GitHub',
  //   url: 'https://github.com/databyte-nitt',
  //   flag: '--github',
  //   icon: 'Github',
  // },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/data-byte/',
    flag: '--linkedin',
    icon: 'Linkedin',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/databyte_nitt/',
    flag: '--instagram',
    icon: 'Instagram',
  },
  {
    id: 'medium',
    label: 'Medium',
    url: 'https://medium.com/@databyte.club',
    flag: '--medium',
    icon: 'Book',
  },
  // {
  //   id: 'mail',
  //   label: 'Email',
  //   url: 'mailto:data@nitt.edu',
  //   flag: '--mail',
  //   icon: 'Mail',
  // },
];

// Contact Information
export const CONTACT_INFO = {
  email: 'data@nitt.edu',
  location: {
    name: 'National Institute of Technology, Tiruchirappalli',
    coordinates: {
      lat: 10.7554,
      lng: 78.8156,
    },
    address: 'NIT Trichy, Tamil Nadu 620015, India',
  },
};

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl+K', description: 'Open Command Palette', command: 'openPalette' },
  { key: 'Ctrl+/', description: 'Toggle Wireframe Mode', command: 'toggleWireframe' },
  { key: 'Ctrl+D', description: 'Toggle Dark Mode', command: 'toggleTheme' },
  { key: 'Esc', description: 'Close Modal', command: 'closeModal' },
];

// Club Ticker Messages (for scrolling ticker)
export const TICKER_MESSAGES = [
  'NITT_ADMIN_BOT deployed... ✓',
  'Pragyan_ML_Event completed... ✓',
  'Research_Paper accepted at ICML... ✓',
  'Hackathon_Winner 2024... ✓',
  'New_Model trained: 98.2% accuracy... ✓',
  'Workshop conducted: 200+ participants... ✓',
  'Collaboration with Google Research... ✓',
  'Open Source Contribution: 50+ PRs merged... ✓',
];

// File System Structure (for navigation)
export const FILE_SYSTEM = {
  root: {
    'home.py': '/',
    'projects/': '/projects',
    'members/': {
      'roster.json': '/members'
    },
  },
};
