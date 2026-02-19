import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card', count = 3 }) => {
  const skeletons = Array(count).fill(0);

  const CardSkeleton = () => (
    <div className="glass rounded-lg overflow-hidden border border-gray-800 h-full">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-900/50 animate-pulse relative overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/30 to-transparent"
        />
      </div>
      
      {/* Content Placeholder */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-800 rounded w-3/4 animate-pulse relative overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"
          />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-900 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-900 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-900 rounded w-4/6 animate-pulse" />
        </div>
        <div className="pt-4 flex justify-between">
          <div className="h-3 bg-gray-900 rounded w-1/4 animate-pulse" />
          <div className="h-3 bg-gray-900 rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="w-full h-24 bg-gray-900/50 rounded-lg animate-pulse mb-4 relative overflow-hidden">
       <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/30 to-transparent"
        />
    </div>
  );

  return (
    <div className={`grid gap-6 ${type === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {skeletons.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          {type === 'card' ? <CardSkeleton /> : <ListSkeleton />}
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
