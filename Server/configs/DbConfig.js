import { createConnection } from "mysql2/promise";

let Connection;

export async function connectdb() {

    try {

        Connection = await createConnection({

            host: "localhost",
            user: "root",
            password: "cdac123", // AS Demo password 
            port: 3306,
            database: "Quizdb" // database name 

        });

        console.log("DB Connection created");

    } catch (error) {

        console.log("Error in DB Connection :");
        console.log(error);

    }

    return Connection;
    
}

export function getConnectionObject() {

    return Connection;
    
}
