import React, { useState } from "react";
const AdminContex = React.createContext({
  notification: [],
  drawerOpen: true,
  addNotification: () => {},
  addDrawerOpen: () => {},
});

const AdminContextProvider = (props) => {
  const [notification, setNotification] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const addNotification = (data) => {
    setNotification({...notification,data});
  };
  const addDrawerOpen = (state) => {
    setDrawerOpen(state)
  };
  return (
    <AdminContex.Provider
      value={{
        addNotification,
        addDrawerOpen,
        notification,
        drawerOpen,
      }}
    >
      {props.children}
    </AdminContex.Provider>
  );
};

export { AdminContextProvider };
export default AdminContex;