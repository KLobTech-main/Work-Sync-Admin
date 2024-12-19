import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  TablePagination,
} from '@mui/material';

const Meeting = () => {
  const meetings = [
    { id: 1, employee: 'John Doe', meetingTime: '10:00 AM', topic: 'Project Update', date: '2024-12-15' },
    { id: 2, employee: 'Jane Smith', meetingTime: '02:00 PM', topic: 'Design Review', date: '2024-12-18' },
    { id: 3, employee: 'Michael Johnson', meetingTime: '11:30 AM', topic: 'Sprint Planning', date: '2024-12-16' },
    { id: 4, employee: 'Emily Davis', meetingTime: '04:00 PM', topic: 'Code Review', date: '2024-12-17' },
    { id: 5, employee: 'William Brown', meetingTime: '01:00 PM', topic: 'Client Discussion', date: '2024-12-19' },
    { id: 6, employee: 'Alice Green', meetingTime: '03:30 PM', topic: 'Team Building', date: '2024-12-20' },
    { id: 7, employee: 'Robert White', meetingTime: '09:00 AM', topic: 'Marketing Strategy', date: '2024-12-21' },
    { id: 8, employee: 'Emma Clark', meetingTime: '12:00 PM', topic: 'Product Demo', date: '2024-12-22' },
    { id: 9, employee: 'Daniel Lewis', meetingTime: '02:30 PM', topic: 'Budget Planning', date: '2024-12-23' },
    { id: 10, employee: 'Sophia Turner', meetingTime: '10:30 AM', topic: 'Sales Meeting', date: '2024-12-24' },
    { id: 11, employee: 'James White', meetingTime: '03:00 PM', topic: 'Project Overview', date: '2024-12-25' },
    { id: 12, employee: 'Olivia Black', meetingTime: '01:30 PM', topic: 'Team Collaboration', date: '2024-12-26' },
  ];

  const [searchTerm, setSearchTerm] = useState(''); // State for topic filter
  const [searchDate, setSearchDate] = useState(''); // State for date filter
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Filter meetings based on topic and date
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesTopic = meeting.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = searchDate ? meeting.date === searchDate : true; // If searchDate is empty, include all dates
    return matchesTopic && matchesDate;
  });

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page is changed
  };

  return (
    <div className="p-6">
      {/* Header and Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <h2 className="text-xl font-bold mb-4">Employee Meetings</h2>
        <Box display="flex" gap={2} sx={{ width: '800px', justifyContent: 'flex-end' }}>
          {/* Topic Filter */}
          <TextField
            label="Search by Topic"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update topic search term
            sx={{ width: '400px' }}
          />
          {/* Date Filter */}
          <TextField
            label="Search by Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)} // Update date search term
            sx={{ width: '400px' }}
          />
        </Box>
      </Box>

      {/* Meeting Table */}
      <Paper elevation={3} className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Employee</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Meeting Time</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Topic</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMeetings.length > 0 ? (
                filteredMeetings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Show `rowsPerPage` meetings per page
                  .map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell>{meeting.id}</TableCell>
                      <TableCell>{meeting.employee}</TableCell>
                      <TableCell>{meeting.meetingTime}</TableCell>
                      <TableCell>{meeting.topic}</TableCell>
                      <TableCell>{meeting.date}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No meetings match the search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10]} // Allow only 10 rows per page
        component="div"
        count={filteredMeetings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} // Allow changing rows per page
      />
    </div>
  );
};

export default Meeting;
