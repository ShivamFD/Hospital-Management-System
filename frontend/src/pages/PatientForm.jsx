import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { CalendarCheck } from 'lucide-react';

// Fade-in animation for the form wrapper
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Main container with a subtle background gradient
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f7fa 0%, #ffe0b2 100%);
  padding: 20px;
`;

// Form wrapper with responsive design and animation
const FormWrapper = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

// Header for the form including an icon and title
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

// Title styling for the form header
const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-left: 10px;
`;

// Styled form element with column layout
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Label styling for form fields
const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
`;

// Input field styling with smart focus and transitions
const Input = styled.input`
  padding: 10px;
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

// Select element styling
const Select = styled.select`
  padding: 10px;
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

// Textarea styling for disease description or other longer inputs
const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccd6dd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #1d72b8;
    outline: none;
  }
`;

// Submit button styling with hover and transition effects
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

const PatientForm = () => {
  // In a real app, these would be fetched from the backend
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  // Example static data for demonstration
  useEffect(() => {
    // Dummy doctor data
    setDoctors([
      { id: 'doc1', name: 'Dr. A. Sharma' },
      { id: 'doc2', name: 'Dr. R. Verma' },
      { id: 'doc3', name: 'Dr. P. Singh' },
    ]);

    // Dummy time slots
    setTimeSlots([
      '09:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ]);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    doctorId: '',
    disease: '',
    timeSlot: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to backend, which would then route it to the doctor's dashboard.
    console.log('Patient Appointment Data:', formData);
    // Reset form after submission (optional)
    setFormData({
      fullName: '',
      email: '',
      contact: '',
      doctorId: '',
      disease: '',
      timeSlot: '',
    });
  };

  return (
    <Container>
      <FormWrapper>
        <Header>
          <CalendarCheck size={32} color="#1d72b8" />
          <Title>Book an Appointment</Title>
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

          <Label htmlFor="contact">Contact Number</Label>
          <Input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <Label htmlFor="doctorId">Select Doctor</Label>
          <Select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </Select>

          <Label htmlFor="disease">Disease / Condition</Label>
          <Textarea
            id="disease"
            name="disease"
            placeholder="Describe your disease or condition"
            rows="3"
            value={formData.disease}
            onChange={handleChange}
            required
          />

          <Label htmlFor="timeSlot">Preferred Time</Label>
          <Select
            id="timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a Time Slot --</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </Select>

          <Button type="submit">Submit Appointment</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default PatientForm;
