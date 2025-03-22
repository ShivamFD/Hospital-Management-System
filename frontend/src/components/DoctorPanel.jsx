// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';

// // Container for the page
// const Container = styled.div`
//   max-width: 900px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// // Page Title
// const Title = styled.h2`
//   font-size: 28px;
//   text-align: center;
//   margin-bottom: 30px;
//   color: #333;
// `;

// // Styled table
// const StyledTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// // Table header styling
// const TableHead = styled.thead`
//   background-color: #f2f2f2;
// `;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #fafafa;
//   }
// `;

// const TableHeader = styled.th`
//   text-align: left;
//   padding: 12px;
//   border: 1px solid #ddd;
// `;

// const TableData = styled.td`
//   padding: 12px;
//   border: 1px solid #ddd;
// `;

// // Accept Button styling
// const AcceptButton = styled.button`
//   background: #28a745;
//   color: #fff;
//   border: none;
//   padding: 8px 12px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background 0.3s, transform 0.2s;
//   &:hover {
//     background: #218838;
//     transform: scale(1.03);
//   }
// `;

// // Message styling for errors or empty states
// const Message = styled.p`
//   text-align: center;
//   font-size: 18px;
//   color: #333;
// `;

// const ApprovePatient = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get token from localStorage and set it as default header (backend expects x-auth-token)
//   const token = localStorage.getItem('token');
//   axios.defaults.headers.common['x-auth-token'] = token;

//   // Fetch appointments for the doctor
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/appointments/doctor');
//         // Expecting an array of appointments with populated patientId (with name, email)
//         setAppointments(res.data);
//       } catch (err) {
//         console.error('Error fetching appointments:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
//   }, [token]);

//   // Handle appointment acceptance
//   const acceptAppointment = async (appointmentId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/appointments/accept/${appointmentId}`);
//       alert('Appointment accepted!');
//       // Remove accepted appointment from the list
//       setAppointments((prev) =>
//         prev.filter((appointment) => appointment._id !== appointmentId)
//       );
//     } catch (err) {
//       console.error('Error accepting appointment:', err);
//       alert('Failed to accept appointment.');
//     }
//   };

//   return (
//     <Container>
//       <Title>Approve Patient Appointments</Title>
//       {loading ? (
//         <Message>Loading appointments...</Message>
//       ) : appointments.length === 0 ? (
//         <Message>No appointments to approve.</Message>
//       ) : (
//         <StyledTable>
//           <TableHead>
//             <TableRow>
//               <TableHeader>Patient Name</TableHeader>
//               <TableHeader>Email</TableHeader>
//               <TableHeader>Date</TableHeader>
//               <TableHeader>Status</TableHeader>
//               <TableHeader>Action</TableHeader>
//             </TableRow>
//           </TableHead>
//           <tbody>
//             {appointments.map((appointment) => (
//               <TableRow key={appointment._id}>
//                 <TableData>{appointment.patientId?.name || 'N/A'}</TableData>
//                 <TableData>{appointment.patientId?.email || 'N/A'}</TableData>
//                 <TableData>
//                   {new Date(appointment.date).toLocaleDateString('en-US', {
//                     weekday: 'short',
//                     year: 'numeric',
//                     month: 'short',
//                     day: 'numeric',
//                   })}
//                 </TableData>
//                 <TableData>{appointment.status}</TableData>
//                 <TableData>
//                   {appointment.status === 'pending' && (
//                     <AcceptButton onClick={() => acceptAppointment(appointment._id)}>
//                       Accept Appointment
//                     </AcceptButton>
//                   )}
//                 </TableData>
//               </TableRow>
//             ))}
//           </tbody>
//         </StyledTable>
//       )}
//     </Container>
//   );
// };

// export default ApprovePatient;




import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Container for the entire dashboard
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f8fa;
  font-family: 'Roboto', 'Helvetica Neue', sans-serif;
`;

// Header styling
const Header = styled.header`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #2563eb;
  margin: 0;
`;

const ProfileButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const DateDisplay = styled.span`
  background-color: #f3f4f6;
  padding: 8px 16px 8px 32px;
  border-radius: 5px;
  color: #4b5563;
  margin-right: 16px;
  position: relative;
  font-size: 14px;
  
  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background-color: #2563eb;
    border-radius: 50%;
  }
`;

// Main content area
const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

// Stats cards
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const StatTitle = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${props => props.color || '#2563eb'};
`;

// Appointments section
const AppointmentsSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #111827;
  margin: 0 0 4px 0;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

// Table styling
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f9fafb;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  text-transform: uppercase;
  color: #6b7280;
  font-weight: 500;
  letter-spacing: 0.05em;
