// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// // Styled Components
// const AllAppointmentsContainer = styled.div`
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

// const AppointmentsTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// `;

// const TableHead = styled.thead`
//   background-color: #f5f7fa;
// `;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #fafafa;
//   }
// `;

// const TableHeader = styled.th`
//   padding: 12px 15px;
//   text-align: left;
//   font-size: 14px;
//   color: #666;
// `;

// const TableCell = styled.td`
//   padding: 12px 15px;
//   font-size: 14px;
//   color: #333;
// `;

// const DoctorInfo = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const DoctorAvatarContainer = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #e0e0e0;
//   overflow: hidden;
//   margin-right: 10px;
// `;

// const DoctorAvatarImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const DoctorAvatarInitials = styled.span`
//   font-size: 16px;
//   color: #666;
//   font-weight: 500;
// `;

// const DoctorDetails = styled.div`
//   flex: 1;
// `;

// const DoctorName = styled.div`
//   font-weight: 500;
//   color: #333;
// `;

// const DoctorSpecialist = styled.span`
//   font-size: 12px;
//   color: #1976d2;
//   background-color: #e3f2fd;
//   padding: 2px 8px;
//   border-radius: 10px;
//   margin-top: 4px;
//   display: inline-block;
// `;

// const StatusBadge = styled.span`
//   padding: 4px 8px;
//   border-radius: 12px;
//   font-size: 12px;
//   color: white;
//   background-color: ${(props) =>
//     props.status === 'approved' ? '#4caf50' : props.status === 'pending' ? '#ff9800' : '#f44336'};
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

// const NoAppointmentsMessage = styled.p`
//   text-align: center;
//   font-size: 16px;
//   color: #666;
//   margin: 20px 0;
// `;

