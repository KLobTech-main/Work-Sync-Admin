import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar'; // Sidebar component

// Page components
import EmployeeDetails from './pages/EmployeeDetail';
import SubAdminDetails from './pages/SubAdminDetail';
import Ticket from './pages/Ticket';
import Task from './pages/Task';
import Meeting from './pages/Meeting';
import Login from './pages/Login';
import LeavePage from './pages/LeavePage';
import Register from './pages/Register';
import AttendancePage from './pages/AttendancePage';
import TaskPage from './pages/TaskPage';
import SubAdminAttendance from './pages/SubAdminAttendance';
import SubAdminLeave from './pages/SubAdminLeave';

const AppContent = () => {
  const location = useLocation();

  // Define routes where the sidebar should not be displayed
  const noSidebarPaths = ['/admin/login', '/register'];

  // Check if the current path is in the no-sidebar list
  const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Conditionally render Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/employee-details" element={<EmployeeDetails />} />
          <Route path="/admin/employee/:id/leave" element={<LeavePage />} />
          <Route path="/admin/employee/:id/task" element={<TaskPage />} />
          <Route path="/admin/employee/:id/attendance" element={<AttendancePage />} />
          <Route path="/admin/subadmin-details" element={<SubAdminDetails />} />
          <Route path="/subadmin/:id/leave" element={<SubAdminLeave />} />
          <Route path="/subadmin/:email/attendance" element={<SubAdminAttendance />} />

          <Route path="/admin/meetings" element={<Meeting />} />
          <Route path="/admin/tasks" element={<Task />} />
          <Route path="/admin/tickets" element={<Ticket />} />
        </Routes>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
