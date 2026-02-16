#!/bin/bash

# Create SkillRadar component
cat > src/components/members/SkillRadar.jsx << 'EOF'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

/**
 * SkillRadar Component - Mini Chart for Skills
 * Displays member skills in a radar chart format
 */
const SkillRadar = ({ skills }) => {
  // Convert skills object to array format for recharts
  const data = Object.entries(skills).map(([skill, value]) => ({
    skill,
    value,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-full bg-matrix-black/95 rounded-lg p-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#00F0FF" strokeOpacity={0.3} />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: '#00F0FF', fontSize: 10 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: '#8A2BE2', fontSize: 8 }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#00F0FF"
            fill="#00F0FF"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;
EOF

# Create ProjectCard component
cat > src/components/projects/ProjectCard.jsx << 'EOF'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Users, Star } from 'lucide-react';
import { cardHoverVariants } from '../../utils/animations';

/**
 * ProjectCard Component - "The Neuron Card"
 * Features:
 * - Training log snippet
 * - Loss curve background
 * - Tech stack weight visualization
 * - Status badge
 * - Hover reveals more details
 */
const ProjectCard = ({ project }) => {
  const [showRawData, setShowRawData] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      deployed: 'terminal-green',
      'in-progress': 'neural-violet',
      completed: 'data-blue',
      research: 'yellow-500',
    };
    return colors[status] || 'gray-500';
  };

  if (showRawData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-matrix-black border border-data-blue/50 rounded-lg p-6 font-mono text-xs h-full"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-terminal-green">// RAW PROJECT DATA</span>
          <button
            onClick={() => setShowRawData(false)}
            className="text-data-blue hover:text-neural-violet"
          >
            [CLOSE]
          </button>
        </div>
        <pre className="text-gray-400 overflow-auto max-h-96">
          {JSON.stringify(project, null, 2)}
        </pre>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="group relative bg-gradient-to-br from-matrix-black to-gray-900 rounded-lg overflow-hidden border border-data-blue/20 hover:border-data-blue/50 transition-all duration-300 h-full flex flex-col"
    >
      {/* Project Image/Preview */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-matrix-black via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 bg-${getStatusColor(project.status)}/20 border border-${getStatusColor(project.status)} rounded-full`}>
          <span className={`text-xs font-mono text-${getStatusColor(project.status)} uppercase`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Project Name - Tag Format */}
        <div className="mb-3">
          <h3 className="text-xl font-mono font-semibold text-data-blue group-hover:text-neural-violet transition-colors">
            {'<'}{project.name}{' />'}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Training Log */}
        <div className="bg-matrix-black/50 border border-terminal-green/30 rounded p-3 mb-4 font-mono text-xs">
          <div className="text-terminal-green mb-1">$ tail -n 1 project_log.txt</div>
          <div className="text-gray-500">
            Epoch {project.metrics.epoch}/{project.metrics.epoch}: 
            <span className="text-neural-violet"> loss: {project.metrics.loss.toFixed(3)}</span> - 
            <span className="text-data-blue"> acc: {project.metrics.accuracy.toFixed(3)}</span>
            <span className="text-terminal-green"> - [{project.status.toUpperCase()}]</span>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-data-blue/10 border border-data-blue/30 rounded text-xs font-mono text-data-blue"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs font-mono text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-500" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{project.contributors}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center space-x-3 mt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-400 hover:text-data-blue transition-colors"
            >
              <Github size={16} />
              <span className="text-xs font-mono">Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-400 hover:text-terminal-green transition-colors"
            >
              <ExternalLink size={16} />
              <span className="text-xs font-mono">Demo</span>
            </a>
          )}
          <button
            onClick={() => setShowRawData(true)}
            className="ml-auto px-2 py-1 bg-gray-800 rounded text-xs font-mono text-gray-500 hover:text-data-blue transition-colors"
          >
            {'{}'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
EOF

echo "✅ Created component files"
