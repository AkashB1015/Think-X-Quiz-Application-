import { getConnectionObject } from "../configs/DbConfig.js";


export async function addSubject(req, res) {

    try {

        const { subject_name } = req.body;
        const connection = getConnectionObject();

        const [result] = await connection.query(

            'INSERT INTO subjects (subject_name) VALUES (?)',[subject_name]

        );
        res.status(201).json({ 

            success: true, 
            message: "Subject added successfully",
            subject_id: result.insertId 

        });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}

export async function getSubjects(req, res) {

    try {

        const connection = getConnectionObject();

        const [rows] = await connection.query('SELECT * FROM subjects');

        res.status(200).json({ success: true, data: rows });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}


export async function getAllQuizzes(req, res) {

    try {

        const connection = getConnectionObject();

        const [rows] = await connection.query(`

            SELECT q.*, s.subject_name 
            FROM quizzes q 
            JOIN subjects s ON q.subject_id = s.subject_id

        `);

        res.status(200).json({ success: true, data: rows });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}


export async function getQuizById(req, res) {

    try {

        const { quiz_id } = req.params;

        const connection = getConnectionObject();
        
     
        const [quizRows] = await connection.query(
            `SELECT q.*, s.subject_name 
            FROM quizzes q 
            JOIN subjects s ON q.subject_id = s.subject_id 
            WHERE q.quiz_id = ?`,
            [quiz_id]
        );
      
        const [questionRows] = await connection.query(

            `SELECT * FROM questions WHERE quiz_id = ?`, [quiz_id]

        );

        if (quizRows.length === 0) {

            return res.status(404).json({ success: false, message: "Quiz not found" });

        }

        res.status(200).json({
            success: true,
            data: {
                quiz: quizRows[0],
                questions: questionRows
            }
        });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}


export async function createQuiz(req, res) {

    const connection = getConnectionObject();

    try {

        const { quiz_title, subject_id, questions } = req.body;

      
        await connection.beginTransaction();

     
        const [quizResult] = await connection.query(

            `INSERT INTO quizzes (quiz_title, subject_id) VALUES (?, ?)`,
            [quiz_title, subject_id]

        );

        const quiz_id = quizResult.insertId;

        for (const question of questions) {

            await connection.query(

                `INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    quiz_id,
                    question.question_text,
                    question.option_a,
                    question.option_b,
                    question.option_c,
                    question.option_d,
                    question.correct_option
                ]
            );
        }

       
        await connection.commit();

        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            quiz_id: quiz_id
        });
        
    } catch (error) {
       
        await connection.rollback();
        res.status(500).json({ success: false, message: error.message });

    }
}


export async function submitQuiz(req, res) {

    const connection = getConnectionObject();

    try {

        const { user_id, quiz_id, answers } = req.body;

        let totalQuestions = answers.length;
        let correctAnswers = 0;

        await connection.beginTransaction();

        for (const answer of answers) {

            const [correctAnswerResult] = await connection.query(
                `SELECT correct_option FROM questions WHERE question_id = ?`,
                [answer.question_id]
            );

            const isCorrect = correctAnswerResult[0].correct_option === answer.chosen_option;
            if (isCorrect) correctAnswers++;

           
            await connection.query(

                `INSERT INTO user_answers (user_id, quiz_id, question_id, chosen_option, is_correct)
                VALUES (?, ?, ?, ?, ?)`,
                [user_id, quiz_id, answer.question_id, answer.chosen_option, isCorrect]

            );
        }

        await connection.commit();

        res.status(200).json({
            success: true,
            data: {
                total_questions: totalQuestions,
                correct_answers: correctAnswers,
                score: (correctAnswers / totalQuestions) * 100
            }
        });

    } catch (error) {
        
        await connection.rollback();

        res.status(500).json({ success: false, message: error.message });
        
    }
}


export async function getQuizResults(req, res) {

    try {

        const { user_id, quiz_id } = req.params;

        const connection = getConnectionObject();

        const [rows] = await connection.query(

            `SELECT 
                ua.question_id,
                q.question_text,
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d,
                q.correct_option,
                ua.chosen_option,
                ua.is_correct
            FROM user_answers ua
            JOIN questions q ON ua.question_id = q.question_id
            WHERE ua.user_id = ? AND ua.quiz_id = ?`,
            [user_id, quiz_id]

        );

        res.status(200).json({ success: true, data: rows });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}


export async function getQuizRankings(req, res) {

    try {

        const { quiz_id } = req.params;       
        const connection = getConnectionObject();

        const [quizExists] = await connection.query(

            'SELECT quiz_id FROM quizzes WHERE quiz_id = ?',
            [quiz_id]

        );
        
        if (quizExists.length === 0) {

            console.log('Quiz not found:', quiz_id);

            return res.status(404).json({ 

                success: false, 
                message: 'Quiz not found' 

            });
        }
        const [answerCount] = await connection.query(

            'SELECT COUNT(*) as count FROM user_answers WHERE quiz_id = ?',
            [quiz_id]

        );
        
        const [rows] = await connection.query(

            `SELECT 
                u.user_id,
                u.fullname,
                COUNT(CASE WHEN ua.is_correct = 1 THEN 1 END) as correct_answers,
                COUNT(ua.answer_id) as total_questions,
                (COUNT(CASE WHEN ua.is_correct = 1 THEN 1 END) / COUNT(ua.answer_id) * 100) as score
            FROM users u
            JOIN user_answers ua ON u.user_id = ua.user_id
            WHERE ua.quiz_id = ?
            GROUP BY u.user_id, u.fullname
            ORDER BY score DESC`,
            [quiz_id]

        );

        res.status(200).json({ success: true, data: rows });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}


export async function getUserCompletedQuizzes(req, res) {

    try {

        const { user_id } = req.params;
        const connection = getConnectionObject();

        const [rows] = await connection.query(

            `SELECT 
                ua.quiz_id,
                q.quiz_title,
                SUM(ua.is_correct) AS correct_answers,
                COUNT(ua.answer_id) AS total_questions,
                (SUM(ua.is_correct)/COUNT(ua.answer_id) * 100) AS score
            FROM user_answers ua
            JOIN quizzes q ON ua.quiz_id = q.quiz_id
            WHERE ua.user_id = ?
            GROUP BY ua.quiz_id, q.quiz_title
            ORDER BY score DESC`
        , [user_id]);


        res.status(200).json({ success: true, data: rows });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}

export async function getMyCompletedQuizzes(req, res) {
    try {
      
        const user_id = req.user?.admin_id;

        if (!user_id) return res.status(400).json({ success: false, message: 'User id not found in token' });

        const connection = getConnectionObject();

        const [rows] = await connection.query(

            `SELECT 
                ua.quiz_id,
                q.quiz_title,
                SUM(ua.is_correct) AS correct_answers,
                COUNT(ua.answer_id) AS total_questions,
                (SUM(ua.is_correct)/COUNT(ua.answer_id) * 100) AS score
            FROM user_answers ua
            JOIN quizzes q ON ua.quiz_id = q.quiz_id
            WHERE ua.user_id = ?
            GROUP BY ua.quiz_id, q.quiz_title
            ORDER BY score DESC`

        , [user_id]);

        res.status(200).json({ success: true, data: rows });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
        
    }
}