import React from "react";
import useModelProp from "../useModelProp";
import NavigationView from "../views/navigationView";

import { toast } from 'react-toastify';


function Navigation({ userModel, children }) {

  const loggedIn = useModelProp(userModel, "loggedIn");
  const errorData = useModelProp(userModel, "errorData");

  const [navigationSigninComponent, navigationSignupComponent, navigationSignoutComponent] = children;

  const [toggleState, setToggleState] = React.useState(false);

  if (errorData) {
    toast.error(errorData.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    userModel.emptyErrorData();
  }

  if (loggedIn) {
    return React.createElement(NavigationView, {
      component: navigationSignoutComponent,
      toggleState: toggleState,
      setToggleState: () => setToggleState(!toggleState),
      handleClose: () => setToggleState(false)
    });
  }

  return React.createElement(NavigationView, {
    component: [navigationSignupComponent, navigationSigninComponent],
    toggleState: toggleState,
    setToggleState: () => setToggleState(!toggleState),
    handleClose: () => setToggleState(false)
  });
}


export default Navigation;
