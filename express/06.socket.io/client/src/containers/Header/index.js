import React, { useState } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" expand="md" inverse>
        <NavbarBrand to="/" tag={RouterLink}>
          <img src="/assets/vote.svg" alt="" height="35" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavItem>
              <NavLink to="/agenda" className="text-light" tag={RouterLink}>So'rovlar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/results" className="text-light" tag={RouterLink}>Natijalar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/poll" className="text-light" tag={RouterLink}>Ovoz berish</NavLink>
            </NavItem>
          </Nav>
          <Button color="light" to="/agendas/new" tag={RouterLink}>+ So'rov</Button>{' '}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
