import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';


const AttendanceManagement = () => {
  const [filter, setFilter] = useState('all')

  const attendanceData = Array.from({ length: 50 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const statuses = ['present', 'absent', 'half-day', 'leave']
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    
    return {
      id: i + 1,
      employee: `Employee ${i + 1}`,
      employeeId: `EMP${String(i + 1).padStart(3, '0')}`,
      date: date.toISOString().split('T')[0],
      checkIn: status === 'present' || status === 'half-day' ? '09:15' : null,
      checkOut: status === 'present' ? '18:30' : null,
      status: status,
      department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
    }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'success'
      case 'absent': return 'error'
      case 'half-day': return 'warning'
      case 'leave': return 'info'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircleIcon />
      case 'absent': return <CancelIcon />
      case 'half-day': return <AccessTimeIcon />
      case 'leave': return <CalendarIcon />
      default: return null
    }
  }

  const columns = [
    { field: 'employee', headerName: 'Employee', width: 180 },
    { field: 'employeeId', headerName: 'ID', width: 100 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'checkIn', headerName: 'Check In', width: 120 },
    { field: 'checkOut', headerName: 'Check Out', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          icon={getStatusIcon(params.value)}
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    { field: 'department', headerName: 'Department', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: () => (
        <Tooltip title="Edit Attendance">
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ]

  const filteredData = filter === 'all' 
    ? attendanceData 
    : attendanceData.filter(item => item.status === filter)

  const stats = {
    present: attendanceData.filter(a => a.status === 'present').length,
    absent: attendanceData.filter(a => a.status === 'absent').length,
    leave: attendanceData.filter(a => a.status === 'leave').length,
    halfDay: attendanceData.filter(a => a.status === 'half-day').length,
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Attendance Management
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(stats).map(([key, value]) => (
          <Grid item xs={6} sm={3} key={key}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                  {value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search employees..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Select Date"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={filter}
                label="Status Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="present">Present</MenuItem>
                <MenuItem value="absent">Absent</MenuItem>
                <MenuItem value="half-day">Half Day</MenuItem>
                <MenuItem value="leave">Leave</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Attendance Records
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button startIcon={<FilterIcon />} variant="outlined">
            More Filters
          </Button>
          <Button startIcon={<DownloadIcon />} variant="outlined">
            Export
          </Button>
          <Button startIcon={<RefreshIcon />} variant="contained">
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Attendance Table */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default AttendanceManagement