import React from 'react';
import { decodeHtml } from './decodeHtml';

const Questions = ({ questions, selectedAnswers, handleSelectedAnswers, countAnswers, handleSubmit }) => {
  return (
    <div className="questions">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h5>{decodeHtml(question.question)}</h5>

          {question.shuffled_answers.map((answer) => (
            <button
              key={answer}
              className={`answers-btn ${selectedAnswers[questionIndex] === answer ? 'selected' : ''}`}
              onClick={() => handleSelectedAnswers(questionIndex, answer)}
            >
              {decodeHtml(answer)}
            </button>
          ))}
        </div>
      ))}

      {/* Submit Button */}
      {countAnswers !== 0 && countAnswers === questions.length && (
        <button
          id="submit_button"
          onClick={handleSubmit}
          className="submit-btn"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Questions;
