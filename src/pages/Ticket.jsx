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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  TablePagination,
} from '@mui/material';

const Ticket = () => {
  const tickets = [
    { id: 1, employee: 'John Doe', issue: 'Bug in feature X', status: 'Open', priority: 'High' },
    { id: 2, employee: 'Jane Smith', issue: 'UI issue in dashboard', status: 'Resolved', priority: 'Low' },
    { id: 3, employee: 'Mark Taylor', issue: 'API not responding', status: 'In Progress', priority: 'Medium' },
    { id: 4, employee: 'Emily Davis', issue: 'Performance lag', status: 'Open', priority: 'High' },
    { id: 5, employee: 'Michael Brown', issue: 'Database error', status: 'Resolved', priority: 'Medium' },
    { id: 6, employee: 'Sarah Lee', issue: 'Login issue', status: 'Open', priority: 'High' },
    { id: 7, employee: 'David King', issue: 'Slow network', status: 'In Progress', priority: 'Low' },
    { id: 8, employee: 'Sophia Green', issue: 'UI misalignment', status: 'Resolved', priority: 'Medium' },
    { id: 9, employee: 'James Carter', issue: 'Server downtime', status: 'Open', priority: 'High' },
    { id: 10, employee: 'Emily Clark', issue: 'App crash', status: 'Resolved', priority: 'High' },
    { id: 11, employee: 'Olivia Lewis', issue: 'Payment gateway failure', status: 'In Progress', priority: 'Medium' },
    { id: 12, employee: 'Liam Scott', issue: 'Broken link in footer', status: 'Open', priority: 'Low' },
  ];

  const [searchTerm, setSearchTerm] = useState(''); // State for issue filter
  const [searchStatus, setSearchStatus] = useState(''); // State for status filter
  const [searchPriority, setSearchPriority] = useState(''); // State for priority filter
  const [searchEmployee, setSearchEmployee] = useState(''); // State for employee name filter
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Filter tickets based on issue, status, priority, and employee name
  const filteredTickets = tickets.filter((ticket) => {
    const matchesIssue = ticket.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = searchStatus ? ticket.status === searchStatus : true;
    const matchesPriority = searchPriority ? ticket.priority === searchPriority : true;
    const matchesEmployee = ticket.employee.toLowerCase().includes(searchEmployee.toLowerCase());
    return matchesIssue && matchesStatus && matchesPriority && matchesEmployee;
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
        <h2 className="text-xl font-bold mb-4">Employee Tickets</h2>
        <Box display="flex" gap={2} sx={{ width: '800px', justifyContent: 'flex-end' }}>
          {/* Issue Filter */}
          <TextField
            label="Search by Issue"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update issue search term
            sx={{ width: '400px' }}
          />
          {/* Employee Filter */}
          <TextField
            label="Search by Employee"
            variant="outlined"
            value={searchEmployee}
            onChange={(e) => setSearchEmployee(e.target.value)} // Update employee search term
            sx={{ width: '400px' }}
          />
          {/* Status Filter */}
          <FormControl variant="outlined" sx={{ width: '200px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>
          {/* Priority Filter */}
          <FormControl variant="outlined" sx={{ width: '200px' }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={searchPriority}
              onChange={(e) => setSearchPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Ticket Table */}
      <Paper elevation={3} className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Employee</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Issue</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.length > 0 ? (
                filteredTickets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Show `rowsPerPage` tickets per page
                  .map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.employee}</TableCell>
                      <TableCell>{ticket.issue}</TableCell>
                      <TableCell>
                        <span
                          style={{
                            fontWeight: 'bold',
                            color:
                              ticket.status === 'Open'
                                ? 'red'
                                : ticket.status === 'Resolved'
                                ? 'green'
                                : 'orange',
                          }}
                        >
                          {ticket.status}
                        </span>
                      </TableCell>
                      <TableCell>{ticket.priority}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No tickets match the search criteria.
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
        count={filteredTickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} // Allow changing rows per page
      />
    </div>
  );
};

export default Ticket;
