import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataFetch } from '../hooks/useDataFetch';
import { TICKER_MESSAGES } from '../utils/constants';
import { fadeInVariants, slideUpVariants, containerVariants, itemVariants } from '../utils/animations';

/**
 * Home Page - "The Input Layer"
 * Features:
 * - Neural splash hero with scatter plot effect
 * - Bento grid for "What we do"
 * - Club ticker with scrolling achievements
 * - Live stats with data gauges
 */
const Home = () => {
  const { data: stats } = useDataFetch('/api/stats?v=1');

  return (
    <div className="min-h-screen">
      {/* Hero Section - Neural Splash */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid-background-animated opacity-20" />
        
        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-mono font-bold mb-6"
          >
            {/* <span className="text-data-blue neon-text">DATA</span>
            <span className="text-neural-violet neon-text-violet">BYTE</span> */}
            <span>DataByte</span> 
            {/* ------------------------------- */}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-400 mb-8 font-mono"
          >
            The Official Machine Learning Club of NIT Trichy
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            Where data meets innovation. We build intelligent systems, conduct cutting-edge research,
            and push the boundaries of artificial intelligence.
          </motion.p>

          {/* CTA Button - Code Snippet Style */}
          <motion.div variants={itemVariants}>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-data-blue/10 border-2 border-data-blue rounded-lg font-mono text-data-blue hover:bg-data-blue/20 hover:shadow-neon transition-all group"
            >
              <span>run_exploration.py</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 text-data-blue opacity-30"
        >
          <Database size={80} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-20 text-neural-violet opacity-30"
        >
          <Brain size={80} />
        </motion.div>
      </section>

      {/* What We Do - Bento Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-mono font-bold text-center mb-12"
          >
            <span className="text-data-blue">{'<'}</span>
            The Latent Space
            <span className="text-data-blue">{' />'}</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Machine Learning',
                icon: Brain,
                description: 'Build and deploy ML models that solve real-world problems',
                color: 'data-blue',
              },
              {
                title: 'Computer Vision',
                icon: Code,
                description: 'Develop visual recognition systems and image processing algorithms',
                color: 'neural-violet',
              },
              {
                title: 'Natural Language Processing',
                icon: Database,
                description: 'Create intelligent systems that understand and generate human language',
                color: 'terminal-green',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 glass rounded-lg border-${item.color}/30 hover:border-${item.color} transition-all group`}
              >
                <item.icon className={`w-12 h-12 text-${item.color} mb-4 group-hover:animate-pulse`} />
                <h3 className="text-xl font-mono font-semibold mb-2 text-gray-200">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Ticker */}
      <section className="py-12 bg-matrix-black/50 overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex space-x-8 whitespace-nowrap"
          >
            {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((message, index) => (
              <span
                key={index}
                className="font-mono text-sm text-terminal-green"
              >
                {message}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Projects', value: stats.projects.total, color: 'data-blue' },
                { label: 'Members', value: stats.members.total, color: 'neural-violet' },
                { label: 'Papers', value: stats.achievements.papers, color: 'terminal-green' },
                { label: 'Events', value: stats.events.workshops, color: 'yellow-500' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center p-6 glass rounded-lg"
                >
                  <div className={`text-4xl font-mono font-bold text-${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-mono text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
