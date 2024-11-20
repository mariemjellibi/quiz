import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import Question from './models/Question.js';

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Define exactly 5 questions
    const questions = [
      {
        question: 'Why did Shahrazad decide to marry King Shahryar despite knowing the fate of his previous wives?',
        options: [
          'She believed she could change his mind through stories',
          'She was forced by her father',
          'She wanted to become queen',
          'She believed the king had changed his ways',
        ],
        correctAnswer: 'She believed she could change his mind through stories',
      },
      {
        question: 'In Ali Baba and the Forty Thieves, what was the key phrase needed to open the treasure cave, and why did Kassim fail to escape?',
        options: [
          '"Open, sesame" - Kassim failed because he was too greedy and forgot the phrase',
          '"Open, sesame" - Kassim forgot the phrase because he was panicking',
          '"Open, sesame" - Kassim was locked in by the thieves',
          '"Open, sesame" - Kassim chose to stay longer to collect more treasure',
        ],
        correctAnswer: '"Open, sesame" - Kassim forgot the phrase because he was panicking',
      },
      {
        question: 'In the story of The Fisherman and the Jinni, why did the jinni agree to go back into the jar?',
        options: [
          'The jinni wanted to prove his power to the fisherman',
          'The fisherman promised him a wish',
          'The fisherman tricked the jinni into proving he could fit back inside',
          'The jinni was afraid of the fisherman',
        ],
        correctAnswer: 'The fisherman tricked the jinni into proving he could fit back inside',
      },
      {
        question: 'What was the primary reason for the conflict between the merchant and the slave in the story of "The Merchant and the Slave"?',
        options: [
          "The merchant wanted to steal the slave's treasure",
          'The slave tried to escape and steal the merchant\'s gold',
          'The merchant wanted to break the contract with the slave',
          'The slave sought revenge for a past wrong',
        ],
        correctAnswer: 'The merchant wanted to steal the slave\'s treasure',
      },
      {
        question: 'In the story of "The Three Apples", how did the caliph finally solve the mystery of the woman\'s death?',
        options: [
          'He had a dream that revealed the killer',
          'He conducted a public trial',
          'He listened to the confession of the murderer',
          'He asked the people who were involved to tell the truth',
        ],
        correctAnswer: 'He listened to the confession of the murderer',
      },
    ];

    // Check if questions already exist in the database
    const existingQuestions = await Question.find();
    if (existingQuestions.length === 0) {
      await Question.insertMany(questions);
      console.log('5 questions added to database.');
    } else {
      console.log('Questions already exist in the database.');
    }
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5075;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
