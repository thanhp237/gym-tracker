import React from 'react';
import { Apple, Dumbbell, Zap, Moon } from 'lucide-react';

const SlimFitInfo = () => {
  return (
    <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Cẩm nang Slim Fit</h3>
      
      <div className="info-card">
        <div className="info-title">
          <Apple size={18} color="var(--accent)" /> Dinh dưỡng (80% kết quả)
        </div>
        <ul className="info-list">
          <li><strong>Caloric Deficit:</strong> Ăn ít hơn TDEE 300-500 kcal.</li>
          <li><strong>Protein:</strong> 1.8g - 2.2g mỗi kg trọng lượng cơ thể.</li>
          <li><strong>Nước:</strong> Tối thiểu 3-4 lít mỗi ngày.</li>
          <li><strong>Quy tắc:</strong> Hạn chế đường, đồ chiên rán, tinh bột nhanh.</li>
        </ul>
      </div>

      <div className="info-card" style={{ borderLeftColor: '#00e676' }}>
        <div className="info-title">
          <Dumbbell size={18} color="#00e676" /> Tập luyện (Kỷ luật)
        </div>
        <ul className="info-list">
          <li><strong>Kháng lực:</strong> Tập tạ ít nhất 4-5 buổi/tuần.</li>
          <li><strong>Cardio:</strong> 20 phút đi bộ dốc hoặc HIIT sau tập.</li>
          <li><strong>NEAT:</strong> Cố gắng đạt 10,000 bước chân mỗi ngày.</li>
          <li><strong>Form:</strong> Ưu tiên kỹ thuật hơn là mức tạ nặng.</li>
        </ul>
      </div>

      <div className="info-card" style={{ borderLeftColor: '#ff4d4d' }}>
        <div className="info-title">
          <Zap size={18} color="#ff4d4d" /> Lộ trình 3 tháng
        </div>
        <ul className="info-list">
          <li><strong>Tháng 1:</strong> Làm quen, xây dựng thói quen ăn uống/tập.</li>
          <li><strong>Tháng 2:</strong> Tăng cường độ tập luyện (Progressive Overload).</li>
          <li><strong>Tháng 3:</strong> Siết chặt ăn uống, tăng Cardio tối đa.</li>
        </ul>
      </div>

      <div className="info-card" style={{ borderLeftColor: '#4d9eff' }}>
        <div className="info-title">
          <Moon size={18} color="#4d9eff" /> Phục hồi
        </div>
        <ul className="info-list">
          <li><strong>Ngủ:</strong> 7-8 tiếng mỗi đêm để cơ bắp phát triển.</li>
          <li><strong>Stress:</strong> Giữ tinh thần thoải mái, tránh cortisol cao.</li>
        </ul>
      </div>
    </div>
  );
};

export default SlimFitInfo;
