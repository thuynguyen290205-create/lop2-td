import { useRef, useCallback } from 'react';

// Import các file âm thanh
import correctAnswerSound from '../assets/sounds/correct-answer.wav';
import incorrectAnswerSound from '../assets/sounds/incorrect-answer.wav';
import gameCompleteSound from '../assets/sounds/game-complete.wav';
import gameStartSound from '../assets/sounds/game-start.wav';

export const useSound = () => {
  const audioRefs = useRef({
    correct: new Audio(correctAnswerSound),
    incorrect: new Audio(incorrectAnswerSound),
    gameComplete: new Audio(gameCompleteSound),
    gameStart: new Audio(gameStartSound),
  });

  // Thiết lập volume cho tất cả âm thanh
  Object.values(audioRefs.current).forEach(audio => {
    audio.volume = 0.7;
  });

  const playSound = useCallback((soundType) => {
    try {
      const audio = audioRefs.current[soundType];
      if (audio) {
        audio.currentTime = 0; // Reset về đầu
        audio.play().catch(error => {
          console.log('Không thể phát âm thanh:', error);
        });
      }
    } catch (error) {
      console.log('Lỗi khi phát âm thanh:', error);
    }
  }, []);

  const stopAllSounds = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  return {
    playSound,
    stopAllSounds,
  };
};

export default useSound;

