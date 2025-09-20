import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnswerOptions from './AnswerOptions';
import MathRenderer from '../MathRenderer';

const Question = ({ question, onAnswerSubmit, questionNumber }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shortAnswer, setShortAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animation khi chuyển câu hỏi
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  const handleSubmit = () => {
    let correct = false;

    if (question.type === 'MC') {
      // Multiple Choice - chỉ một đáp án đúng
      const selectedOption = question.options[selectedAnswers[0]];
      correct = selectedOption && selectedOption.isCorrect;
    } else if (question.type === 'MCA') {
      // Multiple Choice Answers - nhiều đáp án đúng
      const correctIndices = question.options
        .map((option, index) => option.isCorrect ? index : -1)
        .filter(index => index !== -1);
      
      // Kiểm tra xem có chọn ít nhất một đáp án và tất cả đáp án đã chọn đều đúng
      correct = selectedAnswers.length > 0 &&
                selectedAnswers.length === correctIndices.length &&
                selectedAnswers.every(index => correctIndices.includes(index)) &&
                correctIndices.every(index => selectedAnswers.includes(index));
    } else if (question.type === 'SA') {
      // Short Answer - nhập số
      correct = shortAnswer.trim() === question.correct_answer;
    }

    setIsCorrect(correct);
    setShowResult(true);

    // Hiển thị kết quả trong 3 giây rồi chuyển câu tiếp theo
    setTimeout(() => {
      onAnswerSubmit(correct);
      setShowResult(false);
      setSelectedAnswers([]);
      setShortAnswer('');
    }, 3000);
  };

  const handleOptionSelect = (optionIndex) => {
    if (question.type === 'MC') {
      setSelectedAnswers([optionIndex]);
    } else if (question.type === 'MCA') {
      if (selectedAnswers.includes(optionIndex)) {
        setSelectedAnswers(selectedAnswers.filter(index => index !== optionIndex));
      } else {
        setSelectedAnswers([...selectedAnswers, optionIndex]);
      }
    }
  };

  const canSubmit = () => {
    if (question.type === 'SA') {
      return shortAnswer.trim() !== '';
    }
    return selectedAnswers.length > 0;
  };

  if (showResult) {
    return (
      <div className="question-result">
        <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <div className="correct-result">
              <h2>🎉 Chính xác! 🎉</h2>
              <div className="reward-letter-animation">
                Bạn nhận được chữ cái: <span className="letter">{question.reward_letter}</span>
              </div>
              {question.explanation && (
                <div className="explanation">
                  {question.hasMath ? (
                    <MathRenderer>{question.explanation}</MathRenderer>
                  ) : (
                    <p>💡 {question.explanation}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="incorrect-result">
              <h2>😔 Chưa đúng rồi!</h2>
              <p>Đáp án đúng là: <strong>{getCorrectAnswerText()}</strong></p>
              {question.explanation && (
                <div className="explanation">
                  {question.hasMath ? (
                    <MathRenderer>{question.explanation}</MathRenderer>
                  ) : (
                    <p>💡 {question.explanation}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function getCorrectAnswerText() {
    if (question.type === 'SA') {
      return question.correct_answer;
    } else if (question.type === 'MC') {
      const correctOption = question.options.find(option => option.isCorrect);
      return correctOption ? correctOption.text : '';
    } else if (question.type === 'MCA') {
      const correctOptions = question.options.filter(option => option.isCorrect);
      return correctOptions.map(option => option.text).join(', ');
    }
    return '';
  }

  return (
    <div className="question-container">
      <div className={`question-card ${isAnimating ? 'question-transition' : ''}`}>
        <div className="question-header">
          <div className="question-number">
            Câu hỏi {questionNumber}
          </div>
          <div className="question-type-badge">
            {question.type === 'MC' && '🎯 Chọn một đáp án'}
            {question.type === 'MCA' && '🎯 Chọn nhiều đáp án'}
            {question.type === 'SA' && '✏️ Nhập đáp án'}
          </div>
        </div>
        
        <h2 className="question-text">
          {question.hasMath ? (
            <MathRenderer>{question.question}</MathRenderer>
          ) : (
            question.question
          )}
        </h2>
        
        {question.type === 'SA' ? (
          <div className="short-answer-section">
            <Input
              type="text"
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              placeholder="Nhập đáp án của bạn..."
              className="answer-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && canSubmit()) {
                  handleSubmit();
                }
              }}
            />
          </div>
        ) : (
          <AnswerOptions
            options={question.options}
            selectedAnswers={selectedAnswers}
            onOptionSelect={handleOptionSelect}
            questionType={question.type}
          />
        )}

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit()}
          className="submit-button"
        >
          ✨ Gửi Đáp Án
        </Button>
      </div>
    </div>
  );
};

export default Question;

