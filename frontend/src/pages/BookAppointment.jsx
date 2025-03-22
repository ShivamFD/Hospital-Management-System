// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// // Styled Components
// const BookAppointmentContainer = styled.div`
//   max-width: 1000px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #f0f2f5;
//   min-height: 100vh;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   color: #333;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const DoctorsList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 20px;
//   margin-bottom: 30px;
// `;

// const DoctorCard = styled.div`
//   background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 15px;
//   cursor: pointer;
//   transition: transform 0.2s;
  
//   &:hover {
//     transform: translateY(-5px);
//   }
  
//   &.selected {
//     border: 2px solid #007bff;
//   }
// `;

// const DoctorAvatarContainer = styled.div`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #e0e0e0;
//   overflow: hidden;
//   margin-right: 15px;
// `;

// const DoctorAvatarImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const DoctorAvatarInitials = styled.span`
//   font-size: 20px;
//   color: #666;
//   font-weight: 500;
// `;

// const DoctorInfo = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const DoctorDetails = styled.div`
//   flex: 1;
// `;

// const DoctorName = styled.h3`
//   font-size: 18px;
//   color: #333;
//   margin: 0 0 5px;
// `;

// const DoctorSpecialist = styled.span`
//   font-size: 14px;
//   color: #1976d2;
//   background-color: #e3f2fd;
//   padding: 2px 8px;
//   border-radius: 10px;
// `;

// const DoctorEmail = styled.p`
//   font-size: 12px;
//   color: #666;
//   margin: 5px 0 0;
// `;

// const BookingForm = styled.form`
//   background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 20px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   color: #333;
//   display: block;
//   margin-bottom: 5px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #e8ecef;
//   border-radius: 5px;
//   font-size: 14px;
//   outline: none;
//   &:focus {
//     border-color: #007bff;
//   }
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
//   display: block;
//   margin: 0 auto;
  
//   &:hover {
//     background-color: #0056b3;
//   }
  
//   &:disabled {
//     background-color: #cccccc;
//     cursor: not-allowed;
//   }
// `;

// const ErrorMessage = styled.div`
//   background-color: #ffebee;
//   color: #c62828;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const LoadingMessage = styled.div`
//   text-align: center;
//   font-size: 16px;
//   color: #666;
//   margin: 20px 0;
// `;

// // BookAppointment Component
// const BookAppointment = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const GET_DOCTORS_URL = 'http://localhost:5000/api/appointments/doctors';
//   const BOOK_APPOINTMENT_URL = 'http://localhost:5000/api/appointments/book';

//   // Fetch all doctors on mount
//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch(GET_DOCTORS_URL, {
//         method: 'GET',
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch doctors');
//       }

