import './navbar.styles.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
const Navigationbar = () => {

  return (
    <Fragment>
    <Navbar className='nav-head' expand="lg">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand href="#home">Code Typer</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to='/text-type'>
              <Nav.Link>Text</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Languages" id="basic-nav-dropdown">
              <LinkContainer to='/Cpp-game'>
                <NavDropdown.Item href="#action/3.1">C++</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/Python-game'>
                <NavDropdown.Item href="#action/3.2">
                  Python
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/JS-game'>
                <NavDropdown.Item href="#action/3.3">Javascript</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/Java-game'>
                <NavDropdown.Item href="#action/3.3">Java</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* without outlet, react router dom will not know where to render child components of nav bar in the main route */}
    <Outlet/>
    </Fragment>
  );

}

export default Navigationbar