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

const Task = () => {
  const tasks = [
    { id: 1, employee: 'John Doe', task: 'Complete feature A', deadline: '2024-12-15' },
    { id: 2, employee: 'Jane Smith', task: 'Design wireframe', deadline: '2024-12-18' },
    { id: 3, employee: 'Alice Johnson', task: 'Fix bug in login', deadline: '2024-12-20' },
    { id: 4, employee: 'Bob Brown', task: 'Prepare presentation', deadline: '2024-12-22' },
    // Add more tasks here
  ];

  const [searchTerm, setSearchTerm] = useState(''); // State for the search filter

  // Filter tasks based on search input (case-insensitive)
  const filteredTasks = tasks.filter((task) =>
    task.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                filteredTasks.map((task) => (
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
    </div>
  );
};

export default Task;
