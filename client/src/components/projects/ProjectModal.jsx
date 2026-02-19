import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

const ProjectModal = ({ project, isOpen, onClose, membersMap }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
             document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    // Resolve team members from IDs
    const teamMembers = (project.team || []).map(id => membersMap[id]).filter(Boolean);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-gray-800 shadow-2xl bg-[#0a0a0a]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-black/50 rounded-full transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Media Section (Image/Video) */}
                            <div className="w-full md:w-1/2 relative bg-black flex items-center justify-center">
                                {project.video ? (
                                    <video 
                                        src={project.video} 
                                        className="w-full h-full object-contain"
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                    />
                                ) : (
                                    <>
                                        <div className="w-full h-64 md:h-full flex items-center justify-center bg-black">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.onerror = null; 
                                                    e.target.src = '/images/projects/placeholder.png'; // Fallback
                                                    e.target.style.objectFit = "contain";
                                                    e.target.style.padding = "20px";
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-mono font-bold text-white mb-2">
                                        {project.name}
                                    </h2>
                                    <div className="flex items-center gap-3 text-sm font-mono text-gray-400 mb-4">
                                        <span className={`px-2 py-1 rounded text-xs border ${
                                            project.status === 'completed' 
                                                ? 'border-green-500/50 text-green-400 bg-green-500/10'
                                                : 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                                        }`}>
                                            {project.status.toUpperCase()}
                                        </span>
                                        <span>•</span>
                                        <span className="capitalize">{project.category}</span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span 
                                                key={tech} 
                                                className="px-3 py-1 text-xs font-mono rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Team Members */}


                                {/* Links */}
                                <div className="mt-auto flex gap-4 pt-4 border-t border-gray-800">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all font-mono text-sm"
                                        >
                                            <Github size={16} />
                                            Source Code
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-data-blue/10 hover:bg-data-blue/20 text-data-blue border border-data-blue/50 transition-all font-mono text-sm"
                                        >
                                            <ExternalLink size={16} />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
