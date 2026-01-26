import { getConnectionObject } from "../configs/DbConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "QUIZ_SECRET_KEY";

export async function registerAdmin(req, res) {

  try {

    const connection = getConnectionObject();
    const { fullname, email, password,  specialisation  } = req.body;

    const [existing] = await connection.query(

      `SELECT * FROM admins WHERE email='${email}'`

    );

    if (existing.length > 0) {

      return res.status(400).send({ message: "Email already registered" });

    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await connection.query(

      `INSERT INTO admins (fullname, email, password,  specialisation )
       VALUES ('${fullname}', '${email}', '${encryptedPassword}', '${ specialisation }')`

    );  

    res.status(200).send({ message: "Admin registration successful" });

  } catch (error) {

    console.error("Error in registerAdmin:", error);
    res.status(500).send({ message: "Something went wrong" });

  }
}


export async function adminLogin(req, res) {

  try {

    const connection = getConnectionObject();
    const { email, password } = req.body;

    console.log(" Admin login attempt:", email);

    const [rows] = await connection.query(

      `SELECT * FROM admins WHERE email='${email}'`

    );

    if (rows.length === 0) {

      return res.status(400).send({ message: "Email not registered" });

    }

    const admin = rows[0];

    if (!admin.password) {

      return res.status(500).send({ message: "Password field missing in database" });

    }

    const validPass = bcrypt.compareSync(password, admin.password);

    if (!validPass) {

      return res.status(401).send({ message: "Invalid password" });

    }

    const token = jwt.sign(

      { 
        admin_id: admin.admin_id, 
        role: "admin" 
      },
      JWT_SECRET, 
    );

    console.log(" Admin token generated successfully");

    res.status(200).send({

      message: "Login successful",
      token,
      role: "admin",
      fullname: admin.fullname,

    });

  } catch (err) {

    console.error(" Error in adminLogin:", err);
    res.status(500).send({ message: "Something went wrong", error: err.message });

  }
}


export async function getAdminProfile(req, res) {

  try {

    const connection = getConnectionObject();
    const adminId = req.user?.admin_id; 

    if (!adminId) {
      return res.status(400).send({ message: "Invalid admin token" });
    }
    
    const [result] = await connection.query(

      `SELECT admin_id, fullname, email,  specialisation  FROM admins WHERE admin_id = ${adminId}`

    );

    if (result.length > 0) {

      res.status(200).send(result[0]);

    } else {

      res.status(404).send({ message: "Admin not found" });

    }

  } catch (err) {

    console.error("Error fetching admin profile:", err);
    res.status(500).send({ message: "Error fetching admin profile" });

  }
}


export async function addSubject(req, res) {


    const { subject_name } = req.body;

    const connection = getConnectionObject();

    const [result] = await connection.query(`INSERT INTO subjects(subject_name) VALUES(?)`, [subject_name]);
    res.status(200).send({ message: "Subject added", subject_id: result.insertId });

}

export async function getSubjects(req, res) {


    const connection = getConnectionObject();
    const [rows] = await connection.query(`SELECT * FROM subjects`);

    res.status(200).send({ data: rows });


}


export async function addQuiz(req, res) {


    const { quiz_title, subject_id } = req.body;
    const connection = getConnectionObject();

    const [result] = await connection.query(
        `INSERT INTO quizzes(quiz_title, subject_id) VALUES(?, ?)`,
        [quiz_title, subject_id]
    );

    res.status(200).send({ message: "Quiz added", quiz_id: result.insertId });

}


export async function addQuestion(req, res) {


    const { quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;
   
    const connection = getConnectionObject();

    const [result] = await connection.query(

        `INSERT INTO questions(quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option]
    );
    res.status(200).send({ message: "Question added", question_id: result.insertId });


}
