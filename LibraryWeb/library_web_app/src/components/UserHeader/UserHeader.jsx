import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function UserHeader() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/UserHome">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/UserHome">Home</Nav.Link>
            <Nav.Link href="/UserProfile">MyProfile</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default UserHeader;