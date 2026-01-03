import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  LinearProgress,
} from '@mui/material'
import {
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Refresh as RefreshIcon,
  CalendarMonth as CalendarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'

const EmployeeAttendance = () => {
  const [attendance, setAttendance] = useState([])
  const [todayStatus, setTodayStatus] = useState(null)
  const [openCheckIn, setOpenCheckIn] = useState(false)
  const [openCheckOut, setOpenCheckOut] = useState(false)
  const [remarks, setRemarks] = useState('')

  useEffect(() => {
    // Mock data
    const mockAttendance = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const statuses = ['present', 'absent', 'half-day', 'leave']
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      
      return {
        id: i + 1,
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        checkIn: status === 'present' || status === 'half-day' ? '09:15' : null,
        checkOut: status === 'present' ? '18:30' : null,
        status: status,
        workingHours: status === 'present' ? 8.5 : status === 'half-day' ? 4 : 0,
        remarks: status === 'leave' ? 'Sick leave' : '',
      }
    })
    
    setAttendance(mockAttendance)
    
    // Set today's status
    const today = new Date().toISOString().split('T')[0]
    const todayRecord = mockAttendance.find(record => record.date === today)
    setTodayStatus(todayRecord?.status || 'not-checked')
  }, [])

  const handleCheckIn = () => {
    const today = new Date().toISOString().split('T')[0]
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    const newRecord = {
      id: attendance.length + 1,
      date: today,
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      checkIn: time,
      checkOut: null,
      status: 'present',
      workingHours: 0,
      remarks: remarks,
    }
    
    setAttendance([newRecord, ...attendance])
    setTodayStatus('present')
    setRemarks('')
    setOpenCheckIn(false)
  }

  const handleCheckOut = () => {
    const today = new Date().toISOString().split('T')[0]
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    setAttendance(prev => prev.map(record => {
      if (record.date === today) {
        const checkInTime = record.checkIn ? new Date(`1970-01-01T${record.checkIn}:00`) : new Date()
        const checkOutTime = new Date(`1970-01-01T${time}:00`)
        const diffMs = checkOutTime - checkInTime
        const hours = diffMs / (1000 * 60 * 60)
        
        return {
          ...record,
          checkOut: time,
          workingHours: Math.round(hours * 10) / 10,
          remarks: remarks,
        }
      }
      return record
    }))
    
    setRemarks('')
    setOpenCheckOut(false)
  }

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
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'day', headerName: 'Day', width: 100 },
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
          variant="outlined"
          size="small"
        />
      ),
    },
    { field: 'workingHours', headerName: 'Hours', width: 100 },
    { field: 'remarks', headerName: 'Remarks', flex: 1 },
  ]

  const stats = {
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    leave: attendance.filter(a => a.status === 'leave').length,
    halfDay: attendance.filter(a => a.status === 'half-day').length,
    totalHours: attendance.reduce((sum, a) => sum + a.workingHours, 0).toFixed(1),
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Attendance
      </Typography>

      {/* Today's Status Card */}
      <Card sx={{ mb: 4, bgcolor: 'primary.light', color: 'white' }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Today's Status: {todayStatus?.toUpperCase() || 'NOT CHECKED'}
              </Typography>
              <Typography variant="body1">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Grid>
            <Grid item>
              {todayStatus === 'not-checked' ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<ArrowUpIcon />}
                  onClick={() => setOpenCheckIn(true)}
                >
                  Check In
                </Button>
              ) : todayStatus === 'present' && !attendance.find(a => a.date === new Date().toISOString().split('T')[0])?.checkOut ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<ArrowDownIcon />}
                  onClick={() => setOpenCheckOut(true)}
                >
                  Check Out
                </Button>
              ) : (
                <Chip
                  icon={getStatusIcon(todayStatus)}
                  label={todayStatus}
                  sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Present</Typography>
              </Box>
              <Typography variant="h4">{stats.present}</Typography>
              <LinearProgress
                variant="determinate"
                value={(stats.present / attendance.length) * 100}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CancelIcon color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Absent</Typography>
              </Box>
              <Typography variant="h4">{stats.absent}</Typography>
              <LinearProgress
                variant="determinate"
                value={(stats.absent / attendance.length) * 100}
                sx={{ mt: 1 }}
                color="error"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarIcon color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Leave</Typography>
              </Box>
              <Typography variant="h4">{stats.leave}</Typography>
              <LinearProgress
                variant="determinate"
                value={(stats.leave / attendance.length) * 100}
                sx={{ mt: 1 }}
                color="info"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Hours</Typography>
              </Box>
              <Typography variant="h4">{stats.totalHours}</Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Attendance History
          </Typography>
          <Button startIcon={<RefreshIcon />}>Refresh</Button>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={attendance}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>

      {/* Check In Dialog */}
      <Dialog open={openCheckIn} onClose={() => setOpenCheckIn(false)}>
        <DialogTitle>Check In</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Current time: {new Date().toLocaleTimeString()}
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Remarks (Optional)"
            multiline
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckIn(false)}>Cancel</Button>
          <Button onClick={handleCheckIn} variant="contained">
            Confirm Check In
          </Button>
        </DialogActions>
      </Dialog>

      {/* Check Out Dialog */}
      <Dialog open={openCheckOut} onClose={() => setOpenCheckOut(false)}>
        <DialogTitle>Check Out</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Current time: {new Date().toLocaleTimeString()}
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Remarks (Optional)"
            multiline
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckOut(false)}>Cancel</Button>
          <Button onClick={handleCheckOut} variant="contained">
            Confirm Check Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EmployeeAttendance