import express from 'express';
import {
    createQuiz,
    getQuizById,
    getAllQuizzes,
    submitQuiz,
    getQuizResults,
    getQuizRankings,
    addSubject,
    getSubjects,
    getUserCompletedQuizzes,
    getMyCompletedQuizzes
} from '../controllers/QuizController.js';
import { verifyToken, isAdmin } from '../Middlewares/AuthMiddleware.js';

const router = express.Router();

// Subject routes (Admin only)
router.post('/subjects', verifyToken, isAdmin, addSubject);
router.get('/subjects', verifyToken, getSubjects);

// Quiz management routes (Admin only)
router.post('/quiz', verifyToken, isAdmin, createQuiz);
router.get('/quiz/:quiz_id', verifyToken, getQuizById);
router.get('/quiz', verifyToken, getAllQuizzes);

// Quiz taking routes (All authenticated users)
router.post('/quiz/submit', verifyToken, submitQuiz);
router.get('/quiz/:quiz_id/results/:user_id', verifyToken, getQuizResults);
router.get('/quiz/:quiz_id/rankings', verifyToken, getQuizRankings);
// User completed quizzes
router.get('/quiz/user/:user_id/completed', verifyToken, getUserCompletedQuizzes);
router.get('/quiz/user/me/completed', verifyToken, getMyCompletedQuizzes);

export default router;