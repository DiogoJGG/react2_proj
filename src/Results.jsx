import { useLocation, useNavigate } from 'react-router-dom';
import { decodeHtml } from './components/decodeHtml';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, selectedAnswers, correctAnswers } = location.state;

  let scoreClass = '';
  if (correctAnswers >= 4) {
    scoreClass = 'good';
  } else if (correctAnswers >= 2) {
    scoreClass = 'poor';
  } else {
    scoreClass = 'bad';
  }

  const handleNewQuiz = () => {
    navigate('/');
  };

  return (
    <div className="results">
      <h3>Quiz Results</h3>

      {/* Display the questions with answers */}
      {questions.map((question, questionIndex) => {
        const isCorrect =
          selectedAnswers[questionIndex] === question.correct_answer;
        return (
          <div key={questionIndex} className="questions">
            <p>{decodeHtml(question.question)}</p>

            {/* Shows correct and wrong answers */}
            {question.shuffled_answers.map((answer, answerIndex) => {
              const isSelected = selectedAnswers[questionIndex] === answer;
              const isAnswerCorrect = answer === question.correct_answer;
              return (
                <button
                  key={answerIndex}
                  className={`answers-btn ${isSelected ? 'selected' : ''} ${
                    isAnswerCorrect ? 'correct' : isSelected ? 'incorrect' : ''
                  }`}
                >
                  {decodeHtml(answer)}
                </button>
              );
            })}
          </div>
        );
      })}

      {/* Final score with color based on correct answers */}
      <p className={`score ${scoreClass}`}>
        You got {correctAnswers} out of {questions.length} correct!
      </p>

      <button className="new-btn" onClick={handleNewQuiz}>
        Create New Quiz
      </button>
    </div>
  );
}

export default Results;
