import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS, SYSTEM_METRICS } from '../../utils/constants';
import { fadeInVariants } from '../../utils/animations';

/**
 * Footer Component - "The End-of-File (EOF)"
 * Features:
 * - Heatmap background pattern
 * - Contact info displayed as variables
 * - Location as coordinates
 * - Git commit information
 * - Social media links as terminal flags
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Icon mapping for social links
  const iconMap = {
    Github,
    Linkedin,
    Instagram,
    Mail,
  };

  return (
    <footer className="relative bg-matrix-black border-t border-data-blue/20 overflow-hidden">
      {/* Heatmap Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-data-blue"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                backgroundColor: [
                  'rgba(0, 240, 255, 0.1)',
                  'rgba(138, 43, 226, 0.2)',
                  'rgba(0, 240, 255, 0.1)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-mono font-semibold text-data-blue mb-4">
              {'<Contact />'}
            </h3>
            
            {/* Email as const variable */}
            <div className="font-mono text-sm">
              <span className="text-neural-violet">const</span>
              <span className="text-gray-400"> CONTACT = </span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-data-blue hover:text-terminal-green transition-colors"
              >
                "{CONTACT_INFO.email}"
              </a>
              <span className="text-gray-400">;</span>
            </div>

            {/* Location as coordinates */}
            <div className="font-mono text-xs space-y-1">
              <div className="flex items-start space-x-2 text-gray-500">
                <MapPin size={14} className="mt-1 text-data-blue" />
                <div>
                  <div className="text-gray-400">{CONTACT_INFO.location.name}</div>
                  <div className="text-gray-600">
                    LAT: {CONTACT_INFO.location.coordinates.lat} | 
                    LNG: {CONTACT_INFO.location.coordinates.lng}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-mono font-semibold text-data-blue mb-4">
              {'{ QuickLinks }'}
            </h3>
            <div className="space-y-2 font-mono text-sm">
              <a
                href="/projects"
                className="block text-gray-400 hover:text-data-blue transition-colors terminal-prompt"
              >
                projects/
              </a>
              <a
                href="/members"
                className="block text-gray-400 hover:text-data-blue transition-colors terminal-prompt"
              >
                members.json
              </a>
              <a
                href="/blogs"
                className="block text-gray-400 hover:text-data-blue transition-colors terminal-prompt"
              >
                blog/research.md
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-mono font-semibold text-data-blue mb-4">
              [Social_Links]
            </h3>
            <div className="space-y-3">
              {SOCIAL_LINKS.map(link => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-400 hover:text-data-blue transition-colors group"
                  >
                    <Icon size={18} className="group-hover:animate-pulse" />
                    <span className="font-mono text-sm">
                      <span className="text-terminal-green">{link.flag}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Section - Git Commit Info */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="font-mono text-xs text-gray-600">
            <span className="text-gray-500">©</span> {currentYear} DataByte NITT. 
            <span className="text-gray-700"> All rights reserved.</span>
          </div>

          {/* Git Commit */}
          <div className="font-mono text-xs text-gray-600 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Build:</span>
              <span className="text-data-blue">{SYSTEM_METRICS.build}</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Hash:</span>
              <span className="text-neural-violet">{SYSTEM_METRICS.hash}</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Status:</span>
              <span className="text-terminal-green flex items-center">
                <span className="w-2 h-2 bg-terminal-green rounded-full mr-2 animate-pulse" />
                {SYSTEM_METRICS.status}
              </span>
            </div>
          </div>
        </div>

        {/* Easter Egg - Hidden Code Comment */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs text-gray-800">
            // Built with 💙 by DataByte | Train hard, deploy harder
          </p>
        </div>
      </div>

      {/* Animated Corner Brackets */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-data-blue/30"
        animate={{
          borderColor: ['rgba(0, 240, 255, 0.3)', 'rgba(138, 43, 226, 0.3)', 'rgba(0, 240, 255, 0.3)'],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-neural-violet/30"
        animate={{
          borderColor: ['rgba(138, 43, 226, 0.3)', 'rgba(0, 240, 255, 0.3)', 'rgba(138, 43, 226, 0.3)'],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </footer>
  );
};

export default Footer;
