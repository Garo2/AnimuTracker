import { Nav } from "react-bootstrap";

const NavigationSignoutView = ({ displayName, handleSignout, navSearch, navUserProfile }) =>
    <>
        <Nav.Link className="navButton pr-3 pl-3" href={navUserProfile}>{displayName}</Nav.Link>
        <Nav.Link className="navButton pr-3 pl-3" href={navSearch} onSelect={(e) => { handleSignout(); }}>Signout</Nav.Link>
    </>;

export default NavigationSignoutView;