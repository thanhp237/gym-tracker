import React from 'react';
import { Check, Dumbbell, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExerciseItem = ({ ex, isCompleted, onToggle }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`ex-card ${isCompleted ? 'done' : ''}`}
      onClick={onToggle}
      whileTap={{ scale: 0.98 }}
    >
      <div className="ex-img-box">
        <img 
          src={ex.imageUrl} 
          alt={ex.name} 
          className="ex-img"
          loading="lazy"
        />
        {isCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'rgba(0,0,0,0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backdropFilter: 'grayscale(1) blur(2px)'
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
            >
              <Check size={80} color="var(--success)" strokeWidth={3} />
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <div className="ex-content">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Zap size={12} color="var(--accent)" fill="var(--accent)" />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.05em' }}>
              {ex.group}
            </span>
          </div>
          <div className="ex-name">{ex.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Dumbbell size={14} />
            <span style={{ fontWeight: 600 }}>{ex.setsReps}</span>
          </div>
        </div>
        
        <div className="check-hex">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              <motion.div
                key="checked"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
              >
                <Check size={22} color="#fff" strokeWidth={3} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseItem;
