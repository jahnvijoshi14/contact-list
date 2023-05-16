import { createContext } from "react";
import { useProvideUsers } from "../hooks/userprovidehook";

// this is the initial state which we will put in create context
const initialState = {
  users: [],
  addToContact: () => {},
  deleteContact: () => {},
  editContact: () => {},
};
export const userContext = createContext(initialState);

// this is the provider
export const UserProvider = ({ children }) => {
  const users = useProvideUsers();
  return <userContext.Provider value={users}>{children}</userContext.Provider>;
};
