import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
} from '@mui/material';

const LeavePage = () => {
  const { state } = useLocation(); // Fetching the employee data passed from the previous page
  const { employee } = state || {};

  // Dummy leave data for the employee
  const leaveData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Sick Leave', startDate: '2024-12-01', endDate: '2024-12-03', },
    { id: 2, name: 'John Doe', email: 'john@example.com', type: 'Casual Leave', startDate: '2024-12-10', endDate: '2024-12-12', },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', type: 'Annual Leave', startDate: '2024-12-15', endDate: '2024-12-20', },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com', type: 'Sick Leave', startDate: '2024-12-21', endDate: '2024-12-23', },
    { id: 5, name: 'John Doe', email: 'john@example.com', type: 'Casual Leave', startDate: '2024-12-25', endDate: '2024-12-27', },
  ];

  const [filteredLeaveType, setFilteredLeaveType] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (employee) {
      console.log('Employee Info:', employee); // Logging the extracted employee info
    } else {
      console.error('No employee data found.');
    }
  }, [employee]);

  // Filter data dynamically when filters or employee data changes
  useEffect(() => {
    if (employee) {
      let filtered = leaveData.filter(
        (leave) => leave.email === employee.email && leave.name === employee.name
      );

      if (filteredLeaveType) {
        filtered = filtered.filter((leave) => leave.type === filteredLeaveType);
      }

      if (searchDate) {
        filtered = filtered.filter(
          (leave) => leave.startDate <= searchDate && leave.endDate >= searchDate
        );
      }

      setFilteredData(filtered);
    }
  }, [employee, filteredLeaveType, searchDate]);

  // Reset filters
  const handleReset = () => {
    setFilteredLeaveType('');
    setSearchDate('');
  };

  if (!employee) {
    return (
      <Typography variant="h6" color="error" align="center">
        Employee not found
      </Typography>
    );
  }

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center justify-between">
        <div>
          <Typography variant="h4" gutterBottom>
            {employee.name}'s Leave Details
          </Typography>
        </div>

        {/* Filters */}
        <div className="flex gap-4 py-5">
          {/* Leave Type Dropdown */}
          <Select
            value={filteredLeaveType}
            onChange={(e) => setFilteredLeaveType(e.target.value)}
            displayEmpty
            variant="outlined"
            sx={{ width: '250px' }}
          >
            <MenuItem value="">All Leave Types</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Annual Leave">Annual Leave</MenuItem>
            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
          </Select>

          {/* Search by Date */}
          <TextField
            label="Search by Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            variant="outlined"
            sx={{ width: '250px' }}
          />

          {/* Reset Button */}
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Leave Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No leave records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.id}</TableCell>
                    <TableCell>{leave.name}</TableCell>
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>{leave.startDate}</TableCell>
                    <TableCell>{leave.endDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default LeavePage;
