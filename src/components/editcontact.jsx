import { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navbar, Nav } from "react-bootstrap";
import { userContext } from "../context/usercontext";
import { Container } from "react-bootstrap";
import { AllContacts } from "./allcontacts";

// this is the component for editing the user data
export function EditContact({ user }) {
  // here the contect is used which has global data
  const contacts = useContext(userContext);
  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    username: user.username,
    id: user.id,
  });
  console.log(data);
  const [flag, setFlag] = useState("false");
  const notification = useToasts();
  // on click of submit this function is called
  const handleSubmit = (event) => {
    setFlag("true");
    event.preventDefault();
    contacts.editContact(data);
    notification.addToast("Contact edited successfully", {
      appearance: "success",
    });
    console.log(data);

    setData({
      name: "",
      email: "",
      phone: "",
      username: "",
    });
    setFlag("false");
    setSubmit(true);
  };

  if (submit) {
    return <AllContacts />;
  }

  return (
    <>
      <Container>
        <h1 style={{ margin: "20px", textAlign: "center" }}>EDIT CONTACT</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={data.name}
              onChange={(event) => {
                setFlag("false");
                setData({ ...data, name: event.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={data.username}
              placeholder="Enter Username"
              onChange={(event) =>
                setData({ ...data, username: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={data.email}
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={data.phone}
              placeholder="Enter Phone number"
              onChange={(event) => {
                setFlag("false");
                setData({ ...data, phone: event.target.value });
              }}
            />
          </Form.Group>

          {flag == "true" ? (
            <Button variant="primary" type="submit" disabled>
              Submit
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}

          <Button
            variant="danger"
            style={{ marginLeft: "10px" }}
            type="button"
            onClick={() => setSubmit(true)}
          >
            Go Back
          </Button>
        </Form>
      </Container>
    </>
  );
}
