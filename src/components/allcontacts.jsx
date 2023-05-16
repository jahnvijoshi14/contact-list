import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { userContext } from "../context/usercontext";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";
import { EditContact } from "./editcontact";

//this the component in which all the contect in react state is visible
export const AllContacts = () => {
  // here the contect is used which has global data
  const contacts = useContext(userContext);
  const notification = useToasts();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const deleteContact = (id) => {
    contacts.deleteContact(id);
    notification.addToast("Contact deleted successfully", {
      appearance: "success",
    });
  };
  //when we click on edit edit will become true and Edit contact component is returned
  if (edit) {
    console.log(user);
    return <EditContact key={user.id} user={user} />;
  }

  return (
    <>
      <h1 style={{ margin: "20px", textAlign: "center" }}>All CONTACTS</h1>
      <Container>
        <Accordion>
          {contacts.users ? (
            contacts.users.map((data, index) => (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{data.name}</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li style={{ listStyleType: "none" }}>{data.username}</li>
                    <li style={{ listStyleType: "none" }}>{data.email}</li>
                    <li style={{ listStyleType: "none" }}>{data.phone}</li>

                    <li style={{ listStyleType: "none" }}>
                      <Button
                        variant="warning"
                        onClick={() => {
                          setUser(data);
                          setEdit(true);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      {/* this is the button on click of which contact will be deleted from react state */}
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteContact(data.id);
                        }}
                      >
                        Delete
                      </Button>{" "}
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))
          ) : (
            <div>No Data Found</div>
          )}
        </Accordion>
      </Container>
    </>
  );
};
