import React from "react";
import useModelProp from "../useModelProp";
import NavigationSignoutView from '../views/navigationSignoutView'

function NavigationSignout({ userModel, goToSearch, goToUserProfile, }) {

    const modelDisplayName = useModelProp(userModel, "displayName");

    return React.createElement(NavigationSignoutView, {
        displayName: modelDisplayName,
        handleSignout: () => userModel.logoutUser(),
        navSearch: goToSearch,
        navUserProfile: goToUserProfile
    });
}

export default NavigationSignout;
