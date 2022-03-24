import { Nav, Form, Modal, Button } from 'react-bootstrap'

const NavigationSignupView = ({ setDisplayName, setEmail, setPassword, handleSignup, show, handleShow, handleClose }) => {

    return (
        <div>
            <Nav.Link className="navButton pr-3 pl-3" onClick={() => handleShow()}>Signup</Nav.Link>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup to AnimuTracker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProfileName">
                            <Form.Label>Profile name</Form.Label>
                            <Form.Control onChange={e => setDisplayName(e.target.value)} type="text" placeholder="Enter profile name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Text className="text-muted my-2">
                            Never use your personal email or password because we don't have control over what firebase does with them.
                        </Form.Text>
                        <Button variant="success" onClick={(e) => { e.preventDefault(); handleClose(); handleSignup(); }}>
                            Signup
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>)

}




export default NavigationSignupView;