`;

const TableData = styled.td`
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  color: #374151;
`;

// Patient info display
const PatientCell = styled.div`
  display: flex;
  align-items: center;
`;

const PatientAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dbeafe;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

const PatientInfo = styled.div`
  margin-left: 12px;
`;

const PatientName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const PatientEmail = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

// Status badges
const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  
  ${props => props.status === 'pending' && `
    background-color: #fef3c7;
    color: #92400e;
  `}
  
  ${props => props.status === 'accepted' && `
    background-color: #d1fae5;
    color: #065f46;
  `}
`;

// Buttons
const AcceptButton = styled.button`
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #059669;
  }
  
  svg {
    margin-right: 6px;
  }
`;

const ApprovedStatus = styled.div`
  color: #10b981;
  display: flex;
  align-items: center;
  font-size: 14px;
  
  svg {
    margin-right: 6px;
  }
`;

// Loading and empty states
const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-radius: 50%;
  border-top-color: #2563eb;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  margin: 0 auto 16px;
  width: 48px;
  height: 48px;
  color: #9ca3af;
`;

const EmptyStateTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 4px 0;
`;

const EmptyStateMessage = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    total: 0
  });

  // Get token from localStorage and set it as default header
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['x-auth-token'] = token;

  // Fetch appointments for the doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments/doctor');
        setAppointments(res.data);
        
        // Calculate statistics
        const pending = res.data.filter(app => app.status === 'pending').length;
        setStats({
          pending,
          accepted: res.data.length - pending,
          total: res.data.length
        });
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [token]);

  // Handle appointment acceptance
  const acceptAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/accept/${appointmentId}`);
      
      // Update the appointment status in the UI
      setAppointments(prevAppointments => 
        prevAppointments.map(app => 
          app._id === appointmentId ? {...app, status: 'accepted'} : app
        )
      );
      
      // Update stats
      setStats(prev => ({
        pending: prev.pending - 1,
        accepted: prev.accepted + 1,
        total: prev.total
      }));
      
    } catch (err) {
      console.error('Error accepting appointment:', err);
      alert('Failed to accept appointment.');
    }
  };

  return (
    <DashboardContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <DashboardTitle>Doctor Dashboard</DashboardTitle>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DateDisplay>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </DateDisplay>
            <ProfileButton>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              My Profile
            </ProfileButton>
          </div>
        </HeaderContent>
      </Header>

      <MainContent>
        {/* Statistics Cards */}
        <StatsGrid>
          <StatCard>
            <StatTitle>Pending Appointments</StatTitle>
            <StatValue color="#f59e0b">{stats.pending}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Accepted Appointments</StatTitle>
            <StatValue color="#10b981">{stats.accepted}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Total Appointments</StatTitle>
            <StatValue color="#2563eb">{stats.total}</StatValue>
          </StatCard>
        </StatsGrid>

        {/* Appointment Requests */}
        <AppointmentsSection>
          <SectionHeader>
            <SectionTitle>Appointment Requests</SectionTitle>
            <SectionDescription>Review and manage your patient appointment requests.</SectionDescription>
          </SectionHeader>

          {loading ? (
            <LoadingState>
              <Spinner />
            </LoadingState>
          ) : appointments.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </EmptyStateIcon>
              <EmptyStateTitle>No appointment requests</EmptyStateTitle>
              <EmptyStateMessage>You currently have no pending appointment requests to review.</EmptyStateMessage>
            </EmptyState>
          ) : (
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableHeader>Patient</TableHeader>
                  <TableHeader>Appointment Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Action</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableData>
                      <PatientCell>
                        <PatientAvatar>
                          {appointment.patientId?.name ? appointment.patientId.name.charAt(0).toUpperCase() : 'P'}
                        </PatientAvatar>
                        <PatientInfo>
                          <PatientName>{appointment.patientId?.name || 'Unknown Patient'}</PatientName>
                          <PatientEmail>{appointment.patientId?.email || 'No email provided'}</PatientEmail>
                        </PatientInfo>
                      </PatientCell>
                    </TableData>
                    <TableData>
                      <div>
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                        {new Date(appointment.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </TableData>
                    <TableData>
                      <StatusBadge status={appointment.status}>
                        {appointment.status === 'pending' ? 'Pending' : 'Accepted'}
                      </StatusBadge>
                    </TableData>
                    <TableData>
                      {appointment.status === 'pending' ? (
                        <AcceptButton onClick={() => acceptAppointment(appointment._id)}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Accept
                        </AcceptButton>
                      ) : (
                        <ApprovedStatus>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Approved
                        </ApprovedStatus>
                      )}
                    </TableData>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          )}
        </AppointmentsSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default DoctorDashboard;