import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';

const SlimFitCountdown = () => {
  // Target date: 3 months from now (90 days)
  // For demo, we'll use a fixed target date or just calculate from a start date
  // Let's assume the challenge started on April 1st, 2026 (as today is April 19)
  // Or better, let's just show a "90 Day Challenge" progress
  
  const totalDays = 90;
  const startDate = new Date('2026-04-10'); // Challenge starts 9 days ago
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const remaining = Math.max(0, totalDays - diffDays);
    setDaysLeft(remaining);
    setProgress(Math.min(100, (diffDays / totalDays) * 100));
  }, []);

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
    </div>
  );
};

export default SlimFitCountdown;
