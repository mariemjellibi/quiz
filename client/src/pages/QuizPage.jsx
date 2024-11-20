import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../assets/background1.webp';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5075/api/quiz/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data);
      } catch (err) {
        setError('Failed to load quiz questions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answersArray = Object.keys(answers).map((questionId) => ({
      questionId,
      selectedAnswer: answers[questionId],
    }));

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5075/api/quiz/submit', {
        answers: answersArray,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Redirect to the result page with the score
      navigate('/result', { state: { score: response.data.score, totalQuestions: questions.length } });
    } catch (err) {
      setError('Failed to submit the quiz');
    }
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-3xl bg-opacity-80">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Quiz</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          {questions.map((question) => (
            <div key={question._id}>
              <h3 className="text-lg font-medium mb-2">{question.question}</h3>
              {question.options.map((option) => (
                <div key={option} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`${question._id}-${option}`}
                    name={question._id}
                    value={option}
                    onChange={() => handleAnswerChange(question._id, option)}
                    className="mr-2"
                  />
                  <label htmlFor={`${question._id}-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Submit Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;
