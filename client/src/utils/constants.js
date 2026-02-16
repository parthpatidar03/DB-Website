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
    notation: 'slash', // /Blogs/
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
    id: 'nlp',
    label: 'Natural Language Processing',
    query: 'SELECT * FROM projects WHERE category = "NLP"',
    color: '#00F0FF',
    icon: '📝',
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    query: 'SELECT * FROM projects WHERE category = "CV"',
    color: '#8A2BE2',
    icon: '👁️',
  },
  {
    id: 'rl',
    label: 'Reinforcement Learning',
    query: 'SELECT * FROM projects WHERE category = "RL"',
    color: '#00FF41',
    icon: '🎮',
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    query: 'SELECT * FROM projects WHERE category = "DL"',
    color: '#FF00FF',
    icon: '🧠',
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    query: 'SELECT * FROM projects WHERE category = "ML"',
    color: '#FFD700',
    icon: '📊',
  },
  {
    id: 'web',
    label: 'Web Development',
    query: 'SELECT * FROM projects WHERE category = "WEB"',
    color: '#FF6B6B',
    icon: '🌐',
  },
];

// Tech Stack Options
export const TECH_STACKS = [
  { id: 'pytorch', label: 'PyTorch', color: '#EE4C2C' },
  { id: 'tensorflow', label: 'TensorFlow', color: '#FF6F00' },
  { id: 'keras', label: 'Keras', color: '#D00000' },
  { id: 'sklearn', label: 'Scikit-learn', color: '#F7931E' },
  { id: 'opencv', label: 'OpenCV', color: '#5C3EE8' },
  { id: 'huggingface', label: 'HuggingFace', color: '#FFD21E' },
  { id: 'react', label: 'React', color: '#61DAFB' },
  { id: 'nodejs', label: 'Node.js', color: '#339933' },
  { id: 'mongodb', label: 'MongoDB', color: '#47A248' },
  { id: 'fastapi', label: 'FastAPI', color: '#009688' },
  { id: 'flask', label: 'Flask', color: '#000000' },
  { id: 'docker', label: 'Docker', color: '#2496ED' },
];

// Member Roles
export const MEMBER_ROLES = [
  { id: 'president', label: 'President', color: '#FFD700' },
  { id: 'vice-president', label: 'Vice President', color: '#C0C0C0' },
  { id: 'secretary', label: 'Secretary', color: '#CD7F32' },
  { id: 'core', label: 'Core Member', color: '#00F0FF' },
  { id: 'member', label: 'Member', color: '#8A2BE2' },
  { id: 'alumni', label: 'Alumni', color: '#6B7280' },
];

// System Metrics (for navbar ticker)
export const SYSTEM_METRICS = {
  epoch: 42,
  accuracy: 0.982,
  loss: 0.014,
  status: 'STABLE',
  build: 'v2.0.26',
  hash: '7d3f2a',
};

// Social Media Links
export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/databyte-nitt',
    flag: '--github',
    icon: 'Github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/databyte-nitt',
    flag: '--linkedin',
    icon: 'Linkedin',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/databyte.nitt',
    flag: '--instagram',
    icon: 'Instagram',
  },
  {
    id: 'mail',
    label: 'Email',
    url: 'mailto:data@nitt.edu',
    flag: '--mail',
    icon: 'Mail',
  },
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

// Blog Categories
export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Notebooks', icon: '📚' },
  { id: 'tutorial', label: 'Tutorials', icon: '📖' },
  { id: 'research', label: 'Research Papers', icon: '🔬' },
  { id: 'project', label: 'Project Logs', icon: '📝' },
  { id: 'event', label: 'Events', icon: '🎉' },
];

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl+K', description: 'Open Command Palette', command: 'openPalette' },
  { key: 'Ctrl+/', description: 'Toggle Wireframe Mode', command: 'toggleWireframe' },
  { key: 'Ctrl+D', description: 'Toggle Dark Mode', command: 'toggleTheme' },
  { key: 'Esc', description: 'Close Modal', command: 'closeModal' },
];

// Animation Configuration
export const ANIMATION_CONFIG = {
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  },
};

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
    'members.json': '/members',
    'blog/': {
      'research.md': '/blogs',
    },
  },
};
