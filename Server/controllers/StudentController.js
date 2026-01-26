import { getConnectionObject } from "../configs/DbConfig.js";

export async function getQuizzes(req, res) {


  const connection = getConnectionObject();

  const [rows] = await connection.query(`

    SELECT q.quiz_id, q.quiz_title, s.subject_name FROM quizzes q LEFT JOIN subjects s ON q.subject_id = s.subject_id`);

  res.status(200).send({ data: rows });

}

export async function getQuizQuestions(req, res) {

  const { quiz_id } = req.params;
  const connection = getConnectionObject();

  const [rows] = await connection.query(
    `SELECT question_id, question_text, option_a, option_b, option_c, option_d FROM questions WHERE quiz_id=?`,[quiz_id]
  );

  res.status(200).send({ data: rows });

}

export async function submitQuiz(req, res) {

  const { quiz_id, answers } = req.body;
  const user_id = req.user.id;
  const connection = getConnectionObject();

  let score = 0;
  for (const ans of answers) {
    
    const [q] = await connection.query(`SELECT correct_option FROM questions WHERE question_id=?`, [ans.question_id]);
    const correct = q[0]?.correct_option === ans.chosen_option ? 1 : 0;
    score += correct;

    await connection.query(

      `INSERT INTO user_answers(user_id, quiz_id, question_id, chosen_option, is_correct)
       VALUES(?, ?, ?, ?, ?)`,
      
       [user_id, quiz_id, ans.question_id, ans.chosen_option, correct]
    );
  }

  res.status(200).send({ message: "Quiz submitted", score, total: answers.length });
}
