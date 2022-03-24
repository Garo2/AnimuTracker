import React from "react";
import NavigationSigninView from '../views/navigationSigninView'

function NavigationSignin({ userModel }) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showSignin, setShowSignin] = React.useState(false);


    return React.createElement(NavigationSigninView, {
        setEmail: (email) => setEmail(email),
        setPassword: (password) => setPassword(password),
        handleSignin: () => userModel.loginUser(email, password),
        show: showSignin,
        handleShow: () => setShowSignin(true),
        handleClose: () => setShowSignin(false)
    });
}

export default NavigationSignin;
