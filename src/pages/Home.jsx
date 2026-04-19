import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutPlan } from '../data/workoutPlan';
import { motion } from 'framer-motion';
import { Play, Calendar, ChevronRight, Droplet, Activity, CheckCircle2 } from 'lucide-react';
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

  const [habits, setHabits] = React.useState(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`habits-${today}`);
    return saved ? JSON.parse(saved) : { water: false, cardio: false };
  });

  const toggleHabit = (type) => {
    if (window.navigator?.vibrate) window.navigator.vibrate(50);
    setHabits(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`habits-${today}`, JSON.stringify(updated));
      return updated;
    });
  };

  const quotes = [
    "Kỷ luật là tự do.",
    "Day 1 or One Day? You decide.",
    "Đừng bỏ cuộc vì những gì bạn đã bắt đầu.",
    "Mồ hôi hôm nay, nụ cười ngày mai.",
    "Không có lý do, chỉ có kết quả."
  ];

  const dailyQuote = useMemo(() => {
    const index = new Date().getDay() % quotes.length;
    return quotes[index];
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="dashboard"
    >
      <header className="dashboard-header">
        <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Mindset
        </h2>
        <h1 style={{ fontSize: '2rem', marginTop: '0.25rem', fontWeight: 900 }}>"{dailyQuote}"</h1>
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

      <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Thói quen hôm nay</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleHabit('water')}
            style={{ 
              background: habits.water ? 'var(--accent-soft)' : 'rgba(25, 25, 25, 0.4)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${habits.water ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
              padding: '1rem', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              boxShadow: habits.water ? '0 0 20px rgba(204,255,0,0.1)' : '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <motion.div 
              initial={false}
              animate={{ rotate: habits.water ? 360 : 0 }}
              style={{ background: habits.water ? 'var(--accent)' : '#222', borderRadius: '50%', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {habits.water ? <CheckCircle2 size={16} color="#000" /> : <Droplet size={16} color="#4d9eff" />}
            </motion.div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: habits.water ? '#fff' : 'var(--text-main)' }}>3 Lít Nước</p>
            </div>
          </motion.div>

          <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleHabit('cardio')}
            style={{ 
              background: habits.cardio ? 'var(--accent-soft)' : 'rgba(25, 25, 25, 0.4)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${habits.cardio ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
              padding: '1rem', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              boxShadow: habits.cardio ? '0 0 20px rgba(204,255,0,0.1)' : '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <motion.div 
              initial={false}
              animate={{ rotate: habits.cardio ? 360 : 0 }}
              style={{ background: habits.cardio ? 'var(--accent)' : '#222', borderRadius: '50%', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {habits.cardio ? <CheckCircle2 size={16} color="#000" /> : <Activity size={16} color="#ff4d4d" />}
            </motion.div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: habits.cardio ? '#fff' : 'var(--text-main)' }}>20p Cardio</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} color="var(--text-muted)" /> Lịch tập tuần này
        </h3>
      </div>

      <div className="horizontal-scroll">
        {workoutPlan.map((day) => (
          <motion.div
            key={day.id}
            whileTap={{ scale: 0.95 }}
            className={`week-day-row ${day.id === todayId ? 'active' : ''}`}
            onClick={() => navigate(`/workout/${day.id}`)}
            style={{ 
              background: day.id === todayId ? 'var(--accent-soft)' : 'rgba(25, 25, 25, 0.4)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${day.id === todayId ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
              flexDirection: 'column', 
              alignItems: 'flex-start',
              padding: '1.25rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: day.id === todayId ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: day.id === todayId ? '#000' : 'var(--text-main)',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>
                {day.day.split(' ')[1]}
              </div>
              <ChevronRight size={18} color={day.id === todayId ? 'var(--accent)' : 'var(--text-muted)'} />
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: '1.05rem', color: day.id === todayId ? '#fff' : 'var(--text-main)' }}>
                {day.type.split(' ')[0]} {day.type.split(' ')[1]}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{day.exercises.length} bài tập</p>
            </div>
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
