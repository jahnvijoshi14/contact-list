import { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { userContext } from "../context/usercontext";
import { Container } from "react-bootstrap";

// this is component which is used to add contact to the react state
function AddContact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
  });
  const [show, setShow] = useState(false);
  // here the contect is used which has global data
  const contacts = useContext(userContext);

  const [flag, setFlag] = useState("true");
  const notification = useToasts();

  // on click of submit this function is called
  const handleSubmit = (event) => {
    if (
      !(data.name.trim && data.email.trim && data.phone.trim && data.username)
    ) {
      setShow(true);
      return;
    }

    setFlag("true");
    event.preventDefault();
    contacts.addToContact(data);
    notification.addToast("Contact added successfully", {
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
  };

  if (show) {
    return (
      <>
        <Container>
          <Alert show={show} variant="success">
            <Alert.Heading>NOTE:- ALL FIELDS ARE MANDATORY</Alert.Heading>
            <p>
              please fill all the details once. Later you can edit details and
              remove info if needed!!!!
            </p>
            <p>Click on close button to fill form </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Close
              </Button>
            </div>
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <h1 style={{ margin: "20px", textAlign: "center" }}>ADD CONTACT</h1>
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
              placeholder="Enter Username"
              value={data.username}
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={data.phone}
              type="text"
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
        </Form>
      </Container>
    </>
  );
}

export default AddContact;
