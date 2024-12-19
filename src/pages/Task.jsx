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

const Task = () => {
  const tasks = [
    { id: 1, employee: 'John Doe', task: 'Complete feature A', deadline: '2024-12-15' },
    { id: 2, employee: 'Jane Smith', task: 'Design wireframe', deadline: '2024-12-18' },
    { id: 3, employee: 'Alice Johnson', task: 'Fix bug in login', deadline: '2024-12-20' },
    { id: 4, employee: 'Bob Brown', task: 'Prepare presentation', deadline: '2024-12-22' },
    { id: 5, employee: 'Mary Davis', task: 'Write documentation', deadline: '2024-12-25' },
    { id: 6, employee: 'James Wilson', task: 'Test API', deadline: '2024-12-27' },
    { id: 7, employee: 'Lucy Evans', task: 'Create UI prototype', deadline: '2024-12-28' },
    { id: 8, employee: 'David Clark', task: 'Implement authentication', deadline: '2024-12-30' },
    { id: 9, employee: 'Sophia Lewis', task: 'Fix database issues', deadline: '2024-12-29' },
    { id: 10, employee: 'Robert Hall', task: 'Prepare project report', deadline: '2024-12-31' },
    { id: 11, employee: 'Ella Young', task: 'Review code changes', deadline: '2025-01-02' },
    { id: 12, employee: 'Liam Scott', task: 'Organize meeting', deadline: '2025-01-05' },
  ];

  const [searchTerm, setSearchTerm] = useState(''); // State for the search filter
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Filter tasks based on search input (case-insensitive)
  const filteredTasks = tasks.filter((task) =>
    task.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Header and Search Box */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <h2 className="text-xl font-bold">Employee Tasks</h2>
        {/* Search Input on the Right */}
        <Box sx={{ width: '400px' }}>
          <TextField
            label="Search by Employee or Task"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </Box>
      </Box>

      {/* Task Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Deadline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Show `rowsPerPage` tasks per page
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.employee}</TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.deadline}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No tasks match the search criteria.
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
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} // Allow changing rows per page
      />
    </div>
  );
};

export default Task;
