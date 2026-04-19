import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutPlan } from '../data/workoutPlan';
import { motion } from 'framer-motion';
import { Play, Calendar, ChevronRight } from 'lucide-react';
import SlimFitCountdown from '../components/SlimFitCountdown';
import SlimFitInfo from '../components/SlimFitInfo';

const Home = () => {
  const navigate = useNavigate();
  
  // Get current day of week (0-6, starting Sunday)
  const dayIndex = new Date().getDay();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayId = dayNames[dayIndex];
  
  const todayWorkout = useMemo(() => {
    return workoutPlan.find(w => w.id === todayId) || null;
  }, [todayId]);

  // Mock progress
  const getProgress = () => {
    const saved = localStorage.getItem(`workout-${todayId}`);
    if (!saved) return 0;
    const completed = JSON.parse(saved);
    const count = Object.values(completed).filter(Boolean).length;
    const total = todayWorkout?.exercises.length || 1;
    return Math.round((count / total) * 100);
  };

  const progress = getProgress();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="dashboard"
    >
      <header className="dashboard-header">
        <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Transformation Journey
        </h2>
        <h1 style={{ fontSize: '2.25rem', marginTop: '0.25rem', fontWeight: 900 }}>Road to Slim Fit ⚡️</h1>
      </header>

      <SlimFitCountdown />

      <div style={{ padding: '0 1.5rem' }}>
        <div className="today-workout-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem' }}>BÀI TẬP HÔM NAY</p>
              <h2 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>
                {todayWorkout ? todayWorkout.type : 'Ngày nghỉ ngơi'}
              </h2>
            </div>
            {todayWorkout && (
              <div style={{ background: 'var(--accent-soft)', padding: '0.5rem', borderRadius: '12px' }}>
                <Flame size={20} color="var(--accent)" />
              </div>
            )}
          </div>

          {todayWorkout ? (
            <>
              <div className="progress-bar-container">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                  className="progress-bar-fill" 
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Tiến độ: {progress}% đã xong
              </p>
              
              <button 
                className="btn-primary" 
                onClick={() => navigate(`/workout/${todayId}`)}
              >
                <Play fill="currentColor" size={18} /> BẮT ĐẦU TẬP NGAY
              </button>
            </>
          ) : (
            <div style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Hôm nay là ngày nghỉ. Hãy phục hồi tốt để chuẩn bị cho buổi tiếp theo!
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} color="var(--text-muted)" /> Lịch tập tuần này
        </h3>
      </div>

      <div className="weekly-grid">
        {workoutPlan.map((day) => (
          <motion.div
            key={day.id}
            whileTap={{ scale: 0.98 }}
            className={`week-day-row ${day.id === todayId ? 'active' : ''}`}
            onClick={() => navigate(`/workout/${day.id}`)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                background: day.id === todayId ? 'var(--accent)' : '#1e2124',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: day.id === todayId ? '#000' : 'var(--text-muted)',
                fontWeight: 800,
                fontSize: '0.8rem'
              }}>
                {day.day.split(' ')[1]}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: day.id === todayId ? '#fff' : 'var(--text-main)' }}>
                  {day.type.split(' ')[0]} {day.type.split(' ')[1]}...
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{day.exercises.length} bài tập</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </motion.div>
        ))}
      </div>
      
      <div style={{ height: '2rem' }} />
      
      <SlimFitInfo />
      
      <div style={{ height: '3rem' }} />
    </motion.div>
  );
};

const Flame = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.292 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export default Home;
