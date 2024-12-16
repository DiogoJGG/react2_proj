import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Questions from './components/Question';
import './App.css';

function App() {
  const navigate = useNavigate(); // Initialize navigate hook
  const [categories, setCategories] = useState([]); // state for categories
  const [questions, setQuestions] = useState([]); // state for questions
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers as an object
  const [countAnswers, setCountAnswers] = useState(0); // Track number of answered questions
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
      .catch((error) => console.error('Could not fetch any categories:', error))
      .finally(() => setLoading(false));
  }, []);

  const shuffleAnswers = (question) => {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    return answers.sort(() => Math.random() - 0.5);
  };

  // Handle selected answers
  const handleSelectedAnswers = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));

    if (!selectedAnswers[questionIndex]) {
      setCountAnswers((prevCount) => prevCount + 1);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    let correctCount = 0;

    questions.forEach((question, questionIndex) => {
      if (selectedAnswers[questionIndex] === question.correct_answer) {
        correctCount += 1;
      }
    });
    setCorrectAnswers(correctCount);

    navigate('/results', {
      state: {
        questions,
        selectedAnswers,
        correctAnswers: correctCount,
      },
    });
  };

  // Handle create click
  const handleClick = () => {
    const categorySelect = document.getElementById('categorySelect').value;
    const difficultySelect = document.getElementById('difficultySelect').value;

    if (categorySelect !== 'select' && difficultySelect !== 'select') {
      const url = `https://opentdb.com/api.php?amount=5&category=${categorySelect}&difficulty=${difficultySelect}&type=multiple`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const questionsWithShuffledAnswers = data.results.map((question) => ({
            ...question,
            shuffled_answers: shuffleAnswers(question),
          }));
          setQuestions(questionsWithShuffledAnswers);
          console.log(data.results);
        })
        .catch((error) =>
          console.error('Could not fetch any questions:', error)
        );
    } else {
      console.error('Please select valid category and difficulty.');
    }
  };

  if (loading) {
    return <div>LOADING..</div>;
  }

  return (
    <>
      <h2>QUIZ MAKER</h2>

      {/* Categories Dropdown */}
      <select name="category" id="categorySelect" defaultValue="select">
        <option value="select" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Difficulty Dropdown */}
      <select name="difficulty" id="difficultySelect" defaultValue="select">
        <option value="select" disabled>
          Select difficulty
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* Create Button */}
      <button id="create_button" onClick={handleClick}>
        Create
      </button>

      {/* Display Questions and Answers */}
      <Questions
        questions={questions}
        selectedAnswers={selectedAnswers}
        handleSelectedAnswers={handleSelectedAnswers}
        countAnswers={countAnswers}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default App;
