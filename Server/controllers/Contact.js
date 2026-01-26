import { getConnectionObject } from "../configs/DbConfig.js";

export async function addContact(request, response) {

    try {

        const connection = getConnectionObject();

        const { fullname, email, phone, message } = request.body;

        const qry = `INSERT INTO contact_us(fullname, email, phone, message) 
                     VALUES('${fullname}', '${email}', '${phone}', '${message}')`;

        const [resultSet] = await connection.query(qry);

        if (resultSet.affectedRows === 1) {

            response.status(200).send({ message: 'Message sent successfully!' });

        } else {

            response.status(500).send({ message: 'Failed to send message' });
        }

    } catch (error) {

        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
     
    }
}

export async function getAllContacts(request, response) {

    try {

        const connection = getConnectionObject();

        const qry = `SELECT contact_id, fullname, email, phone, message, created_at FROM contact_us ORDER BY created_at DESC`;
        const [rows] = await connection.query(qry);

        response.status(200).send({ data: rows });

    } catch (error) {

        console.error('Error fetching contacts:', error);

        response.status(500).send({ message: 'Failed to fetch contacts' });

    }
}

export async function deleteContact(request, response) {

    try {

        const connection = getConnectionObject();
        const id = request.params.id;

        const qry = `DELETE FROM contact_us WHERE contact_id = ?`;
        const [result] = await connection.query(qry, [id]);

        if (result.affectedRows === 1) {

            response.status(200).send({ message: 'Contact deleted' });

        } else {

            response.status(404).send({ message: 'Contact not found' });

        }

    } catch (error) {
        

        console.error('Error deleting contact:', error);
        response.status(500).send({ message: 'Failed to delete contact' });

    }
}
