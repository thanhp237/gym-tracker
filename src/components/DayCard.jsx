import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DayCard = ({ id, day, type }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={`/workout/${id}`} className="card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ 
            padding: '4px 12px', 
            background: 'var(--glass-bg)', 
            border: '1px solid var(--card-border)', 
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <Calendar size={12} strokeWidth={3} /> {day}
          </div>
          <motion.div 
            whileHover={{ x: 3, y: -3 }}
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>
        
        <div style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.5rem' }}>
          {type}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
          <span>Tập trung vào cơ bắp mục tiêu</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--card-border)' }} />
          <span>8 bài tập</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default DayCard;
