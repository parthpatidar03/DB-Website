import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal as TerminalIcon, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS, KEYBOARD_SHORTCUTS } from '../../utils/constants';

/**
 * Terminal Command Palette Component
 * Features:
 * - Opens with Ctrl+K or Cmd+K
 * - Command-based navigation
 * - Quick search functionality
 * - Theme toggle
 * - Wireframe mode toggle
 */
const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Command handlers
  const commands = {
    'goto projects': () => navigate('/projects'),
    'goto members': () => navigate('/members'),
    'goto blogs': () => navigate('/blogs'),
    'goto home': () => navigate('/'),
    'theme light': () => console.log('Light theme not available'),
    'theme dark': () => console.log('Already in dark mode'),
    'toggle wireframe': () => toggleWireframe(),
    'help': () => showHelp(),
    'clear': () => setCommand(''),
  };

  // Toggle wireframe mode
  const toggleWireframe = useCallback(() => {
    document.body.classList.toggle('wireframe-mode');
    setIsOpen(false);
  }, []);

  // Show help
  const showHelp = useCallback(() => {
    setSuggestions([
      '> Available commands:',
      '> goto [projects|members|blogs|home]',
      '> theme [light|dark]',
      '> toggle wireframe',
      '> clear',
      '> help',
    ]);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to open
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Esc to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      // Ctrl+/ to toggle wireframe
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        toggleWireframe();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleWireframe]);

  // Update suggestions based on command input
  useEffect(() => {
    if (command.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = Object.keys(commands).filter(cmd =>
      cmd.toLowerCase().includes(command.toLowerCase())
    );
    setSuggestions(filtered);
  }, [command]);

  // Execute command
  const executeCommand = (cmd) => {
    const handler = commands[cmd.toLowerCase()];
    if (handler) {
      handler();
      setCommand('');
      setSuggestions([]);
      if (cmd.toLowerCase().startsWith('goto')) {
        setIsOpen(false);
      }
    } else {
      setSuggestions([`Command not found: ${cmd}`]);
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command.trim());
    }
  };

  return (
    <>
      {/* Trigger Hint - Bottom Right */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-matrix-black/90 border border-data-blue/30 rounded-lg font-mono text-sm text-gray-400 hover:text-data-blue hover:border-data-blue transition-all hover:shadow-neon"
          >
            <TerminalIcon size={16} />
            <span>Press</span>
            <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+K</kbd>
          </button>
        </motion.div>
      )}

      {/* Terminal Palette */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
            >
              <div className="bg-matrix-black border-2 border-data-blue/50 rounded-lg shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-data-blue/30">
                  <div className="flex items-center space-x-2">
                    <TerminalIcon size={18} className="text-terminal-green" />
                    <span className="font-mono text-sm text-gray-400">
                      command_palette.sh
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-data-blue transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Command Input */}
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Search size={20} className="text-data-blue" />
                    <span className="text-terminal-green font-mono">$</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Type a command... (try 'help')"
                      className="flex-1 bg-transparent border-none outline-none font-mono text-gray-200 placeholder-gray-600"
                      autoFocus
                    />
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1"
                    >
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => executeCommand(suggestion)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full flex items-center justify-between px-4 py-2 rounded bg-gray-900/50 hover:bg-gray-800 border border-transparent hover:border-data-blue/30 transition-all group"
                        >
                          <span className="font-mono text-sm text-gray-400 group-hover:text-data-blue">
                            {suggestion}
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-gray-600 group-hover:text-data-blue transform group-hover:translate-x-1 transition-all"
                          />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </form>

                {/* Keyboard Shortcuts Help */}
                <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {KEYBOARD_SHORTCUTS.slice(0, 4).map(shortcut => (
                      <div key={shortcut.key} className="flex items-center justify-between">
                        <span className="text-gray-500">{shortcut.description}</span>
                        <kbd className="px-2 py-1 bg-gray-800 rounded text-data-blue">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
