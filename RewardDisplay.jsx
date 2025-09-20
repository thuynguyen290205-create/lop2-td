const RewardDisplay = ({ collectedLetters }) => {
  const targetPhrase = "CÔ DUNG XINH";
  const targetLetters = targetPhrase.split('');

  return (
    <div className="reward-display">
      <h3 className="reward-title">🏆 Chữ cái đã thu thập:</h3>
      <div className="letters-container">
        {targetLetters.map((targetLetter, index) => {
          const isCollected = index < collectedLetters.length;
          const collectedLetter = isCollected ? collectedLetters[index] : '';
          
          return (
            <div
              key={index}
              className={`letter-slot ${isCollected ? 'collected' : 'empty'}`}
            >
              {isCollected ? (
                <span className="collected-letter">{collectedLetter}</span>
              ) : (
                <span className="empty-letter">?</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${(collectedLetters.length / targetLetters.length) * 100}%` }}
        ></div>
      </div>
      <p className="progress-text">
        {collectedLetters.length}/{targetLetters.length} chữ cái
      </p>
    </div>
  );
};

export default RewardDisplay;

