import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workoutPlan } from '../data/workoutPlan';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock, MoreHorizontal, Check, History, Undo2, X, Plus, Minus } from 'lucide-react';

const SetRow = ({ sIdx, exId, lastResult, isDone, onToggle, defaultReps, onUpdateData, initialData }) => {
  const [kg, setKg] = useState(initialData?.kg || lastResult?.kg || 0);
  const [reps, setReps] = useState(initialData?.reps || defaultReps || 0);

  const adjustKg = (val) => {
    const newVal = Math.max(0, parseFloat(kg) + val);
    setKg(newVal);
    onUpdateData(sIdx, newVal, reps);
  };

  const adjustReps = (val) => {
    const newVal = Math.max(0, parseInt(reps) + val);
    setReps(newVal);
    onUpdateData(sIdx, kg, newVal);
  };

  return (
    <div className="set-row">
      <span className={`${sIdx === 0 ? 'set-type-badge' : ''}`} style={{ textAlign: 'center', fontSize: '0.7rem' }}>
        {sIdx === 0 ? 'W' : sIdx + 1}
      </span>
      
      <div className="input-stepper">
        <button className="stepper-btn" onClick={() => adjustKg(-2.5)}><Minus size={14} /></button>
        <input 
          type="number" 
          className="set-input" 
          value={kg}
          onChange={(e) => {
            const v = parseFloat(e.target.value) || 0;
            setKg(v);
            onUpdateData(sIdx, v, reps);
          }}
        />
        <button className="stepper-btn" onClick={() => adjustKg(2.5)}><Plus size={14} /></button>
      </div>

      <div className="input-stepper">
        <button className="stepper-btn" onClick={() => adjustReps(-1)}><Minus size={14} /></button>
        <input 
          type="number" 
          className="set-input" 
          value={reps}
          onChange={(e) => {
            const v = parseInt(e.target.value) || 0;
            setReps(v);
            onUpdateData(sIdx, kg, v);
          }}
        />
        <button className="stepper-btn" onClick={() => adjustReps(1)}><Plus size={14} /></button>
      </div>

      <div 
        className={`set-check ${isDone ? 'done' : ''}`}
        onClick={() => onToggle(sIdx, reps, kg)}
      >
        <Check size={18} strokeWidth={3} />
      </div>
    </div>
  );
};

