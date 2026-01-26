import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table, Modal } from "react-bootstrap";
import AdminNavbar from './AdminNavbar';
import { getAllContacts, deleteContact } from "../../services/ContactService.js"; 
import { toast, Bounce } from "react-toastify";

export default function ContactList() {

  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchContacts = async () => {

    try {

      const response = await getAllContacts();

      if (response.data?.data) {

        setContacts(response.data.data);

      } else {

        setContacts([]);

      }

    } catch (error) {

      console.error("Error fetching contacts:", error);
  
      if (error.response) { 

        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      toast.error("Failed to fetch contacts", {

        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,

      });
    }
  };

  useEffect(() => {

    fetchContacts();

  }, []);

  
  const handleDelete = async () => {

    try {

      const response = await deleteContact(selected.contact_id);
      
      if (response.status === 200) {

        setContacts(contacts.filter((c) => c.contact_id !== selected.contact_id));
        toast.success("Contact deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });

      } else {

        toast.error("Failed to delete contact", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,

        });

      }

    } catch (error) {

      console.error("Error deleting contact:", error);
      
      toast.error("Server error while deleting contact", {

        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });

    } finally {

      setShowConfirm(false);

    }
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-4">
        <Row>
          <Col>
            <Alert variant="primary" className="fw-bold text-center">
              Contact Messages
            </Alert>
          </Col>
        </Row>

        {contacts.length === 0 ? (
          <Alert variant="warning" className="text-center">
            No contacts found.
          </Alert>

        ) : (
          <Table striped bordered hover responsive className="mt-3 shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="text-center align-middle">
              {contacts.map((c, i) => (
                <tr key={c.contact_id}>
                  <td>{i + 1}</td>
                  <td>{c.fullname}</td>
                  <td>{c.email}</td>
                  <td>{c.phone || "—"}</td>
                  <td>{c.message}</td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {  setSelected(c);setShowConfirm(true);}}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>

          <Modal.Header closeButton>

            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure you want to delete the message from{" "}
            <strong>{selected?.fullname}</strong>?

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>

          </Modal.Footer>

        </Modal>
      </Container>
    </>
  );
}
