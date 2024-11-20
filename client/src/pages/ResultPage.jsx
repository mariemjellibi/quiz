// src/pages/ResultPage.js
import { useLocation } from 'react-router-dom';
import background from '../assets/background1.webp';

const ResultPage = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  return (
    <div className="flex justify-center items-center min-h-screenbg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Quiz Results</h2>
        <p className="text-xl text-white">Your Score: {score} / {totalQuestions}</p>
      </div>
    </div>
  );
};

export default ResultPage;
