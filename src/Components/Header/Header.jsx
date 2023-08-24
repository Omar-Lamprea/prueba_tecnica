import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.scss'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className=''>
          <Navbar.Brand>
            <Link to="/">Posting Platfotm</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100 justify-content-end">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header