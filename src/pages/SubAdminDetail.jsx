import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const SubAdminDetails = () => {
  const navigate = useNavigate();
  const subAdminsData = [
    { id: 1, name: 'Admin One', email: 'admin1@example.com', role: 'Manager', joiningDate: '2022-01-15', mobile: '1234567890', isActive: false },
    { id: 2, name: 'Admin Two', email: 'admin2@example.com', role: 'Supervisor', joiningDate: '2021-09-10', mobile: '9876543210', isActive: true },
    { id: 3, name: 'Admin Three', email: 'admin3@example.com', role: 'Coordinator', joiningDate: '2023-03-22', mobile: '1122334455', isActive: false },
    { id: 4, name: 'Admin Four', email: 'admin4@example.com', role: 'Analyst', joiningDate: '2022-11-05', mobile: '4455667788', isActive: true },
    { id: 5, name: 'Admin Five', email: 'admin5@example.com', role: 'HR', joiningDate: '2021-12-20', mobile: '5566778899', isActive: false },
    // Additional Data
    { id: 6, name: 'Admin Six', email: 'admin6@example.com', role: 'Finance', joiningDate: '2020-05-15', mobile: '9988776655', isActive: true },
    { id: 7, name: 'Admin Seven', email: 'admin7@example.com', role: 'IT Support', joiningDate: '2023-01-25', mobile: '6677889900', isActive: false },
  ];

  const [subAdmins, setSubAdmins] = useState(subAdminsData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAdminEmail, setSelectedAdminEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    role: '',
    joiningDate: '',
    mobileNumber: '',
    email: '',
  });

  const rowsPerPage = 10;

  const handleMenuOpen = (event, adminId, adminEmail) => {
    setAnchorEl(event.currentTarget);
    setSelectedAdminId(adminId);
    setSelectedAdminEmail(adminEmail);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAdminId(null);
    setSelectedAdminEmail('');
  };

  const handleMenuAction = (action) => {
    if (action === 'Leave') {
      navigate(`/subadmin/${selectedAdminId}/leave?email=${encodeURIComponent(selectedAdminEmail)}`);
    } else if (action === 'Attendance') {
      navigate(`/subadmin/${selectedAdminId}/attendance?email=${encodeURIComponent(selectedAdminEmail)}`);
    } else if (action === 'Edit Info') {
      const selectedAdmin = subAdmins.find((admin) => admin.id === selectedAdminId);
      if (selectedAdmin) {
        setEditFormData({
          name: selectedAdmin.name,
          role: selectedAdmin.role,
          joiningDate: selectedAdmin.joiningDate,
          mobileNumber: selectedAdmin.mobile,
          email: selectedAdmin.email,
        });
        setEditDialogOpen(true);
      }
    }
    handleMenuClose();
  };

  const handleApproveAccess = (id) => {
    const updatedAdmins = subAdmins.map((admin) =>
      admin.id === id ? { ...admin, isActive: !admin.isActive } : admin
    );
    setSubAdmins(updatedAdmins);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = () => {
    const updatedAdmins = subAdmins.map((admin) =>
      admin.id === selectedAdminId
        ? { ...admin, ...editFormData }
        : admin
    );
    setSubAdmins(updatedAdmins);
    setEditDialogOpen(false);
  };

  const filteredSubAdmins = subAdmins.filter((subAdmin) =>
    subAdmin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subAdmin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subAdmin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedSubAdmins = filteredSubAdmins.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setPage((prev) => (prev * rowsPerPage < filteredSubAdmins.length ? prev + 1 : prev));

  return (
    <div className="p-6">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Sub Admin Details
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '400px' }}
        />
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Joining Date</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Access</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSubAdmins.length > 0 ? (
                paginatedSubAdmins.map((subAdmin) => (
                  <TableRow key={subAdmin.id}>
                    <TableCell>{subAdmin.id}</TableCell>
                    <TableCell>{subAdmin.name}</TableCell>
                    <TableCell>{subAdmin.email}</TableCell>
                    <TableCell>{subAdmin.role}</TableCell>
                    <TableCell>{subAdmin.joiningDate}</TableCell>
                    <TableCell>
                      {subAdmin.isActive ? (
                        <Typography color="green">Approved</Typography>
                      ) : (
                        <Typography color="red">Not Approved</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={subAdmin.isActive ? 'secondary' : 'primary'}
                        onClick={() => handleApproveAccess(subAdmin.id)}
                      >
                        {subAdmin.isActive ? 'Remove Access' : 'Approve Access'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, subAdmin.id, subAdmin.email)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedAdminId === subAdmin.id}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleMenuAction('Edit Info')}>Edit Info</MenuItem>
                        <MenuItem onClick={() => handleMenuAction('Leave')}>Leave</MenuItem>
                        <MenuItem onClick={() => handleMenuAction('Attendance')}>Attendance</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No sub-admins match the search term.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, p: 2 }}>
          <Button variant="outlined" onClick={handlePrevPage} disabled={page === 1}>
            Prev
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextPage}
            disabled={page * rowsPerPage >= filteredSubAdmins.length}
          >
            Next
          </Button>
        </Box>
      </Paper>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth>
        <DialogTitle>Edit Employee Info</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Name"
            fullWidth
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Role"
            fullWidth
            value={editFormData.role}
            onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Role"
            fullWidth
            value={editFormData.role}
            onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Joining Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editFormData.joiningDate}
            onChange={(e) => setEditFormData({ ...editFormData, joiningDate: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Mobile Number"
            fullWidth
            value={editFormData.mobileNumber}
            onChange={(e) => setEditFormData({ ...editFormData, mobileNumber: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Email"
            fullWidth
            value={editFormData.email}
            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubAdminDetails;