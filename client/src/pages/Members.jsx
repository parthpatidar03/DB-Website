import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDataFetch } from '../hooks/useDataFetch';
import MemberCard from '../components/members/MemberCard';
import { MEMBER_ROLES } from '../utils/constants';
import { containerVariants, itemVariants } from '../utils/animations';

/**
 * Members Page - "The Neural Network"
 * Features:
 * - Member cards with CV detection frames
 * - Role-based filtering
 * - Grid/List view toggle
 */
const Members = () => {
  const { data: members, loading } = useDataFetch('/api/members');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredMembers = members
    ? members.filter(m => selectedRole === 'all' || m.role === selectedRole)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-mono font-bold mb-4">
            <span className="text-data-blue">{'{'}</span>
            The Neural Network
            <span className="text-data-blue">{'}'}</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            // The neurons that power our intelligence
          </p>
        </motion.div>

        {/* Role Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          <button
            onClick={() => setSelectedRole('all')}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              selectedRole === 'all'
                ? 'bg-data-blue/20 text-data-blue border-2 border-data-blue'
                : 'bg-gray-800 text-gray-400 hover:text-data-blue'
            }`}
          >
            All Members
          </button>
          {MEMBER_ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                selectedRole === role.id
                  ? `bg-${role.color}/20 text-${role.color} border-2 border-${role.color}`
                  : 'bg-gray-800 text-gray-400 hover:text-data-blue'
              }`}
            >
              {role.label}
            </button>
          ))}
        </motion.div>

        {/* Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.map((member, index) => (
            <motion.div key={member.id} variants={itemVariants}>
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-gray-500">No members found with this role</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