// // AllAppointments Component
// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const GET_ALL_APPOINTMENTS_URL = 'http://localhost:5000/api/appointments/my-appointments';

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await fetch(GET_ALL_APPOINTMENTS_URL, {
//         method: 'GET',
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.msg || 'Failed to fetch appointments');
//       }
//       const data = await response.json();
//       console.log('Appointments data:', data);
//       console.log('First appointment:', data[0]); // Log the first item to see its structure
//       setAppointments(data);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch appointments');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getInitials = (name) =>
//     !name ? '?' : name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//   return (
//     <AllAppointmentsContainer>
//       <Title>My Appointments</Title>

//       {isLoading && <LoadingMessage>Loading appointments...</LoadingMessage>}
//       {error && <ErrorMessage>{error}</ErrorMessage>}

//       {appointments.length > 0 ? (
//         <AppointmentsTable>
//           <TableHead>
//             <TableRow>
//               <TableHeader>Doctor</TableHeader>
//               <TableHeader>Specialization</TableHeader>
//               <TableHeader>Date & Time</TableHeader>
//               <TableHeader>Status</TableHeader>
//             </TableRow>
//           </TableHead>
//           <tbody>
//             {appointments.map((appointment) => (
//               <TableRow key={appointment._id}>
//                 <TableCell>
//                   <DoctorInfo>
//                     <DoctorAvatarContainer>
//                       {appointment.doctorId.image ? (
//                         <DoctorAvatarImage
//                           src={`http://localhost:5000/${appointment.doctorId.image}`}
//                           alt={appointment.doctorId.name}
//                         />
//                       ) : (
//                         <DoctorAvatarInitials>
//                           {getInitials(appointment.doctorId.name)}
//                         </DoctorAvatarInitials>
//                       )}
//                     </DoctorAvatarContainer>
//                     <DoctorDetails>
//                       <DoctorName>{appointment.doctorId.name}</DoctorName>
//                     </DoctorDetails>
//                   </DoctorInfo>
//                 </TableCell>
//                 <TableCell>
//                   <DoctorSpecialist>
//                     {appointment.doctorId.specialist || 'General Physician'}
//                   </DoctorSpecialist>
//                 </TableCell>
//                 <TableCell>{formatDate(appointment.date)}</TableCell>
//                 <TableCell>
//                   <StatusBadge status={appointment.status}>
//                     {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//                   </StatusBadge>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </tbody>
//         </AppointmentsTable>
//       ) : (
//         !isLoading && <NoAppointmentsMessage>No appointments found.</NoAppointmentsMessage>
//       )}
//     </AllAppointmentsContainer>
//   );
// };

// export default AllAppointments;


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// // Styled Components (unchanged)
// const AllAppointmentsContainer = styled.div`
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

// const AppointmentsTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// `;

// const TableHead = styled.thead`
//   background-color: #f5f7fa;
// `;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #fafafa;
//   }
// `;

// const TableHeader = styled.th`
//   padding: 12px 15px;
//   text-align: left;
//   font-size: 14px;
//   color: #666;
// `;

// const TableCell = styled.td`
//   padding: 12px 15px;
//   font-size: 14px;
//   color: #333;
// `;

// const DoctorInfo = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const DoctorAvatarContainer = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #e0e0e0;
//   overflow: hidden;
//   margin-right: 10px;
// `;

// const DoctorAvatarImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const DoctorAvatarInitials = styled.span`
//   font-size: 16px;
//   color: #666;
//   font-weight: 500;
// `;

// const DoctorDetails = styled.div`
//   flex: 1;
// `;

// const DoctorName = styled.div`
//   font-weight: 500;
//   color: #333;
// `;

// const DoctorSpecialist = styled.span`
//   font-size: 12px;
//   color: #1976d2;
//   background-color: #e3f2fd;
//   padding: 2px 8px;
//   border-radius: 10px;
//   margin-top: 4px;
//   display: inline-block;
// `;

// const StatusBadge = styled.span`
//   padding: 4px 8px;
//   border-radius: 12px;
//   font-size: 12px;
//   color: white;
//   background-color: ${(props) =>
//     props.status === 'approved' ? '#4caf50' : props.status === 'pending' ? '#ff9800' : '#f44336'};
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

// const NoAppointmentsMessage = styled.p`
//   text-align: center;
//   font-size: 16px;
//   color: #666;
//   margin: 20px 0;
// `;

// // AllAppointments Component
// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const GET_ALL_APPOINTMENTS_URL = 'http://localhost:5000/api/appointments/my-appointments';

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await fetch(GET_ALL_APPOINTMENTS_URL, {
//         method: 'GET',
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.msg || 'Failed to fetch appointments');
//       }
//       const data = await response.json();
//       console.log('Appointments data:', data);
//       setAppointments(data);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch appointments');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log('Updated appointments state:', appointments);
//   }, [appointments]);

//   const getInitials = (name) =>
//     !name ? '?' : name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//   const renderAppointmentRow = (appointment) => {
//     const doctor = appointment.doctorId || {};
//     const doctorName = doctor.name || appointment.doctorName || 'Unknown';
//     const specialist = doctor.specialist || appointment.specialist || 'General Physician';
//     const image = doctor.image;

//     return (
//       <TableRow key={appointment._id}>
//         <TableCell>
//           <DoctorInfo>
//             <DoctorAvatarContainer>
//               {image ? (
//                 <DoctorAvatarImage src={`http://localhost:5000/${image}`} alt={doctorName} />
//               ) : (
//                 <DoctorAvatarInitials>{getInitials(doctorName)}</DoctorAvatarInitials>
//               )}
//             </DoctorAvatarContainer>
//             <DoctorDetails>
//               <DoctorName>{doctorName}</DoctorName>
//             </DoctorDetails>
//           </DoctorInfo>
//         </TableCell>
//         <TableCell>
//           <DoctorSpecialist>{specialist}</DoctorSpecialist>
//         </TableCell>
//         <TableCell>{formatDate(appointment.date)}</TableCell>
//         <TableCell>
//           <StatusBadge status={appointment.status}>
//             {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//           </StatusBadge>
//         </TableCell>
//       </TableRow>
//     );
//   };

//   return (
//     <AllAppointmentsContainer>
//       <Title>My Appointments</Title>

//       {isLoading && <LoadingMessage>Loading appointments...</LoadingMessage>}
//       {error && <ErrorMessage>{error}</ErrorMessage>}

//       {appointments.length > 0 ? (
//         <AppointmentsTable>
//           <TableHead>
//             <TableRow>
//               <TableHeader>Doctor</TableHeader>
//               <TableHeader>Specialization</TableHeader>
//               <TableHeader>Date & Time</TableHeader>
//               <TableHeader>Status</TableHeader>
//             </TableRow>
//           </TableHead>
//           <tbody>{appointments.map(renderAppointmentRow)}</tbody>
//         </AppointmentsTable>
//       ) : (
//         !isLoading && <NoAppointmentsMessage>No appointments found.</NoAppointmentsMessage>
//       )}
//     </AllAppointmentsContainer>
//   );
// };

// export default AllAppointments;




import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components (unchanged)
const AllAppointmentsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const AppointmentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #f5f7fa;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  font-size: 14px;
  color: #333;
`;

const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const DoctorAvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  overflow: hidden;
  margin-right: 10px;
`;

const DoctorAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DoctorAvatarInitials = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const DoctorDetails = styled.div`
  flex: 1;
`;

const DoctorName = styled.div`
  font-weight: 500;
  color: #333;
`;

const DoctorSpecialist = styled.span`
  font-size: 12px;
  color: #1976d2;
  background-color: #e3f2fd;
  padding: 2px 8px;
  border-radius: 10px;
  margin-top: 4px;
  display: inline-block;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  background-color: ${(props) =>
    props.status === 'accepted' ? '#4caf50' : props.status === 'pending' ? '#ff9800' : '#f44336'};
`;

const PayButton = styled.button`
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #1565c0;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #666;
  margin: 20px 0;
`;

const NoAppointmentsMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #666;
  margin: 20px 0;
`;

// AllAppointments Component
const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const GET_ALL_APPOINTMENTS_URL = 'http://localhost:5000/api/appointments/my-appointments';
  const CREATE_PAYMENT_URL = 'http://localhost:5000/api/payments/create-order';

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(GET_ALL_APPOINTMENTS_URL, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch appointments');
      }
      const data = await response.json();
      console.log('Appointments data:', data);
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (appointment) => {
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      setError('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    try {
      const response = await fetch(CREATE_PAYMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          appointmentId: appointment._id,
          amount: 50000, // Amount in paise (500 INR)
        }),
      });

      const order = await response.json();

      const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: 'INR',
        name: 'Healthcare Service',
        description: `Payment for appointment with ${appointment.doctorId?.name || 'Doctor'}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
              },
              body: JSON.stringify({
                appointmentId: appointment._id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyResponse.ok) {
              alert('Payment successful!');
              fetchAppointments(); // Refresh appointments list
            }
          } catch (err) {
            setError('Payment verification failed');
          }
        },
        prefill: {
          name: 'Patient Name',
          email: 'patient@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#1976d2',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError('Failed to initiate payment');
    }
  };

  const getInitials = (name) =>
    !name ? '?' : name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderAppointmentRow = (appointment) => {
    const doctor = appointment.doctorId || {};
    const doctorName = doctor.name || appointment.doctorName || 'Unknown';
    const specialist = doctor.specialist || appointment.specialist || 'General Physician';
    const image = doctor.image;

    return (
      <TableRow key={appointment._id}>
        <TableCell>
          <DoctorInfo>
            <DoctorAvatarContainer>
              {image ? (
                <DoctorAvatarImage src={`http://localhost:5000/${image}`} alt={doctorName} />
              ) : (
                <DoctorAvatarInitials>{getInitials(doctorName)}</DoctorAvatarInitials>
              )}
            </DoctorAvatarContainer>
            <DoctorDetails>
              <DoctorName>{doctorName}</DoctorName>
            </DoctorDetails>
          </DoctorInfo>
        </TableCell>
        <TableCell>
          <DoctorSpecialist>{specialist}</DoctorSpecialist>
        </TableCell>
        <TableCell>{formatDate(appointment.date)}</TableCell>
        <TableCell>
          <StatusBadge status={appointment.status}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </StatusBadge>
        </TableCell>
        <TableCell>
          {/* Changed from 'approved' to 'accepted' */}
          {appointment.status === 'accepted' && !appointment.isPaid ? (
            <PayButton onClick={() => handlePayment(appointment)}>
              Pay Now
            </PayButton>
          ) : appointment.status === 'accepted' && appointment.isPaid ? (
            <StatusBadge status="accepted">Paid</StatusBadge>
          ) : null}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <AllAppointmentsContainer>
      <Title>My Appointments</Title>

      {isLoading && <LoadingMessage>Loading appointments...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {appointments.length > 0 ? (
        <AppointmentsTable>
          <TableHead>
            <TableRow>
              <TableHeader>Doctor</TableHeader>
              <TableHeader>Specialization</TableHeader>
              <TableHeader>Date & Time</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Payment</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>{appointments.map(renderAppointmentRow)}</tbody>
        </AppointmentsTable>
      ) : (
        !isLoading && <NoAppointmentsMessage>No appointments found.</NoAppointmentsMessage>
      )}
    </AllAppointmentsContainer>
  );
};

export default AllAppointments;