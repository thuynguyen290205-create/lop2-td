import { Button } from '@/components/ui/button';

const AnswerOptions = ({ options, selectedAnswers, onOptionSelect, questionType }) => {
  return (
    <div className="answer-options">
      {options.map((option, index) => {
        const isSelected = selectedAnswers.includes(index);
        
        return (
          <Button
            key={index}
            onClick={() => onOptionSelect(index)}
            variant={isSelected ? "default" : "outline"}
            className={`option-button ${isSelected ? 'selected' : ''}`}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
            <span className="option-text">{option.text}</span>
            {questionType === 'MCA' && isSelected && (
              <span className="checkmark">✓</span>
            )}
          </Button>
        );
      })}
      
      {questionType === 'MCA' && (
        <p className="mca-hint">
          💡 Gợi ý: Bạn có thể chọn nhiều đáp án cho câu hỏi này!
        </p>
      )}
    </div>
  );
};

export default AnswerOptions;

