import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: white;
  margin-right: 20px;
  text-decoration: none;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/Appointment">Book Appointment</StyledLink>
      <StyledLink to="/Appointments">My-Appointments</StyledLink>

      {!token ? (
        <>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </>
      ) : (
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      )}
    </Nav>
  );
};

export default Navbar;