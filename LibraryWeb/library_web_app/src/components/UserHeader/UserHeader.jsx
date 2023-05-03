import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function UserHeader() {
  const navigate = useNavigate()

  function LogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("Token");
    navigate("/Login")
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/UserHome">LibraryApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/UserHome">Home</Nav.Link>
            <Nav.Link href="/UserProfile">MyProfile</Nav.Link>
            <Nav.Link onClick={() => LogOut()}>LogOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default UserHeader;