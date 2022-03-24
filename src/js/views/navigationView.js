import {Navbar, Nav} from "react-bootstrap";

const NavigationView = ({component, toggleState, setToggleState, handleClose}) => 
  <Navbar expand="sm" bg="dark" variant="dark">
    <Navbar.Brand onClick = {(e) => handleClose()} href="/">
    <img width="40" height="40" src="websitelogo.png" alt="website logo"/>{" "}
    Animu Tracker
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick = {(e) => setToggleState()}/>
    <Navbar.Collapse in = {toggleState} id="responsive-navbar-nav" onClick = {(e) => handleClose()}>
      <Nav className="mr-auto">
        <Nav.Link href="#search" className = "navButton pr-3 pl-3">Search anime</Nav.Link>
      </Nav>
      <Nav>
        {component}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
;

export default NavigationView;
