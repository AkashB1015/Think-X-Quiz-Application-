
import { getConnectionObject } from "../configs/DbConfig.js";
import { hashSync } from "bcrypt";

export async function registerUser(request, response) {
  try {
    
    const connection = getConnectionObject();
    const { fullname, email, password, dob, gender, phone } = request.body;

    const [existing] = await connection.query(

      `SELECT * FROM users WHERE email='${email}'`

    );

    if (existing.length > 0) {

      return response.status(400).send({ message: "Email already registered" });

    }
    const encryptedPassword = hashSync(password, 12);

    const qry = `
      INSERT INTO users (fullname, email, password, dob, gender, phone)
      VALUES ('${fullname}', '${email}', '${encryptedPassword}', '${dob}', '${gender}', '${phone}')
    `;

    const [result] = await connection.query(qry);

    if (result.affectedRows === 1) {

      response.status(200).send({ message: "User registration successful" });

    } else {

      response.status(500).send({ message: "User registration failed" });

    }
  } catch (error) {

    console.error("Error in registerUser:", error);
    response.status(500).send({ message: "Something went wrong" });

  }
}


export async function getAllUsers(request, response) {

    try {

        const connection = getConnectionObject();
        const qry = `SELECT user_id, fullname, email, dob, gender, phone, created_at FROM users`;
        const [rows] = await connection.query(qry);

        if (rows.length > 0) {

            response.status(200).send({

                message: "User data fetched successfully",
                data: rows,

            });

        } else {

            response.status(404).send({ message: "No users found" });
        }

    } catch (error) {
        
        console.log(error);
        response.status(500).send({ message: "Something went wrong while fetching users" });
    }
}