const WorkoutDay = () => {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const workout = workoutPlan.find((w) => w.id === dayId);
  
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedSets, setCompletedSets] = useState({}); 
  const [workoutData, setWorkoutData] = useState({}); // {exerciseId: {setIdx: {reps, kg}}}
  const [showUndo, setShowUndo] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(`session-${dayId}`);
    if (saved) {
      const { sets, data } = JSON.parse(saved);
      setCompletedSets(sets || {});
      setWorkoutData(data || {});
    }
  }, [dayId]);

  useEffect(() => {
    localStorage.setItem(`session-${dayId}`, JSON.stringify({ 
      sets: completedSets, 
      data: workoutData 
    }));
  }, [completedSets, workoutData, dayId]);

  useEffect(() => {
    if (restTime > 0) {
      timerRef.current = setInterval(() => {
        setRestTime(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [restTime]);

  const startTimer = (seconds = 90) => {
    setRestTime(seconds);
    if (window.navigator?.vibrate) window.navigator.vibrate(50);
  };

  const toggleSet = (exId, setIdx, reps, kg) => {
    const isDone = completedSets[exId]?.[setIdx];
    
    setCompletedSets(prev => ({
      ...prev,
      [exId]: { ...prev[exId], [setIdx]: !isDone }
    }));

    if (!isDone) {
      if (window.navigator?.vibrate) window.navigator.vibrate(30);
      startTimer(90);
      saveToHistory(exId, reps, kg);
    }
  };

  const updateSetData = (exId, sIdx, kg, reps) => {
    setWorkoutData(prev => ({
      ...prev,
      [exId]: {
        ...prev[exId],
        [sIdx]: { kg, reps }
      }
    }));
  };

  const saveToHistory = (exId, reps, kg) => {
    const history = JSON.parse(localStorage.getItem('workout-history') || '{}');
    if (!history[exId]) history[exId] = [];
    history[exId].push({ date: new Date().toISOString(), reps, kg });
    if (history[exId].length > 5) history[exId].shift();
    localStorage.setItem('workout-history', JSON.stringify(history));
  };

  if (!workout) return <div className="dashboard-header"><h1>Not Found</h1></div>;

  return (
    <div style={{ paddingBottom: '7rem' }}>
      <div className="workout-header">
        <button className="btn-ghost" onClick={() => navigate('/')}>
          <ChevronLeft size={28} color="#fff" />
        </button>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1rem' }}>{workout.type.split(' ')[0]} Day</h2>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{workout.day}</p>
        </div>
        <div className="timer-box" onClick={() => setRestTime(0)}>
          <Clock size={16} />
          {restTime > 0 ? `${Math.floor(restTime / 60)}:${(restTime % 60).toString().padStart(2, '0')}` : "0:00"}
          {restTime > 0 && <X size={12} style={{ marginLeft: '4px' }} />}
        </div>
      </div>

      <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.3rem' }}>Danh sách bài</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {Object.keys(completedSets).filter(id => {
                const total = parseInt(workout.exercises.find(e => e.id === id)?.setsReps.split('x')[0]) || 3;
                return Object.values(completedSets[id] || {}).filter(Boolean).length >= total;
              }).length} / {workout.exercises.length} hoàn thành
            </span>
         </div>
      </div>

      {workout.exercises.map((ex) => {
        const isExpanded = activeExercise === ex.id;
        const history = JSON.parse(localStorage.getItem('workout-history') || '{}')[ex.id] || [];
        const lastResult = history.length > 0 ? history[history.length - 1] : null;
        
        const completedCount = Object.values(completedSets[ex.id] || {}).filter(Boolean).length;
        const totalSets = parseInt(ex.setsReps.split('x')[0]) || 4;
        const isExDone = completedCount >= totalSets;

        return (
          <motion.div 
            key={ex.id}
            layout
            className={`card ex-card ${isExDone ? 'done' : ''}`}
            onClick={() => !isExpanded && setActiveExercise(ex.id)}
            style={{ 
              borderColor: isExpanded ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
              background: isExpanded ? '#1a1a1a' : 'var(--card-bg)'
            }}
          >
            <div className="ex-card-main">
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.1rem', color: isExDone ? 'var(--text-muted)' : '#fff' }}>
                  {ex.name}
                </h4>
                <div className="ex-stats-row">
                  <span>{ex.setsReps}</span>
                  {lastResult && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', opacity: 0.8 }}>
                      <History size={12} /> {lastResult.kg}kg x {lastResult.reps}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); /* Replace */ }}>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="ex-expand-content">
                    <div className="exercise-media">
                      <img src={ex.imageUrl} alt={ex.name} />
                    </div>

                    <div className="set-table">
                      {[...Array(totalSets)].map((_, sIdx) => (
                        <SetRow 
                          key={sIdx}
                          sIdx={sIdx}
                          exId={ex.id}
                          lastResult={lastResult}
                          isDone={completedSets[ex.id]?.[sIdx]}
                          defaultReps={parseInt(ex.setsReps.split('x')[1]) || 8}
                          initialData={workoutData[ex.id]?.[sIdx]}
                          onToggle={(idx, r, k) => toggleSet(ex.id, idx, r, k)}
                          onUpdateData={(idx, k, r) => updateSetData(ex.id, idx, k, r)}
                        />
                      ))}
                    </div>

                    <button 
                      className="btn-primary" 
                      style={{ marginTop: '1.5rem', background: '#333', color: '#fff', fontSize: '0.9rem', padding: '0.75rem' }}
                      onClick={(e) => { e.stopPropagation(); setActiveExercise(null); }}
                    >
                      XUỐNG BÀI TIẾP THEO
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <div className="sticky-bottom-bar">
        <button 
          className="btn-primary" 
          onClick={() => {
            if (window.navigator?.vibrate) window.navigator.vibrate([100, 50, 100]);
            import('canvas-confetti').then((confetti) => {
              confetti.default({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ccff00', '#00e676', '#ffffff']
              });
            });
            setShowUndo(true);
          }}
        >
          HOÀN THÀNH BUỔI TẬP
        </button>
      </div>

      <AnimatePresence>
        {showUndo && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="undo-toast"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Check size={20} color="var(--success)" />
              <span>Xong rồi! Nghỉ ngơi nhé</span>
            </div>
            <span className="undo-btn" onClick={() => setShowUndo(false)}>HOÀN TÁC</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkoutDay;
