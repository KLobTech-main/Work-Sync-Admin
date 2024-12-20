import  { useState, useEffect } from 'react';
import axios from 'axios';
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
  Box,
  TablePagination,
  Button,
} from '@mui/material';

const AttendancePage = () => {
  const { state } = useLocation();
  const { employee } = state || {};
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchAttendanceData = async () => {
    try {
      const adminEmail = localStorage.getItem('adminEmail');
      const token = localStorage.getItem('token');

      if (!adminEmail || !token || !employee) {
        console.error('Missing required data for API call');
        return;
      }

      const response = await axios.get(
        'https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/admin/api/attendance/email',
        {
          adminEmail: adminEmail,
          userEmail: employee.email,
        },
        {
          headers: {
            Authorization: token, // Assuming the token is a Bearer token
          },
        }
      );

      setAttendanceData(response.data || []);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [employee]);

  const filteredAttendance = attendanceData.filter((attendance) => {
    const matchesDate = selectedDate ? attendance.date === selectedDate : true;
    return matchesDate;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleReset = () => {
    setSelectedDate('');
    setPage(0);
  };

  if (!employee) {
    return (
      <Typography variant="h6" color="error" align="center">
        Employee not found
      </Typography>
    );
  }

  return (
    <div className="p-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flexGrow: 1 }}>
        <div className="flex justify-between py-5">
          <Typography variant="h4" gutterBottom>
            {employee.name}'s Attendance Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Search by Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              variant="outlined"
              sx={{ width: '250px' }}
            />
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </div>

        {loading ? (
          <Typography align="center" variant="h6">
            Loading attendance data...
          </Typography>
        ) : (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Attendance ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Punch In</TableCell>
                    <TableCell>Punch Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAttendance
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((attendance) => (
                        <TableRow key={attendance.id}>
                          <TableCell>{attendance.id}</TableCell>
                          <TableCell>{attendance.date}</TableCell>
                          <TableCell>{attendance.punchIn}</TableCell>
                          <TableCell>{attendance.punchOut}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredAttendance.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
