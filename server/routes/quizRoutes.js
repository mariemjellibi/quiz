// //basically here we need to fetch all the questions *
// //and submit and calculate the score of each user thtat is wht we need authentification 
// import express from 'express';
// import Quiz from '../models/Question.js'
// import verifyToken from '../middleware/authMiddleware.js'
// const router = express.Router();
// router.get('/questions', async (req, res) => {
//   try {
//     const questions = await Quiz.find().limit(5).select('question options correctAnswer');
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // Submit answers and calculate score route
// router.post('/submit', verifyToken, async (req, res) => {
//   const { answers } = req.body;

//   if (!answers || answers.length === 0) {
//     return res.status(400).json({ message: 'No answers provided' });
//   }

//   try {
//     const userId = req.user.id; // Retrieve user ID from verified token
//     let score = 0;

//     for (const answer of answers) {
//       const question = await Quiz.findById(answer.questionId);
//       if (!question) {
//         return res.status(400).json({ message: `Question with ID ${answer.questionId} not found` });
//       }

//       if (question.correctAnswer === answer.selectedAnswer) {
//         score++;
//       }
//     }

//     // Update the user's score in the database
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.score += score; // Increment the user's total score
//     await user.save();

//     res.json({ score, totalQuestions: answers.length }); // Send result back to frontend
//   } catch (err) {
//     console.error('Error during score calculation:', err);
//     res.status(500).json({ message: 'Server error calculating score' });
//   }
// });
//  export default router;
// server/routes/quizRoutes.js
import express from 'express';
import authenticate from '../middleware/authMiddleware.js'
import Question from '../models/Question.js';
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const questions = await Question.find().limit(5); // Fetch all questions
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to submit the quiz answers and calculate the score
router.post('/submit', authenticate, async (req, res) => {
  const { answers } = req.body; // answers is an array of { questionId, selectedAnswer }
  let score = 0;

  try {
    for (let i = 0; i < answers.length; i++) {
      const question = await Question.findById(answers[i].questionId);
      if (question) {
        if (question.correctAnswer === answers[i].selectedAnswer) {
          score += 1;
        }
      }
    }

    res.json({ score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting answers' });
  }
});

// Your quiz routes
export default router;
