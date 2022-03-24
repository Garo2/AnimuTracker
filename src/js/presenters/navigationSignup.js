import React from "react";
import NavigationSignupView from '../views/navigationSignupView'

function NavigationSignup({ userModel }) {

    const [displayName, setDisplayName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showSignup, setShowSignup] = React.useState(false);

    return React.createElement(NavigationSignupView, {
        setDisplayName: (displayName) => setDisplayName(displayName),
        setEmail: (email) => setEmail(email),
        setPassword: (password) => setPassword(password),
        handleSignup: () => userModel.signupUser(displayName, email, password),
        show: showSignup,
        handleShow: () => setShowSignup(true),
        handleClose: () => setShowSignup(false)
    });
}

export default NavigationSignup;
