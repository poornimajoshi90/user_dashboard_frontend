import { useState } from "react";
import type { User } from "../types/user";
import UserForm from "../components/UserForm";
import { useUsers } from "../hooks/useUsers";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Alert,
  Card,
  Badge,
  Modal,
} from "react-bootstrap";

const UsersPage = () => {
  const {
    users,
    loading,
    addUser,
    editUser,
    removeUser,
  } = useUsers();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  const handleSubmit = async (data: User) => {
    if (editingUser) {
      await editUser(editingUser.id!, data);
      setAlertInfo({
        type: "success",
        message: "User updated successfully.",
      });
      setEditingUser(null);
    } else {
      await addUser(data);
      setAlertInfo({
        type: "success",
        message: "User added successfully.",
      });
    }
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await removeUser(userToDelete.id!);
      setAlertInfo({
        type: "danger",
        message: "User deleted successfully.",
      });
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <Container fluid className="dashboard-wrapper py-5">
      <Row className="justify-content-center">
        <Col xl={9} lg={10}>

          {/* FORM SECTION */}
          <Card className="dashboard-card mb-5">
            <Card.Body>
              <h4 className="dashboard-title mb-4">
                {editingUser ? "Update User" : "Create User"}
              </h4>

              {alertInfo && (
                <Alert
                  variant={alertInfo.type}
                  dismissible
                  onClose={() => setAlertInfo(null)}
                >
                  {alertInfo.message}
                </Alert>
              )}

              <UserForm
  key={editingUser?.id ?? "new"}
  initialData={editingUser || undefined}
  onSubmit={handleSubmit}
  isEditing={!!editingUser}
/>

            </Card.Body>
          </Card>

          {/*USER LIST SECTION*/}
          <Card className="dashboard-card">
            <Card.Body>
              <Row className="align-items-center mb-3">
                <Col>
                  <h4 className="dashboard-title mb-0">
                    User Directory
                  </h4>
                  <small className="text-muted">
                    Manage all registered users
                  </small>
                </Col>

                <Col className="text-end">
                  <Badge bg="light" text="dark" className="users-badge">
                    {users.length} Users
                  </Badge>
                </Col>
              </Row>

              <hr className="mt-2 mb-4" />

              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table hover responsive className="align-middle custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center text-muted py-4">
                          No users found. Please add a user.
                        </td>
                      </tr>
                    ) : (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td className="text-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => setEditingUser(user)}
                            >
                              Update
                            </Button>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                setUserToDelete(user);
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>

        </Col>
      </Row>

      {/*DELETE CONFIRMATION MODAL */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default UsersPage;
