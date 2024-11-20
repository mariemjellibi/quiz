import {Routes,Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RegisterPage />}/>
        <Route path='/quiz' element={<QuizPage />}/>
        <Route path='/result' element={<ResultPage />}/>
      </Routes>
    </div>
  )
}

export default App