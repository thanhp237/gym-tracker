import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowRight } from 'lucide-react';

const SlimFitCountdown = () => {
  const totalDays = 90;
  const [startDate, setStartDate] = useState(null);
  const [daysLeft, setDaysLeft] = useState(totalDays);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('slimFitStartDate');
    if (saved) {
      const start = new Date(saved);
      setStartDate(start);
      calculateProgress(start);
    }
  }, []);

  const calculateProgress = (start) => {
    const today = new Date();
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const remaining = Math.max(0, totalDays - diffDays);
    setDaysLeft(remaining);
    setProgress(Math.min(100, (Math.max(0, diffDays) / totalDays) * 100));
  };

  const handleStartChallenge = () => {
    const today = new Date().toISOString();
    localStorage.setItem('slimFitStartDate', today);
    setStartDate(new Date(today));
    calculateProgress(new Date(today));
  };

  return (
    <div className="slim-fit-banner">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Road to Slim Fit</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>90-Day Transformation</p>
        </div>
        <div style={{ padding: '0.5rem', background: 'var(--accent-soft)', borderRadius: '12px' }}>
          <Timer size={20} color="var(--accent)" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!startDate ? (
          <motion.div 
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: '1.5rem' }}
          >
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.4 }}>
              Chào mừng bạn đến với lộ trình đốt mỡ, xây cơ trong 90 ngày. Sẵn sàng kỷ luật bản thân chưa?
            </p>
            <button 
              className="btn-primary" 
              onClick={handleStartChallenge}
              style={{ fontSize: '0.95rem', padding: '0.8rem' }}
            >
              BẮT ĐẦU NGAY HÔM NAY <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="tracking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="stat-grid">
              <div className="stat-item">
                <div className="stat-value">{daysLeft}</div>
                <div className="stat-label">Ngày còn lại</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{Math.round(progress)}%</div>
                <div className="stat-label">Hoàn thành</div>
              </div>
            </div>

            <div className="progress-bar-container" style={{ margin: '1rem 0 0.5rem 0', height: '6px' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="progress-bar-fill"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlimFitCountdown;
