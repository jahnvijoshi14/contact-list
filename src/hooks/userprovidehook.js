import { useEffect, useState } from "react";
import { getData, deleteData, updateData, addData } from "../apis/index";

// this is the custom hook where all the functionalities are written ex:- add , update , delete react state
export const useProvideUsers = () => {
  const [users, setUsers] = useState([]);

  // this will fetch the data from the server
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();

      if (result.response == "success") {
        setUsers(result.data);
      }
    };
    fetchData();
  }, []);

  // this function  adds the data to the react state and also a dummy api call is made here
  const addToContact = async (user) => {
    await addData(user);
    if (users && users.length > 0) {
      user.id = users.length + 1;
    } else {
      user.id = 1;
    }
    const newUser = [user, ...users];

    setUsers(newUser);
  };

  // this function  delete the data from the react state and also a dummy api call is made here
  const deleteContact = async (id) => {
    await deleteData(id);
    const newUsers = users.filter((user) => user.id != id);
    setUsers(newUsers);
  };

  // this function updates the data in the react state and also a dummy api call is made here
  const editContact = (userDetails) => {
    updateData(userDetails);
    const newUsers = users.map((user) => {
      if (user.id == userDetails.id) {
        user.name = userDetails.name;
        user.username = userDetails.username;
        user.email = userDetails.email;
        user.phone = userDetails.phone;
      }
      return user;
    });

    setUsers(newUsers);
  };

  return {
    users,
    addToContact,
    deleteContact,
    editContact,
  };
};
