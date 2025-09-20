import { useEffect, useState } from 'react';
import './ConfettiEffect.css';

const ConfettiEffect = () => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    // Tạo 50 mảnh confetti với vị trí và màu sắc ngẫu nhiên
    const pieces = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)],
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
    }));
    
    setConfettiPieces(pieces);

    // Tự động ẩn confetti sau 5 giây
    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="confetti-container">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.animationDelay}s`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;