//       const data = await response.json();
//       console.log('Doctors data:', data);
//       setDoctors(data);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch doctors');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDoctorSelect = (doctor) => {
//     setSelectedDoctor(doctor);
//     setError(''); // Clear any previous errors
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedDoctor) {
//       setError('Please select a doctor');
//       return;
//     }
//     if (!date || !time) {
//       setError('Please select both date and time');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const appointmentData = {
//       doctorId: selectedDoctor._id,
//       date: new Date(`${date}T${time}`).toISOString(), // Combine date and time into ISO format
//     };

//     try {
//       const response = await fetch(BOOK_APPOINTMENT_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-auth-token': localStorage.getItem('token'),
//         },
//         body: JSON.stringify(appointmentData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.msg || 'Failed to book appointment');
//       }

//       const data = await response.json();
//       console.log('Appointment booked:', data);
//       alert('Appointment request sent successfully!');
//       setSelectedDoctor(null);
//       setDate('');
//       setTime('');
//     } catch (err) {
//       setError(err.message || 'Failed to book appointment');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper to get initials for avatar
//   const getInitials = (name) => {
//     if (!name) return '?';
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   return (
//     <BookAppointmentContainer>
//       <Title>Book an Appointment</Title>

//       {isLoading && <LoadingMessage>Loading doctors...</LoadingMessage>}
//       {error && <ErrorMessage>{error}</ErrorMessage>}

//       <DoctorsList>
//         {doctors.length > 0 ? (
//           doctors.map((doctor) => (
//             <DoctorCard
//               key={doctor._id}
//               className={selectedDoctor?._id === doctor._id ? 'selected' : ''}
//               onClick={() => handleDoctorSelect(doctor)}
//             >
//               <DoctorInfo>
//                 <DoctorAvatarContainer>
//                   {doctor.image ? (
//                     <DoctorAvatarImage 
//                       src={`http://localhost:5000/${doctor.image}`} 
//                       alt={doctor.name}
//                     />
//                   ) : (
//                     <DoctorAvatarInitials>
//                       {getInitials(doctor.name)}
//                     </DoctorAvatarInitials>
//                   )}
//                 </DoctorAvatarContainer>
//                 <DoctorDetails>
//                   <DoctorName>{doctor.name}</DoctorName>
//                   <DoctorSpecialist>{doctor.specialist || 'General Physician'}</DoctorSpecialist>
//                   <DoctorEmail>{doctor.email}</DoctorEmail>
//                 </DoctorDetails>
//               </DoctorInfo>
//             </DoctorCard>
//           ))
//         ) : (
//           !isLoading && <p>No doctors available</p>
//         )}
//       </DoctorsList>

//       {selectedDoctor && (
//         <BookingForm onSubmit={handleSubmit}>
//           <h2>Book with {selectedDoctor.name}</h2>
//           <FormGroup>
//             <Label htmlFor="date">Select Date</Label>
//             <Input
//               id="date"
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               min={new Date().toISOString().split('T')[0]} // Restrict to today or later
//               disabled={isLoading}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label htmlFor="time">Select Time</Label>
//             <Input
//               id="time"
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               disabled={isLoading}
//             />
//           </FormGroup>
//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? 'Booking...' : 'Send Appointment Request'}
//           </Button>
//         </BookingForm>
//       )}
//     </BookAppointmentContainer>
//   );
// };

// export default BookAppointment;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const BookAppointmentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Roboto', 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
`;

const DoctorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const DoctorCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
  
  &.selected {
    border: 2px solid #3498db;
  }
`;

const DoctorAvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8f4fd;
  overflow: hidden;
  margin: 0 auto 15px;
  border: 3px solid #e1e8ed;
`;

const DoctorAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DoctorAvatarInitials = styled.span`
  font-size: 36px;
  color: #3498db;
  font-weight: 600;
`;

const DoctorName = styled.h3`
  font-size: 18px;
  color: #2c3e50;
  margin: 10px 0 5px;
  font-weight: 600;
`;

const SpecialtyBadge = styled.span`
  font-size: 14px;
  color: #3498db;
  background-color: #e8f4fd;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
  display: inline-block;
  margin: 5px 0 10px;
`;

const DoctorEmail = styled.p`
  font-size: 14px;
  color: #546e7a;
  margin: 5px 0;
`;

const DoctorExperience = styled.p`
  font-size: 14px;
  color: #546e7a;
  margin: 5px 0 15px;
`;

const ViewProfileButton = styled.button`
  background-color: transparent;
  color: #3498db;
  border: 1px solid #3498db;
  padding: 8px 15px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e8f4fd;
  }
`;

const AppointmentSection = styled.div`
  margin-top: 40px;
`;

const BookingForm = styled.form`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img, .avatar-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #e8f4fd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #3498db;
    font-weight: 600;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #546e7a;
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.3s ease;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const TimeSlot = styled.div`
  padding: 8px 5px;
  border-radius: 8px;
  background: ${props => props.selected ? '#3498db' : '#f1f5f9'};
  color: ${props => props.selected ? '#fff' : '#546e7a'};
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.selected ? '#2980b9' : '#e1e8ed'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? 'transparent' : '#3498db'};
  color: ${props => props.secondary ? '#3498db' : 'white'};
  border: ${props => props.secondary ? '1px solid #3498db' : 'none'};
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.secondary ? '#e8f4fd' : '#2980b9'};
  }
  
  &:disabled {
    background-color: #b3c2d1;
    border-color: #b3c2d1;
    color: ${props => props.secondary ? '#b3c2d1' : 'white'};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fdecea;
  color: #e53935;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  text-align: center;
  border-left: 3px solid #e53935;
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 20px;
  border-radius: 8px;
  margin: 30px auto;
  text-align: center;
  border-left: 3px solid #2e7d32;
  max-width: 600px;
  
  h3 {
    margin: 0 0 10px;
    font-size: 18px;
  }
  
  p {
    margin: 0;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #546e7a;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 3px solid #e1e8ed;
    border-top-color: #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const NoResultMessage = styled.div`
  text-align: center;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: #546e7a;
  font-size: 16px;
  grid-column: 1 / -1;
`;

// Available time slots
const AVAILABLE_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
];

// BookAppointment Component
const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const GET_DOCTORS_URL = 'http://localhost:5000/api/appointments/doctors';
  const BOOK_APPOINTMENT_URL = 'http://localhost:5000/api/appointments/book';

  // Fetch all doctors on mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(GET_DOCTORS_URL, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError('Unable to load doctors at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setError('');
    setSuccess(false);
    setDate('');
    setSelectedTime('');
  };

  const handleCancel = () => {
    setSelectedDoctor(null);
    setDate('');
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      setError('Please select an appointment date');
      return;
    }
    if (!selectedTime) {
      setError('Please select an appointment time');
      return;
    }

    setIsLoading(true);
    setError('');

    const appointmentData = {
      doctorId: selectedDoctor._id,
      date: new Date(`${date}T${selectedTime}`).toISOString(),
    };

    try {
      const response = await fetch(BOOK_APPOINTMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to book appointment');
      }

      const data = await response.json();
      console.log('Appointment booked:', data);
      setSuccess(true);
      setSelectedDoctor(null);
    } catch (err) {
      setError(err.message || 'Unable to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get tomorrow's date as minimum date for booking
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <BookAppointmentContainer>
      <Title>Book an Appointment</Title>

      {isLoading && !doctors.length && <LoadingMessage>Loading available doctors...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && (
        <SuccessMessage>
          <h3>Appointment Request Sent Successfully!</h3>
          <p>Your appointment request has been submitted. You will receive a confirmation soon.</p>
        </SuccessMessage>
      )}

      {!selectedDoctor && (
        <DoctorsList>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                onClick={() => handleDoctorSelect(doctor)}
              >
                <DoctorAvatarContainer>
                  {doctor.image ? (
                    <DoctorAvatarImage 
                      src={`http://localhost:5000/${doctor.image}`} 
                      alt={doctor.name}
                    />
                  ) : (
                    <DoctorAvatarInitials>
                      {getInitials(doctor.name)}
                    </DoctorAvatarInitials>
                  )}
                </DoctorAvatarContainer>
                
                <DoctorName>Dr. {doctor.name}</DoctorName>
                <SpecialtyBadge>{doctor.specialist || 'General Physician'}</SpecialtyBadge>
                <DoctorEmail>{doctor.email}</DoctorEmail>
                {doctor.experience && (
                  <DoctorExperience>{doctor.experience} years of experience</DoctorExperience>
                )}
                <ViewProfileButton>Book Appointment</ViewProfileButton>
              </DoctorCard>
            ))
          ) : (
            !isLoading && (
              <NoResultMessage>
                No healthcare providers are available at the moment. Please check back later.
              </NoResultMessage>
            )
          )}
        </DoctorsList>
      )}

      {selectedDoctor && (
        <AppointmentSection>
          <BookingForm onSubmit={handleSubmit}>
            <FormTitle>
              {selectedDoctor.image ? (
                <img 
                  src={`http://localhost:5000/${selectedDoctor.image}`} 
                  alt={selectedDoctor.name}
                />
              ) : (
                <div className="avatar-placeholder">
                  {getInitials(selectedDoctor.name)}
                </div>
              )}
              Book Appointment with Dr. {selectedDoctor.name}
            </FormTitle>
            
            <FormGroup>
              <Label htmlFor="date">Select Appointment Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getTomorrowDate()}
                disabled={isLoading}
              />
            </FormGroup>
            
            {date && (
              <FormGroup>
                <Label>Select Available Time</Label>
                <TimeSlots>
                  {AVAILABLE_TIME_SLOTS.map((time) => (
                    <TimeSlot
                      key={time}
                      selected={selectedTime === time}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </TimeSlot>
                  ))}
                </TimeSlots>
              </FormGroup>
            )}
            
            <ButtonGroup>
              <Button 
                type="button" 
                secondary 
                onClick={handleCancel}
                disabled={isLoading}
              >
                Back to Doctors
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !date || !selectedTime}
              >
                {isLoading ? 'Processing...' : 'Request Appointment'}
              </Button>
            </ButtonGroup>
          </BookingForm>
        </AppointmentSection>
      )}
    </BookAppointmentContainer>
  );
};

export default BookAppointment;