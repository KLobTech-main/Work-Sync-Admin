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
} from '@mui/material';

const Meeting = () => {
  const meetings = [
    { id: 1, employee: 'John Doe', meetingTime: '10:00 AM', topic: 'Project Update', date: '2024-12-15' },
    { id: 2, employee: 'Jane Smith', meetingTime: '02:00 PM', topic: 'Design Review', date: '2024-12-18' },
    { id: 3, employee: 'Michael Johnson', meetingTime: '11:30 AM', topic: 'Sprint Planning', date: '2024-12-16' },
    { id: 4, employee: 'Emily Davis', meetingTime: '04:00 PM', topic: 'Code Review', date: '2024-12-17' },
    { id: 5, employee: 'William Brown', meetingTime: '01:00 PM', topic: 'Client Discussion', date: '2024-12-19' },
  ];

  const [searchTerm, setSearchTerm] = useState(''); // State for topic filter
  const [searchDate, setSearchDate] = useState(''); // State for date filter

  // Filter meetings based on topic and date
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesTopic = meeting.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = searchDate ? meeting.date === searchDate : true; // If searchDate is empty, include all dates
    return matchesTopic && matchesDate;
  });

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
                filteredMeetings.map((meeting) => (
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
    </div>
  );
};

export default Meeting;
