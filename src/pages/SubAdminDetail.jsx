import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const SubAdminDetails = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const subAdmins = [
    { id: 1, name: 'Admin One', email: 'admin1@example.com', role: 'Manager' },
    { id: 2, name: 'Admin Two', email: 'admin2@example.com', role: 'Supervisor' },
    { id: 3, name: 'Admin Three', email: 'admin3@example.com', role: 'Coordinator' },
    { id: 4, name: 'Admin Four', email: 'admin4@example.com', role: 'Assistant' },
    { id: 5, name: 'Admin Five', email: 'admin5@example.com', role: 'Operator' },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAdminEmail, setSelectedAdminEmail] = useState('');

  const handleMenuOpen = (event, adminId, adminEmail) => {
    setAnchorEl(event.currentTarget);
    setSelectedAdminId(adminId);
    setSelectedAdminEmail(adminEmail); // Store email for navigation
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAdminId(null);
    setSelectedAdminEmail('');
  };

  const handleMenuAction = (action) => {
    // Navigate to the corresponding component based on the action selected
    if (action === 'Leave') {
      navigate(`/subadmin/${selectedAdminId}/leave?email=${encodeURIComponent(selectedAdminEmail)}`);
    } 
    else if (action === 'Attendance') {
      navigate(`/subadmin/${selectedAdminId}/attendance?email=${encodeURIComponent(selectedAdminEmail)}`);
    }
    handleMenuClose();
  };

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Sub Admin Details
      </Typography>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subAdmins.map((subAdmin) => (
                <TableRow key={subAdmin.id}>
                  <TableCell>{subAdmin.id}</TableCell>
                  <TableCell>{subAdmin.name}</TableCell>
                  <TableCell>{subAdmin.email}</TableCell>
                  <TableCell>{subAdmin.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuOpen(event, subAdmin.id, subAdmin.email)}>
                      <MoreVertIcon />
                    </IconButton>
                    {/* Action Menu */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedAdminId === subAdmin.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleMenuAction('Leave')}>Leave</MenuItem>
                      <MenuItem onClick={() => handleMenuAction('Attendance')}>Attendance</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default SubAdminDetails;
