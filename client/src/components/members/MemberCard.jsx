import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { cardHoverVariants } from '../../utils/animations';
import SkillRadar from './SkillRadar';

/**
 * MemberCard Component - "The Detection Frame"
 * Features:
 * - Bounding box with corner brackets (camera viewfinder style)
 * - CV label with confidence score
 * - Scan line animation on hover
 * - Keypoint face detection effect
 * - Terminal flag social links
 * - Skills displayed as radar chart overlay
 */
const MemberCard = ({ member }) => {
  const [showSkills, setShowSkills] = useState(false);
  const [showRawData, setShowRawData] = useState(false);

  // Keypoint positions for face detection effect (relative percentages)
  const keypoints = [
    { x: 40, y: 35 }, // Left eye
    { x: 60, y: 35 }, // Right eye
    { x: 50, y: 50 }, // Nose
    { x: 45, y: 65 }, // Left mouth
    { x: 55, y: 65 }, // Right mouth
  ];

  if (showRawData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-matrix-black border border-data-blue/50 rounded-lg p-6 font-mono text-xs"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-terminal-green">// RAW DATA VIEW</span>
          <button
            onClick={() => setShowRawData(false)}
            className="text-data-blue hover:text-neural-violet"
          >
            [CLOSE]
          </button>
        </div>
        <pre className="text-gray-400 overflow-auto max-h-96">
          {JSON.stringify(member, null, 2)}
        </pre>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="group relative bg-gradient-to-br from-matrix-black to-gray-900 rounded-lg overflow-hidden border border-data-blue/20 hover:border-data-blue/50 transition-all duration-300"
    >
      {/* Corner Brackets - Bounding Box Effect */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-data-blue z-10" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-data-blue z-10" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-data-blue z-10" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-data-blue z-10" />

      <div className="p-6">
        {/* CV Detection Label */}
        <div className="absolute top-4 left-12 bg-matrix-black/90 border border-data-blue/50 px-3 py-1 rounded text-xs font-mono z-20">
          <div className="text-gray-500">Object: <span className="text-data-blue">Member</span></div>
          <div className="text-gray-500">Confidence: <span className="text-terminal-green">0.99</span></div>
        </div>

        {/* Profile Image Section with Scan Effect */}
        <div className="relative mb-6 scanline">
          <div className="relative w-32 h-32 mx-auto">
            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full rounded-lg object-cover border-2 border-data-blue/30"
            />

            {/* Keypoints - Appear on hover */}
            {keypoints.map((point, index) => (
              <motion.div
                key={index}
                className="keypoint"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}

            {/* Skills Radar Overlay - Toggleable */}
            {showSkills && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0"
              >
                <SkillRadar skills={member.skills} />
              </motion.div>
            )}
          </div>

          {/* Role Badge */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-neural-violet/20 border border-neural-violet rounded-full">
            <span className="text-xs font-mono text-neural-violet uppercase">
              {member.role}
            </span>
          </div>
        </div>

        {/* Identity Block - Detection Log Style */}
        <div className="space-y-3 mt-8">
          {/* Name */}
          <div className="font-mono">
            <div className="text-xs text-gray-500 mb-1">NAME:</div>
            <div className="text-lg font-semibold text-data-blue">{member.name}</div>
          </div>

          {/* ID / Roll Number */}
          <div className="font-mono text-sm">
            <span className="text-gray-500">ID:</span>
            <span className="text-terminal-green ml-2">{member.rollNo}</span>
          </div>

          {/* Branch & Year */}
          <div className="flex items-center space-x-4 font-mono text-xs text-gray-400">
            <span>{member.branch}</span>
            <span className="text-gray-700">|</span>
            <span>{member.year}</span>
          </div>

          {/* Bio */}
          {member.bio && (
            <p className="text-sm text-gray-400 leading-relaxed pt-2 border-t border-gray-800">
              {member.bio}
            </p>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {member.techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-data-blue/10 border border-data-blue/30 rounded text-xs font-mono text-data-blue"
              >
                {tech}
              </span>
            ))}
            {member.techStack.length > 3 && (
              <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-gray-500">
                +{member.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Contribution Count */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800 font-mono text-xs">
            <span className="text-gray-500">Contributions:</span>
            <span className="text-terminal-green font-semibold">{member.contributions}</span>
          </div>
        </div>

        {/* Social Links - Terminal Flags */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-data-blue transition-colors"
                title="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-data-blue transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSkills(!showSkills)}
              className="px-3 py-1 bg-data-blue/10 border border-data-blue/30 rounded text-xs font-mono text-data-blue hover:bg-data-blue/20 transition-all"
            >
              {showSkills ? 'Hide' : 'Skills'}
            </button>
            <button
              onClick={() => setShowRawData(true)}
              className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-gray-500 hover:text-data-blue transition-colors"
              title="View Raw JSON"
            >
              {'{}'}
            </button>
          </div>
        </div>
      </div>

      {/* Scan Line Effect (CSS-based, appears on hover) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanline-effect" />
      </div>
    </motion.div>
  );
};

export default MemberCard;
