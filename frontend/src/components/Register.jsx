import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Hospital, UserPlus, Eye, EyeOff } from 'lucide-react';

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container with a clean gradient background
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
  padding: 20px;
`;

// Form container with a subtle shadow and responsive padding
const FormWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 40px 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

// Header container for title and icon
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

// Title text with HMS style
const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-left: 10px;
`;

// Styled form element
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Label styling
const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
`;

// Input field styling with focus and transition effects
const Input = styled.input`
  padding: 10px 40px 10px 10px;
  margin-bottom: 20px;
  border: 1px solid #ccd6dd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1d72b8;
    outline: none;
  }
`;

// Container for password input and toggle icon
const PasswordInputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

// Styled eye icon container
const ToggleIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #1d72b8;
`;

// Submit button with hover and transition effects
const Button = styled.button`
  padding: 12px;
  background: #1d72b8;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #155d8b;
    transform: translateY(-2px);
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Registration logic goes here (e.g., API call)
    // Example: 
    // axios.post('/api/register', formData).then(...).catch(...);
    console.log('Register:', formData);
  };

  return (
    <Container>
      <FormWrapper>
        <Header>
          <Hospital size={32} color="#1d72b8" />
          <Title>Patient Registration</Title>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Label htmlFor="password">Password</Label>
          <PasswordInputContainer>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <ToggleIcon onClick={handleTogglePassword}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </ToggleIcon>
          </PasswordInputContainer>

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInputContainer>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <ToggleIcon onClick={handleTogglePassword}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </ToggleIcon>
          </PasswordInputContainer>

          <Button type="submit">
            <UserPlus size={18} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            Register
          </Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Register;
