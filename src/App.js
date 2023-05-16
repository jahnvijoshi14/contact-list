import "./App.css";
import AddContact from "./components/addContact";
import { AllContacts } from "./components/allcontacts";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

function App() {
  const [key, setKey] = useState("add");

  return (
    <>
      {/* this is bootstatp tabs/navbar */}
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="add" title="Add Contact">
          <AddContact />;
        </Tab>
        <Tab eventKey="allcontacts" title="All Contacts">
          <AllContacts />
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
