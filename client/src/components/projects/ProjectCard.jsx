import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
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
      {/* Project Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Project Name & Status */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-mono font-semibold text-data-blue group-hover:text-neural-violet transition-colors">
            {'<'}{project.name}{' />'}
          </h3>
          <span className={`px-2 py-1 text-[10px] font-mono uppercase bg-${getStatusColor(project.status)}/10 border border-${getStatusColor(project.status)}/30 rounded-full text-${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Training Log */}
        <div className="bg-matrix-black/50 border border-terminal-green/30 rounded p-3 mb-4 font-mono text-xs">
          <div className="text-terminal-green mb-1">$ tail -n 1 project_log.txt</div>
          <div className="text-gray-500">
            Epoch {(project.metrics?.epoch || 100)}/{(project.metrics?.epoch || 100)}: 
            <span className="text-neural-violet"> loss: {(project.metrics?.loss || 0.042).toFixed(3)}</span> - 
            <span className="text-data-blue"> acc: {(project.metrics?.accuracy || 0.985).toFixed(3)}</span>
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
