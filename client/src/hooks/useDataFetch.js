import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from dummy API
 * This will be replaced with actual backend API calls later
 * 
 * @param {string} endpoint - The API endpoint to fetch from
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {object} - { data, loading, error, refetch }
 */
export const useDataFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Dummy data based on endpoint
      const dummyData = getDummyData(endpoint);
      
      setData(dummyData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

/**
 * Generate dummy data based on endpoint
 */
const getDummyData = (endpoint) => {
  const dummyDataMap = {
    '/api/projects': generateDummyProjects(),
    '/api/members': generateDummyMembers(),
    '/api/blogs': generateDummyBlogs(),
    '/api/stats': generateDummyStats(),
  };

  return dummyDataMap[endpoint] || null;
};

/**
 * Generate dummy projects data
 */
const generateDummyProjects = () => {
  return [
    {
      id: 'proj_001',
      name: 'NITT Admin Bot',
      description: 'Automated administrative assistant for NIT Trichy using NLP and intent classification',
      category: 'nlp',
      techStack: ['PyTorch', 'FastAPI', 'React', 'MongoDB'],
      metrics: {
        accuracy: 0.962,
        loss: 0.018,
        epoch: 50,
      },
      status: 'deployed',
      stars: 128,
      contributors: 8,
      lastUpdated: '2024-01-15',
      image: 'https://via.placeholder.com/400x300/050505/00F0FF?text=NITT+Admin+Bot',
      github: 'https://github.com/databyte-nitt/admin-bot',
      demo: 'https://admin-bot.databyte-nitt.tech',
    },
    {
      id: 'proj_002',
      name: 'Pragyan ML Schedule Optimizer',
      description: 'Machine learning model to optimize event scheduling for Pragyan fest',
      category: 'ml',
      techStack: ['Scikit-learn', 'Flask', 'PostgreSQL'],
      metrics: {
        accuracy: 0.948,
        loss: 0.024,
        epoch: 100,
      },
      status: 'completed',
      stars: 95,
      contributors: 6,
      lastUpdated: '2024-02-10',
      image: 'https://via.placeholder.com/400x300/050505/8A2BE2?text=Schedule+Optimizer',
      github: 'https://github.com/databyte-nitt/pragyan-optimizer',
    },
    {
      id: 'proj_003',
      name: 'CV-Based Attendance System',
      description: 'Real-time face recognition system for automated attendance tracking',
      category: 'cv',
      techStack: ['OpenCV', 'TensorFlow', 'Flask', 'MySQL'],
      metrics: {
        accuracy: 0.978,
        loss: 0.012,
        epoch: 75,
      },
      status: 'in-progress',
      stars: 156,
      contributors: 10,
      lastUpdated: '2024-02-14',
      image: 'https://via.placeholder.com/400x300/050505/00FF41?text=Face+Recognition',
      github: 'https://github.com/databyte-nitt/cv-attendance',
    },
    {
      id: 'proj_004',
      name: 'RL Game Agent',
      description: 'Reinforcement learning agent that learns to play classic arcade games',
      category: 'rl',
      techStack: ['PyTorch', 'OpenAI Gym', 'Docker'],
      metrics: {
        accuracy: 0.891,
        loss: 0.067,
        epoch: 1000,
      },
      status: 'research',
      stars: 203,
      contributors: 5,
      lastUpdated: '2024-02-12',
      image: 'https://via.placeholder.com/400x300/050505/FF00FF?text=RL+Agent',
      github: 'https://github.com/databyte-nitt/rl-game-agent',
    },
    {
      id: 'proj_005',
      name: 'Sentiment Analysis Dashboard',
      description: 'Real-time sentiment analysis of social media posts with interactive visualization',
      category: 'nlp',
      techStack: ['HuggingFace', 'React', 'FastAPI', 'Redis'],
      metrics: {
        accuracy: 0.934,
        loss: 0.031,
        epoch: 60,
      },
      status: 'deployed',
      stars: 87,
      contributors: 7,
      lastUpdated: '2024-02-08',
      image: 'https://via.placeholder.com/400x300/050505/FFD700?text=Sentiment+Analysis',
      github: 'https://github.com/databyte-nitt/sentiment-dashboard',
      demo: 'https://sentiment.databyte-nitt.tech',
    },
    {
      id: 'proj_006',
      name: 'Medical Image Segmentation',
      description: 'Deep learning model for precise segmentation of medical imaging data',
      category: 'cv',
      techStack: ['PyTorch', 'OpenCV', 'Flask'],
      metrics: {
        accuracy: 0.967,
        loss: 0.019,
        epoch: 120,
      },
      status: 'research',
      stars: 142,
      contributors: 9,
      lastUpdated: '2024-02-11',
      image: 'https://via.placeholder.com/400x300/050505/00F0FF?text=Medical+Imaging',
      github: 'https://github.com/databyte-nitt/medical-segmentation',
    },
  ];
};

/**
 * Generate dummy members data
 */
const generateDummyMembers = () => {
  return [
    {
      id: 'mem_001',
      name: 'Arjun Sharma',
      rollNo: '106122001',
      role: 'president',
      year: '3rd Year',
      branch: 'CSE',
      skills: {
        'Machine Learning': 95,
        'Deep Learning': 90,
        'Python': 98,
        'Web Dev': 75,
        'Cloud': 70,
      },
      techStack: ['PyTorch', 'TensorFlow', 'React', 'Docker'],
      projects: ['proj_001', 'proj_003'],
      github: 'https://github.com/arjun-sharma',
      linkedin: 'https://linkedin.com/in/arjun-sharma',
      contributions: 156,
      image: 'https://via.placeholder.com/200x200/050505/00F0FF?text=AS',
      bio: 'ML enthusiast passionate about Computer Vision and NLP',
    },
    {
      id: 'mem_002',
      name: 'Priya Menon',
      rollNo: '106122015',
      role: 'vice-president',
      year: '3rd Year',
      branch: 'ECE',
      skills: {
        'Machine Learning': 88,
        'Deep Learning': 92,
        'Python': 90,
        'Signal Processing': 85,
        'Research': 95,
      },
      techStack: ['PyTorch', 'Scikit-learn', 'Keras', 'MATLAB'],
      projects: ['proj_002', 'proj_006'],
      github: 'https://github.com/priya-menon',
      linkedin: 'https://linkedin.com/in/priya-menon',
      contributions: 142,
      image: 'https://via.placeholder.com/200x200/050505/8A2BE2?text=PM',
      bio: 'Research-oriented ML practitioner specializing in medical imaging',
    },
    {
      id: 'mem_003',
      name: 'Rahul Verma',
      rollNo: '106122023',
      role: 'secretary',
      year: '2nd Year',
      branch: 'CSE',
      skills: {
        'Web Dev': 92,
        'Machine Learning': 80,
        'Python': 88,
        'JavaScript': 95,
        'DevOps': 78,
      },
      techStack: ['React', 'Node.js', 'MongoDB', 'FastAPI'],
      projects: ['proj_001', 'proj_005'],
      github: 'https://github.com/rahul-verma',
      linkedin: 'https://linkedin.com/in/rahul-verma',
      contributions: 98,
      image: 'https://via.placeholder.com/200x200/050505/00FF41?text=RV',
      bio: 'Full-stack developer bridging ML models with production systems',
    },
    {
      id: 'mem_004',
      name: 'Sneha Patel',
      rollNo: '106122037',
      role: 'core',
      year: '2nd Year',
      branch: 'ICE',
      skills: {
        'Machine Learning': 82,
        'NLP': 88,
        'Python': 85,
        'Data Science': 90,
        'Statistics': 87,
      },
      techStack: ['HuggingFace', 'PyTorch', 'Pandas', 'NumPy'],
      projects: ['proj_005'],
      github: 'https://github.com/sneha-patel',
      linkedin: 'https://linkedin.com/in/sneha-patel',
      contributions: 76,
      image: 'https://via.placeholder.com/200x200/050505/FFD700?text=SP',
      bio: 'NLP researcher working on sentiment analysis and text generation',
    },
    {
      id: 'mem_005',
      name: 'Karthik Krishnan',
      rollNo: '106122042',
      role: 'core',
      year: '3rd Year',
      branch: 'CSE',
      skills: {
        'Reinforcement Learning': 93,
        'Deep Learning': 87,
        'Python': 90,
        'Game Dev': 75,
        'Algorithms': 92,
      },
      techStack: ['PyTorch', 'OpenAI Gym', 'Unity', 'C++'],
      projects: ['proj_004'],
      github: 'https://github.com/karthik-krishnan',
      linkedin: 'https://linkedin.com/in/karthik-krishnan',
      contributions: 134,
      image: 'https://via.placeholder.com/200x200/050505/FF00FF?text=KK',
      bio: 'RL enthusiast building intelligent agents for complex environments',
    },
    {
      id: 'mem_006',
      name: 'Ananya Reddy',
      rollNo: '106122058',
      role: 'member',
      year: '2nd Year',
      branch: 'EEE',
      skills: {
        'Computer Vision': 85,
        'Deep Learning': 80,
        'Python': 83,
        'Image Processing': 88,
        'CUDA': 70,
      },
      techStack: ['OpenCV', 'TensorFlow', 'Keras', 'CUDA'],
      projects: ['proj_003', 'proj_006'],
      github: 'https://github.com/ananya-reddy',
      linkedin: 'https://linkedin.com/in/ananya-reddy',
      contributions: 67,
      image: 'https://via.placeholder.com/200x200/050505/00F0FF?text=AR',
      bio: 'CV researcher focusing on real-time object detection and tracking',
    },
  ];
};

/**
 * Generate dummy blogs data
 */
const generateDummyBlogs = () => {
  return [
    {
      id: 'blog_001',
      title: 'Understanding Transformers: A Deep Dive',
      excerpt: 'Exploring the architecture that revolutionized NLP and beyond...',
      category: 'tutorial',
      author: 'Arjun Sharma',
      authorId: 'mem_001',
      date: '2024-02-10',
      readTime: '12 min',
      tags: ['NLP', 'Transformers', 'Deep Learning'],
      image: 'https://via.placeholder.com/600x400/050505/00F0FF?text=Transformers',
      likes: 234,
      views: 1456,
    },
    {
      id: 'blog_002',
      title: 'Reinforcement Learning: From Theory to Practice',
      excerpt: 'A comprehensive guide to building RL agents that actually work...',
      category: 'tutorial',
      author: 'Karthik Krishnan',
      authorId: 'mem_005',
      date: '2024-02-08',
      readTime: '15 min',
      tags: ['RL', 'Deep Learning', 'AI'],
      image: 'https://via.placeholder.com/600x400/050505/FF00FF?text=Reinforcement+Learning',
      likes: 189,
      views: 1023,
    },
    {
      id: 'blog_003',
      title: 'Medical Image Analysis: Challenges and Solutions',
      excerpt: 'Exploring state-of-the-art techniques in medical imaging AI...',
      category: 'research',
      author: 'Priya Menon',
      authorId: 'mem_002',
      date: '2024-02-05',
      readTime: '18 min',
      tags: ['Computer Vision', 'Medical AI', 'Research'],
      image: 'https://via.placeholder.com/600x400/050505/8A2BE2?text=Medical+AI',
      likes: 312,
      views: 1879,
    },
    {
      id: 'blog_004',
      title: 'Building Production-Ready ML Systems',
      excerpt: 'Best practices for deploying machine learning models at scale...',
      category: 'project',
      author: 'Rahul Verma',
      authorId: 'mem_003',
      date: '2024-02-03',
      readTime: '10 min',
      tags: ['MLOps', 'DevOps', 'Production'],
      image: 'https://via.placeholder.com/600x400/050505/00FF41?text=MLOps',
      likes: 267,
      views: 1334,
    },
  ];
};

/**
 * Generate dummy stats data
 */
const generateDummyStats = () => {
  return {
    projects: {
      total: 42,
      active: 15,
      completed: 23,
      research: 4,
    },
    members: {
      total: 156,
      active: 78,
      alumni: 45,
      core: 12,
    },
    papers: {
      published: 8,
      inReview: 5,
      drafts: 12,
    },
    contributions: {
      commits: 2456,
      pullRequests: 534,
      issues: 789,
    },
    events: {
      workshops: 24,
      hackathons: 8,
      talks: 16,
    },
  };
};

export default useDataFetch;
