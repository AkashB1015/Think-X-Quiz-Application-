import { compareSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "QUIZ_SECRET_KEY";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export async function login(req, res) {

  try {

    const connection = getConnectionObject();
    const { email, password, role } = req.body;

 
    const tableName = role === ROLES.ADMIN ? "admins" : "users";

    const [rows] = await connection.query(
      `SELECT * FROM ${tableName} WHERE email='${email}'`
    );

    if (rows.length === 0) {

      return res.status(400).send({ message: "Login failed, email does not exist" });
    }

    const user = rows[0];
    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Login failed, password is invalid" });
    }

   
    const token = jwt.sign(
  {
    admin_id: role === ROLES.ADMIN ? user.admin_id : user.user_id,
    email: user.email,
    role: role,
  },
  JWT_SECRET
);


    res.status(200).send({
      message: "Login successful",
      token,
      role,
      fullname: user.fullname,
    });

  } catch (error) {

    console.error(" Login Error:", error);
    res.status(500).send({ message: "Something went wrong" });
    
  }
}
