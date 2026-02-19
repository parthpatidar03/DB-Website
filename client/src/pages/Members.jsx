import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDataFetch } from '../hooks/useDataFetch';
import MemberCard from '../components/members/MemberCard';
import { MEMBER_BATCHES, MEMBER_DOMAINS } from '../utils/constants';
import { containerVariants, itemVariants } from '../utils/animations';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

/**
 * Members Page - "The Neural Network"
 * Features:
 * - Server-side filtering by Batch & Domain
 * - Member cards with rollNo-based image loading
 * - Pagination
 */
const Members = () => {
    const [selectedBatch, setSelectedBatch] = useState('all');
    const [selectedDomain, setSelectedDomain] = useState('all');
    const [page, setPage] = useState(1);
    const LIMIT = 12;

    const { data: members, loading, pagination } = useDataFetch(
        '/api/members',
        {
            page,
            limit: LIMIT,
            filters: {
                batch: selectedBatch,
                domain: selectedDomain
            }
        },
        [page, selectedBatch, selectedDomain]
    );

    const handleFilterChange = (setter, value) => {
        setter(value);
        setPage(1); // Reset to first page on filter change
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-5xl font-mono font-bold mb-4">
                        <span className="text-neural-violet">{'{'}</span>
                        The Neural Network
                        <span className="text-neural-violet">{'}'}</span>
                    </h1>
                    <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">
                        Meet the nodes processing data and building the future.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
                    {/* Batch Filter */}
                    <div className="glass p-2 rounded-lg inline-flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => handleFilterChange(setSelectedBatch, 'all')}
                            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                                selectedBatch === 'all'
                                    ? 'bg-data-blue/20 text-data-blue border border-data-blue/50'
                                    : 'text-gray-400 hover:text-data-blue hover:bg-gray-800'
                            }`}
                        >
                            All Batches
                        </button>
                        {MEMBER_BATCHES.map(batch => (
                            <button
                                key={batch.id}
                                onClick={() => handleFilterChange(setSelectedBatch, batch.id)}
                                className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                                    selectedBatch === batch.id
                                        ? 'bg-data-blue/20 text-data-blue border border-data-blue/50'
                                        : 'text-gray-400 hover:text-data-blue hover:bg-gray-800'
                                }`}
                            >
                                {batch.label}
                            </button>
                        ))}
                    </div>

                    {/* Domain Filter */}
                    <div className="glass p-2 rounded-lg inline-flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => handleFilterChange(setSelectedDomain, 'all')}
                            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                                selectedDomain === 'all'
                                    ? 'bg-neural-violet/20 text-neural-violet border border-neural-violet/50'
                                    : 'text-gray-400 hover:text-neural-violet hover:bg-gray-800'
                            }`}
                        >
                            All Domains
                        </button>
                        {MEMBER_DOMAINS.map(domain => (
                            <button
                                key={domain.id}
                                onClick={() => handleFilterChange(setSelectedDomain, domain.id)}
                                className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                                    selectedDomain === domain.id
                                        ? 'bg-neural-violet/20 text-neural-violet border border-neural-violet/50'
                                        : 'text-gray-400 hover:text-neural-violet hover:bg-gray-800'
                                }`}
                            >
                                {domain.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Members Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {loading ? (
                         <LoadingSkeleton count={12} />
                    ) : (
                        <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
                            {members && members.map((member) => (
                                <motion.div key={member.id} variants={itemVariants}>
                                    <MemberCard member={member} />
                                </motion.div>
                            ))}
                        </div>

                        {(!members || members.length === 0) && (
                            <div className="text-center py-20">
                                <p className="font-mono text-gray-500">
                                    No members found matching these filters.
                                </p>
                            </div>
                        )}
                        </>
                    )}

                    {/* Pagination Controls */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-16 font-mono">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                                className="px-4 py-2 rounded border border-gray-700 hover:border-neural-violet disabled:opacity-50 disabled:hover:border-gray-700 transition-colors"
                            >
                                &lt; PREV
                            </button>
                            <span className="text-neural-violet">
                                Page {page} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages || loading}
                                className="px-4 py-2 rounded border border-gray-700 hover:border-neural-violet disabled:opacity-50 disabled:hover:border-gray-700 transition-colors"
                            >
                                NEXT &gt;
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Members;
