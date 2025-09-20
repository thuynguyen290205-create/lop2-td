import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Question from './Question';
import RewardDisplay from './RewardDisplay';
import ConfettiEffect from './ConfettiEffect';
import questionsData from '../../data/questions.json';
import { useSound } from '../../hooks/useSound';
import './GameShow.css';

const GameShow = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [collectedLetters, setCollectedLetters] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = questionsData;
  const { playSound } = useSound();

  const handleAnswerSubmit = (isCorrect) => {
    // Phát âm thanh phản hồi
    playSound(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore(score + 1);
      const newLetter = questions[currentQuestionIndex].reward_letter;
      setCollectedLetters([...collectedLetters, newLetter]);
    }

    // Chuyển sang câu hỏi tiếp theo hoặc kết thúc game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameCompleted(true);
      // Hiển thị confetti và phát âm thanh hoàn thành
      setTimeout(() => {
        setShowConfetti(true);
        playSound('gameComplete');
      }, 1000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    playSound('gameStart');
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setCollectedLetters([]);
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
    setShowConfetti(false);
  };

  if (!gameStarted) {
    return (
      <div className="game-start-screen">
        <div className="start-content">
          <h1 className="game-title">🎪 Game Show Luyện Tập Kiến Thức 🎪</h1>
          <p className="game-description">
            Chào mừng các em học sinh lớp 2! Hãy trả lời đúng 10 câu hỏi để thu thập các chữ cái và tạo thành cụm từ bí mật!
          </p>
          <div className="game-features">
            <div className="feature">🎯 10 câu hỏi thú vị</div>
            <div className="feature">🏆 Thu thập chữ cái phần thưởng</div>
            <div className="feature">🌟 Hiệu ứng sinh động</div>
            <div className="feature">🔊 Âm thanh phản hồi</div>
          </div>
          <Button onClick={startGame} className="start-button">
            🚀 Bắt Đầu Game
          </Button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const finalPhrase = collectedLetters.join('');
    const isWinner = finalPhrase === "CÔ DUNG XINH";
    
    return (
      <div className="game-end-screen">
        {showConfetti && <ConfettiEffect />}
        <div className="end-content">
          <h1 className={`final-result ${isWinner ? 'winner' : 'partial'}`}>
            {isWinner ? '🎉 CHÚC MỪNG! 🎉' : '👏 Tốt lắm! 👏'}
          </h1>
          <p className="score-display">Điểm số: {score}/10</p>
          <div className="collected-phrase">
            <h2>Cụm từ đã thu thập:</h2>
            <div className="phrase-display">{finalPhrase}</div>
          </div>
          {isWinner && (
            <div className="victory-message">
              <p>🌟 Bạn đã thu thập đủ tất cả các chữ cái! 🌟</p>
              <p>Cụm từ bí mật là: "CÔ DUNG XINH"</p>
              <div className="confetti">🎊🎉🎊🎉🎊</div>
            </div>
          )}
          <div className="final-stats">
            <div className="stat">
              <span className="stat-label">Câu đúng:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Tỷ lệ:</span>
              <span className="stat-value">{Math.round((score/10) * 100)}%</span>
            </div>
          </div>
          <Button onClick={resetGame} className="restart-button">
            🔄 Chơi Lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="gameshow-container">
      <div className="game-header">
        <h1 className="game-title">🎪 Game Show Luyện Tập 🎪</h1>
        <div className="progress-info">
          <span>Câu hỏi {currentQuestionIndex + 1}/10</span>
          <span>Điểm: {score}</span>
        </div>
      </div>

      <RewardDisplay collectedLetters={collectedLetters} />

      <Question
        question={questions[currentQuestionIndex]}
        onAnswerSubmit={handleAnswerSubmit}
        questionNumber={currentQuestionIndex + 1}
      />
    </div>
  );
};

export default GameShow;

