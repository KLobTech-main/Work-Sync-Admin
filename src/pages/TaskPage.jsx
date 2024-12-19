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
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const TaskPage = () => {
  const { state } = useLocation(); // Fetching the employee data passed from the previous page
  const { employee } = state || {};

  // Dummy task data for the employee
  const taskData = [
    { id: 1, name: 'John Doe', task: 'Complete project documentation', status: 'In Progress' },
    { id: 2, name: 'John Doe', task: 'Fix bugs in the login feature', status: 'Completed' },
    { id: 3, name: 'Jane Smith', task: 'Review pull requests', status: 'Pending' },
    { id: 4, name: 'Jane Smith', task: 'Prepare presentation slides', status: 'In Progress' },
    { id: 5, name: 'John Doe', task: 'Refactor the codebase', status: 'Completed' },
    { id: 6, name: 'John Doe', task: 'Deploy application to production', status: 'Pending' },
  ];

  const [taskNameFilter, setTaskNameFilter] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (employee) {
      console.log('Employee Info:', employee); // Logging the extracted employee info
    } else {
      console.error('No employee data found.');
    }
  }, [employee]);

  // Filter tasks dynamically when filters or employee data change
  useEffect(() => {
    if (employee) {
      let filtered = taskData.filter((task) => task.name === employee.name);

      if (taskNameFilter) {
        filtered = filtered.filter((task) =>
          task.task.toLowerCase().includes(taskNameFilter.toLowerCase())
        );
      }

      if (taskStatusFilter) {
        filtered = filtered.filter((task) => task.status === taskStatusFilter);
      }

      setFilteredTasks(filtered);
    }
  }, [employee, taskNameFilter, taskStatusFilter]);

  // Reset filters
  const handleReset = () => {
    setTaskNameFilter('');
    setTaskStatusFilter('');
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
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" gutterBottom>
            {employee.name}'s Task Details
          </Typography>
        </div>
        <div className="flex gap-4 py-4">
          <TextField
            label="Search by Task Name"
            variant="outlined"
            value={taskNameFilter}
            onChange={(e) => setTaskNameFilter(e.target.value)}
            sx={{ flex: 1 }}
          />

          {/* Task Status Filter Dropdown */}
          <FormControl variant="outlined" sx={{ flex: 1, minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={taskStatusFilter}
              onChange={(e) => setTaskStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          {/* Reset Button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ height: '55px' }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Task Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.name}</TableCell>

                    <TableCell>{task.task}</TableCell>
                    <TableCell>{task.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No tasks match the filters.
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

export default TaskPage;
