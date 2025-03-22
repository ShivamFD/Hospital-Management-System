// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const Nav = styled.nav`
//   background-color: #333;
//   padding: 10px;
//   display: flex;
//   align-items: center;
// `;

// const StyledLink = styled(Link)`
//   color: white;
//   margin-right: 20px;
//   text-decoration: none;
// `;

// const LogoutButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   cursor: pointer;
//   margin-right: 20px;
// `;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <Nav>
//       <StyledLink to="/">Home</StyledLink>
//       <StyledLink to="/Appointment">Book Appointment</StyledLink>
//       {!token ? (
//         <>
//           <StyledLink to="/login">Login</StyledLink>
//           <StyledLink to="/register">Register</StyledLink>
//         </>
//       ) : (
//         <LogoutButton onClick={logout}>Logout</LogoutButton>
//       )}
//     </Nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Helper function to decode a JWT token
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

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

  // Default role if no token found
  let userRole = null;

  if (token) {
    const decoded = parseJwt(token);
    // Assuming your token payload contains user details under "user" property
    userRole = decoded?.user?.role;
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // If logged in user is a doctor, show only the logout button
  if (token && userRole === 'doctor') {
    return (
      <Nav>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Nav>
    );
  }

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
