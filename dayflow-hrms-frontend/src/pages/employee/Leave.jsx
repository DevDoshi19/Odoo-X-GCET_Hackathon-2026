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
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Tooltip,
  Snackbar,
  CircularProgress,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  ArrowForward as ArrowForwardIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon,
  Restore as RestoreIcon,
  Visibility as VisibilityIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const EmployeeLeave = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [loading, setLoading] = useState(false)
  const [actionInProgress, setActionInProgress] = useState(null)

  // Initial leave data
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 1, 
      type: 'Paid Leave', 
      startDate: '2023-11-10', 
      endDate: '2023-11-12', 
      days: 3, 
      status: 'approved', 
      remarks: 'Family vacation',
      appliedDate: '2023-10-25',
      approvedDate: '2023-10-28',
      approvedBy: 'Sarah Wilson (HR Manager)',
      leaveBalanceBefore: 15,
      leaveBalanceAfter: 12,
    },
    { 
      id: 2, 
      type: 'Sick Leave', 
      startDate: '2023-11-15', 
      endDate: '2023-11-15', 
      days: 1, 
      status: 'approved', 
      remarks: 'Doctor appointment - Annual checkup',
      appliedDate: '2023-10-28',
      approvedDate: '2023-10-29',
      approvedBy: 'John Doe (Manager)',
      leaveBalanceBefore: 12,
      leaveBalanceAfter: 11,
    },
    { 
      id: 3, 
      type: 'Unpaid Leave', 
      startDate: '2023-11-20', 
      endDate: '2023-11-22', 
      days: 3, 
      status: 'pending', 
      remarks: 'Personal work - Home renovation',
      appliedDate: '2023-10-30',
      approvedDate: '',
      approvedBy: '',
      leaveBalanceBefore: 10,
      leaveBalanceAfter: 10,
    },
    { 
      id: 4, 
      type: 'Paid Leave', 
      startDate: '2023-10-05', 
      endDate: '2023-10-08', 
      days: 4, 
      status: 'rejected', 
      remarks: 'Tour - Personal travel',
      appliedDate: '2023-09-25',
      approvedDate: '2023-09-28',
      approvedBy: 'Sarah Wilson (HR Manager)',
      rejectReason: 'Peak work period - Request denied',
      leaveBalanceBefore: 19,
      leaveBalanceAfter: 19,
    },
  ])

  // Leave history (cancelled/withdrawn leaves)
  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 101,
      type: 'Sick Leave',
      startDate: '2023-08-10',
      endDate: '2023-08-10',
      days: 1,
      status: 'cancelled',
      remarks: 'Cancelled due to schedule change',
      appliedDate: '2023-07-25',
      cancelledDate: '2023-08-05',
      cancelledBy: 'Self',
    },
  ])

  const [formData, setFormData] = useState({
    type: 'paid',
    startDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    remarks: '',
    emergencyContact: '',
    handoverPerson: '',
    handoverNotes: '',
  })

  const leaveTypes = [
    { value: 'paid', label: 'Paid Leave', color: 'primary', maxDays: 30, requiresApproval: true },
    { value: 'sick', label: 'Sick Leave', color: 'warning', maxDays: 15, requiresApproval: false },
    { value: 'unpaid', label: 'Unpaid Leave', color: 'error', maxDays: 20, requiresApproval: true },
    { value: 'maternity', label: 'Maternity Leave', color: 'success', maxDays: 180, requiresApproval: true },
    { value: 'paternity', label: 'Paternity Leave', color: 'info', maxDays: 15, requiresApproval: true },
    { value: 'compensatory', label: 'Compensatory Off', color: 'secondary', maxDays: 5, requiresApproval: true },
  ]

  // Calculate leave balances dynamically
  const calculateLeaveBalances = () => {
    const balances = {
      paid: { total: 20, used: 0, remaining: 20, pending: 0 },
      sick: { total: 15, used: 0, remaining: 15, pending: 0 },
      unpaid: { total: 10, used: 0, remaining: 10, pending: 0 },
      maternity: { total: 180, used: 0, remaining: 180, pending: 0 },
      paternity: { total: 15, used: 0, remaining: 15, pending: 0 },
      compensatory: { total: 5, used: 0, remaining: 5, pending: 0 },
    }

    leaveRequests.forEach(leave => {
      const leaveType = leave.type.toLowerCase().split(' ')[0]
      if (balances[leaveType]) {
        if (leave.status === 'approved') {
          balances[leaveType].used += leave.days
          balances[leaveType].remaining -= leave.days
        } else if (leave.status === 'pending') {
          balances[leaveType].pending += leave.days
        }
      }
    })

    return balances
  }

  const leaveBalances = calculateLeaveBalances()

  // Calculate current leave days based on dates
  const calculateLeaveDays = (startDate, endDate) => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    return Math.abs(end.diff(start, 'day')) + 1
  }

  // Calculate overlapping leaves
  const hasOverlappingLeave = (startDate, endDate, excludeId = null) => {
    const newStart = dayjs(startDate)
    const newEnd = dayjs(endDate)
    
    return leaveRequests.some(leave => {
      if (excludeId && leave.id === excludeId) return false
      if (leave.status !== 'approved' && leave.status !== 'pending') return false
      
      const existingStart = dayjs(leave.startDate)
      const existingEnd = dayjs(leave.endDate)
      
      return (newStart.isBetween(existingStart, existingEnd, null, '[]') ||
              newEnd.isBetween(existingStart, existingEnd, null, '[]') ||
              existingStart.isBetween(newStart, newEnd, null, '[]'))
    })
  }

  // Handle form submission
  const handleSubmit = () => {
    // Validation
    if (!formData.startDate || !formData.endDate) {
      showSnackbar('Please select start and end dates', 'error')
      return
    }

    const startDate = dayjs(formData.startDate)
    const endDate = dayjs(formData.endDate)
    
    if (endDate.isBefore(startDate)) {
      showSnackbar('End date cannot be before start date', 'error')
      return
    }

    const days = calculateLeaveDays(formData.startDate, formData.endDate)
    
    // Check for overlapping leaves
    if (hasOverlappingLeave(formData.startDate, formData.endDate)) {
      showSnackbar('This leave overlaps with an existing approved/pending leave', 'error')
      return
    }

    const selectedLeaveType = leaveTypes.find(lt => lt.value === formData.type)
    if (days > selectedLeaveType.maxDays) {
      showSnackbar(`Maximum days for ${selectedLeaveType.label} is ${selectedLeaveType.maxDays}`, 'error')
      return
    }

    // Check if enough leave balance
    const leaveTypeKey = formData.type
    if (leaveBalances[leaveTypeKey].remaining - days < 0) {
      showSnackbar(`Insufficient ${selectedLeaveType.label} balance`, 'error')
      return
    }

    const newRequest = {
      id: leaveRequests.length + 1,
      type: selectedLeaveType.label,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: days,
      status: selectedLeaveType.requiresApproval ? 'pending' : 'approved',
      remarks: formData.remarks,
      emergencyContact: formData.emergencyContact,
      handoverPerson: formData.handoverPerson,
      handoverNotes: formData.handoverNotes,
      appliedDate: dayjs().format('YYYY-MM-DD'),
      approvedDate: selectedLeaveType.requiresApproval ? '' : dayjs().format('YYYY-MM-DD'),
      approvedBy: selectedLeaveType.requiresApproval ? '' : 'Auto-approved',
      leaveBalanceBefore: leaveBalances[leaveTypeKey].remaining,
      leaveBalanceAfter: leaveBalances[leaveTypeKey].remaining - days,
    }

    setLeaveRequests([newRequest, ...leaveRequests])
    
    // Reset form
    setFormData({
      type: 'paid',
      startDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      remarks: '',
      emergencyContact: '',
      handoverPerson: '',
      handoverNotes: '',
    })
    
    setOpenDialog(false)
    showSnackbar(`Leave request submitted ${selectedLeaveType.requiresApproval ? 'for approval' : 'and auto-approved'}!`, 'success')
  }

  // Handle edit leave
  const handleEditLeave = (leave) => {
    setSelectedLeave(leave)
    const leaveTypeValue = leaveTypes.find(lt => lt.label === leave.type)?.value || 'paid'
    setFormData({
      type: leaveTypeValue,
      startDate: leave.startDate,
      endDate: leave.endDate,
      remarks: leave.remarks,
      emergencyContact: leave.emergencyContact || '',
      handoverPerson: leave.handoverPerson || '',
      handoverNotes: leave.handoverNotes || '',
    })
    setOpenDialog(true)
  }

  // Handle cancel/delete leave
  const handleCancelLeave = async (leaveId) => {
    setActionInProgress(leaveId)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const leaveToCancel = leaveRequests.find(l => l.id === leaveId)
    if (leaveToCancel) {
      // Move to history
      const historyEntry = {
        ...leaveToCancel,
        id: Date.now(),
        status: 'cancelled',
        cancelledDate: dayjs().format('YYYY-MM-DD'),
        cancelledBy: 'Self',
      }
      
      setLeaveHistory(prev => [historyEntry, ...prev])
      setLeaveRequests(prev => prev.filter(l => l.id !== leaveId))
      showSnackbar('Leave request cancelled successfully', 'info')
    }
    
    setActionInProgress(null)
  }

  // Handle withdraw leave (for pending requests)
  const handleWithdrawLeave = async (leaveId) => {
    setActionInProgress(leaveId)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const leaveToWithdraw = leaveRequests.find(l => l.id === leaveId)
    if (leaveToWithdraw) {
      const historyEntry = {
        ...leaveToWithdraw,
        id: Date.now(),
        status: 'withdrawn',
        withdrawnDate: dayjs().format('YYYY-MM-DD'),
      }
      
      setLeaveHistory(prev => [historyEntry, ...prev])
      setLeaveRequests(prev => prev.filter(l => l.id !== leaveId))
      showSnackbar('Leave request withdrawn successfully', 'info')
    }
    
    setActionInProgress(null)
  }

  // Handle view leave details
  const handleViewLeave = (leave) => {
    setSelectedLeave(leave)
    setOpenViewDialog(true)
  }

  // Handle download leave application
  const handleDownloadLeave = (leave) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showSnackbar(`Leave application for ${leave.type} downloaded`, 'success')
    }, 1500)
  }

  // Handle email leave application
  const handleEmailLeave = (leave) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showSnackbar(`Leave application for ${leave.type} emailed to manager`, 'success')
    }, 2000)
  }

  // Handle print leave application
  const handlePrintLeave = (leave) => {
    window.print()
    showSnackbar(`Printing leave application for ${leave.type}`, 'info')
  }

  // Handle restore from history
  const handleRestoreLeave = (historyLeave) => {
    const restoredLeave = {
      ...historyLeave,
      id: Date.now(),
      status: 'pending',
      appliedDate: dayjs().format('YYYY-MM-DD'),
      cancelledDate: '',
      cancelledBy: '',
    }
    
    setLeaveRequests(prev => [restoredLeave, ...prev])
    setLeaveHistory(prev => prev.filter(l => l.id !== historyLeave.id))
    showSnackbar('Leave request restored and resubmitted', 'success')
  }

  // Calculate statistics
  const calculateStats = () => {
    const totalLeaves = leaveRequests.length
    const approvedLeaves = leaveRequests.filter(l => l.status === 'approved').length
    const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length
    const rejectedLeaves = leaveRequests.filter(l => l.status === 'rejected').length
    const totalDays = leaveRequests.filter(l => l.status === 'approved').reduce((sum, l) => sum + l.days, 0)
    const pendingDays = leaveRequests.filter(l => l.status === 'pending').reduce((sum, l) => sum + l.days, 0)
    
    return { totalLeaves, approvedLeaves, pendingLeaves, rejectedLeaves, totalDays, pendingDays }
  }

  const stats = calculateStats()

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'error'
      case 'cancelled': return 'secondary'
      case 'withdrawn': return 'info'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon />
      case 'pending': return <PendingIcon />
      case 'rejected': return <CancelIcon />
      case 'cancelled': return <CloseIcon />
      case 'withdrawn': return <ArrowForwardIcon />
      default: return null
    }
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const columns = [
    { 
      field: 'type', 
      headerName: 'Leave Type', 
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
        />
      ),
    },
    { 
      field: 'dateRange', 
      headerName: 'Date Range', 
      width: 200,
      valueGetter: (params) => 
        `${dayjs(params.row.startDate).format('MMM D')} - ${dayjs(params.row.endDate).format('MMM D, YYYY')}`
    },
    { 
      field: 'days', 
      headerName: 'Days', 
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {params.value} day{params.value > 1 ? 's' : ''}
        </Typography>
      ),
    },
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
    { 
      field: 'appliedDate', 
      headerName: 'Applied On', 
      width: 120,
      valueGetter: (params) => dayjs(params.row.appliedDate).format('MMM D')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton 
              size="small" 
              color="primary"
              onClick={() => handleViewLeave(params.row)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          {params.row.status === 'pending' && (
            <>
              <Tooltip title="Edit">
                <IconButton 
                  size="small" 
                  color="info"
                  onClick={() => handleEditLeave(params.row)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Withdraw Request">
                <IconButton 
                  size="small" 
                  color="warning"
                  onClick={() => handleWithdrawLeave(params.row.id)}
                  disabled={actionInProgress === params.row.id}
                >
                  {actionInProgress === params.row.id ? 
                    <CircularProgress size={16} /> : 
                    <ArrowForwardIcon fontSize="small" />
                  }
                </IconButton>
              </Tooltip>
            </>
          )}
          
          {params.row.status === 'approved' && (
            <>
              <Tooltip title="Cancel Leave">
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => handleCancelLeave(params.row.id)}
                  disabled={actionInProgress === params.row.id}
                >
                  {actionInProgress === params.row.id ? 
                    <CircularProgress size={16} /> : 
                    <DeleteIcon fontSize="small" />
                  }
                </IconButton>
              </Tooltip>
              <Tooltip title="Download">
                <IconButton 
                  size="small" 
                  color="secondary"
                  onClick={() => handleDownloadLeave(params.row)}
                  disabled={loading}
                >
                  {loading ? 
                    <CircularProgress size={16} /> : 
                    <DownloadIcon fontSize="small" />
                  }
                </IconButton>
              </Tooltip>
            </>
          )}
          
          <Tooltip title="Print">
            <IconButton 
              size="small" 
              color="default"
              onClick={() => handlePrintLeave(params.row)}
            >
              <PrintIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Email">
            <IconButton 
              size="small" 
              color="default"
              onClick={() => handleEmailLeave(params.row)}
              disabled={loading}
            >
              {loading ? 
                <CircularProgress size={16} /> : 
                <EmailIcon fontSize="small" />
              }
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Leave Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={() => setOpenHistoryDialog(true)}
          >
            History ({leaveHistory.length})
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Apply for Leave
          </Button>
        </Box>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {stats.totalLeaves}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="success.main">
                {stats.approvedLeaves}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="warning.main">
                {stats.pendingLeaves}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="error.main">
                {stats.rejectedLeaves}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rejected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {stats.totalDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Days Taken
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="warning.main">
                {stats.pendingDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Days Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Leave Balances */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {leaveTypes.map((type) => (
          <Grid item xs={12} sm={6} md={4} key={type.value}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {type.label}
                  </Typography>
                  <Chip 
                    label={`Max ${type.maxDays} days`} 
                    size="small" 
                    variant="outlined" 
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {leaveBalances[type.value]?.total || 0} days
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Used
                    </Typography>
                    <Typography variant="body2" color="error.main" sx={{ fontWeight: 600 }}>
                      {leaveBalances[type.value]?.used || 0} days
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Pending
                    </Typography>
                    <Typography variant="body2" color="warning.main" sx={{ fontWeight: 600 }}>
                      {leaveBalances[type.value]?.pending || 0} days
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Available
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                      {leaveBalances[type.value]?.remaining || 0} days
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Approval: {type.requiresApproval ? 'Required' : 'Auto'}
                  </Typography>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, type: type.value }))
                      setOpenDialog(true)
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Leave Requests Table */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            My Leave Requests ({leaveRequests.length})
          </Typography>
          <Button
            startIcon={<RefreshIcon />}
            onClick={() => showSnackbar('Leave requests refreshed', 'info')}
          >
            Refresh
          </Button>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={leaveRequests}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>

      {/* Upcoming Leaves */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Upcoming Approved Leaves
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave Type</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Handover To</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests
                .filter(leave => leave.status === 'approved' && dayjs(leave.startDate).isAfter(dayjs()))
                .map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>
                      <Chip label={leave.type} size="small" />
                    </TableCell>
                    <TableCell>
                      {dayjs(leave.startDate).format('MMM D')} - {dayjs(leave.endDate).format('MMM D, YYYY')}
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        {leave.days} day{leave.days > 1 ? 's' : ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Approved"
                        color="success"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {leave.handoverPerson || 'Not assigned'}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Cancel">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleCancelLeave(leave.id)}
                          disabled={actionInProgress === leave.id}
                        >
                          {actionInProgress === leave.id ? 
                            <CircularProgress size={16} /> : 
                            <DeleteIcon fontSize="small" />
                          }
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewLeave(leave)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              {leaveRequests.filter(leave => leave.status === 'approved' && dayjs(leave.startDate).isAfter(dayjs())).length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No upcoming approved leaves
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Apply Leave Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Apply for Leave</Typography>
            {selectedLeave && (
              <Chip label="Editing" color="warning" size="small" />
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Leave Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Leave Type"
                  onChange={(e) => {
                    const selectedType = leaveTypes.find(lt => lt.value === e.target.value)
                    setFormData({ ...formData, type: e.target.value })
                    // Update max days based on leave type
                    if (selectedType) {
                      const maxEndDate = dayjs(formData.startDate).add(selectedType.maxDays - 1, 'day').format('YYYY-MM-DD')
                      if (dayjs(formData.endDate).isAfter(maxEndDate)) {
                        setFormData(prev => ({ ...prev, endDate: maxEndDate }))
                      }
                    }
                  }}
                >
                  {leaveTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label={option.label} size="small" variant="outlined" />
                        <Typography variant="caption" color="text.secondary">
                          ({leaveBalances[option.value]?.remaining || 0} days available)
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Alert severity="info" variant="outlined">
                Available balance: {leaveBalances[formData.type]?.remaining || 0} days
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={(e) => {
                  const newStartDate = e.target.value
                  setFormData({ ...formData, startDate: newStartDate })
                  // Auto-adjust end date if it's before start date
                  if (dayjs(formData.endDate).isBefore(newStartDate)) {
                    setFormData(prev => ({ ...prev, endDate: newStartDate }))
                  }
                }}
                inputProps={{ min: dayjs().format('YYYY-MM-DD') }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                inputProps={{ 
                  min: formData.startDate,
                  max: dayjs(formData.startDate).add(leaveTypes.find(lt => lt.value === formData.type)?.maxDays || 30, 'day').format('YYYY-MM-DD')
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Leave Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Emergency Contact"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="Contact number during leave"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Handover Person"
                      value={formData.handoverPerson}
                      onChange={(e) => setFormData({ ...formData, handoverPerson: e.target.value })}
                      placeholder="Person handling your work"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Remarks"
                      multiline
                      rows={3}
                      value={formData.remarks}
                      onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                      placeholder="Please provide details about your leave request"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Handover Notes"
                      multiline
                      rows={2}
                      value={formData.handoverNotes}
                      onChange={(e) => setFormData({ ...formData, handoverNotes: e.target.value })}
                      placeholder="Important notes for handover"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Leave Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Selected Dates
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formData.startDate && formData.endDate ? 
                          `${dayjs(formData.startDate).format('MMM D, YYYY')} - ${dayjs(formData.endDate).format('MMM D, YYYY')}` : 
                          'Select dates'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Total Days
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formData.startDate && formData.endDate ? 
                          `${calculateLeaveDays(formData.startDate, formData.endDate)} day${calculateLeaveDays(formData.startDate, formData.endDate) > 1 ? 's' : ''}` : 
                          '0 days'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Alert 
                        severity={hasOverlappingLeave(formData.startDate, formData.endDate, selectedLeave?.id) ? "error" : "success"}
                        icon={hasOverlappingLeave(formData.startDate, formData.endDate, selectedLeave?.id) ? <WarningIcon /> : <CheckCircleIcon />}
                      >
                        {hasOverlappingLeave(formData.startDate, formData.endDate, selectedLeave?.id) 
                          ? "Warning: This leave overlaps with existing approved/pending leave"
                          : "No overlapping leaves detected"}
                      </Alert>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenDialog(false)
            setSelectedLeave(null)
            setFormData({
              type: 'paid',
              startDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
              endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
              remarks: '',
              emergencyContact: '',
              handoverPerson: '',
              handoverNotes: '',
            })
          }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            startIcon={selectedLeave ? <EditIcon /> : <SendIcon />}
          >
            {selectedLeave ? 'Update Request' : 'Submit Request'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Leave Details Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="sm" fullWidth>
        {selectedLeave && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Leave Details</Typography>
                <Chip
                  icon={getStatusIcon(selectedLeave.status)}
                  label={selectedLeave.status.toUpperCase()}
                  color={getStatusColor(selectedLeave.status)}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {selectedLeave.type}
                        </Typography>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                          {selectedLeave.days} day{selectedLeave.days > 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Date Range
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {dayjs(selectedLeave.startDate).format('MMM D, YYYY')} - {dayjs(selectedLeave.endDate).format('MMM D, YYYY')}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Applied On
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {dayjs(selectedLeave.appliedDate).format('MMM D, YYYY')}
                      </Typography>
                    </Grid>
                    
                    {selectedLeave.approvedDate && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary">
                          Approved On
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {dayjs(selectedLeave.approvedDate).format('MMM D, YYYY')}
                        </Typography>
                      </Grid>
                    )}
                    
                    {selectedLeave.approvedBy && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary">
                          Approved By
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedLeave.approvedBy}
                        </Typography>
                      </Grid>
                    )}
                    
                    {selectedLeave.rejectReason && (
                      <Grid item xs={12}>
                        <Alert severity="error" sx={{ mt: 2 }}>
                          <Typography variant="subtitle2">Rejection Reason</Typography>
                          <Typography variant="body2">{selectedLeave.rejectReason}</Typography>
                        </Alert>
                      </Grid>
                    )}
                    
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">
                        Remarks
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {selectedLeave.remarks}
                      </Typography>
                    </Grid>
                    
                    {selectedLeave.handoverPerson && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          Handover To
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedLeave.handoverPerson}
                        </Typography>
                        {selectedLeave.handoverNotes && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {selectedLeave.handoverNotes}
                          </Typography>
                        )}
                      </Grid>
                    )}
                    
                    {selectedLeave.emergencyContact && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          Emergency Contact
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedLeave.emergencyContact}
                        </Typography>
                      </Grid>
                    )}
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Leave Balance Before
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {selectedLeave.leaveBalanceBefore} days
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Leave Balance After
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {selectedLeave.leaveBalanceAfter} days
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
              {selectedLeave.status === 'pending' && (
                <>
                  <Button 
                    variant="outlined" 
                    color="warning"
                    startIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      handleWithdrawLeave(selectedLeave.id)
                      setOpenViewDialog(false)
                    }}
                    disabled={actionInProgress === selectedLeave.id}
                  >
                    Withdraw
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setOpenViewDialog(false)
                      handleEditLeave(selectedLeave)
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
              {selectedLeave.status === 'approved' && (
                <Button 
                  variant="outlined" 
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    handleCancelLeave(selectedLeave.id)
                    setOpenViewDialog(false)
                  }}
                  disabled={actionInProgress === selectedLeave.id}
                >
                  Cancel Leave
                </Button>
              )}
              <Button 
                variant="contained" 
                startIcon={<PrintIcon />}
                onClick={() => handlePrintLeave(selectedLeave)}
              >
                Print
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Leave History Dialog */}
      <Dialog open={openHistoryDialog} onClose={() => setOpenHistoryDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Leave History</Typography>
            <Chip label={`${leaveHistory.length} records`} size="small" variant="outlined" />
          </Box>
        </DialogTitle>
        <DialogContent>
          {leaveHistory.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <HistoryIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography color="text.secondary">No history records</Typography>
            </Box>
          ) : (
            <List>
              {leaveHistory.map((history) => (
                <ListItem
                  key={history.id}
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    py: 2,
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: getStatusColor(history.status) + '.light' }}>
                      {getStatusIcon(history.status)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {history.type}
                        </Typography>
                        <Chip
                          label={history.status}
                          color={getStatusColor(history.status)}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {dayjs(history.startDate).format('MMM D')} - {dayjs(history.endDate).format('MMM D, YYYY')} • {history.days} day{history.days > 1 ? 's' : ''}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {history.remarks}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Applied: {dayjs(history.appliedDate).format('MMM D, YYYY')} • 
                          {history.cancelledDate && ` Cancelled: ${dayjs(history.cancelledDate).format('MMM D, YYYY')}`}
                        </Typography>
                      </>
                    }
                  />
                  <Tooltip title="Restore and Resubmit">
                    <IconButton 
                      color="primary"
                      onClick={() => handleRestoreLeave(history)}
                    >
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHistoryDialog(false)}>Close</Button>
          {leaveHistory.length > 0 && (
            <Button 
              variant="outlined" 
              startIcon={<DeleteIcon />}
              onClick={() => {
                setLeaveHistory([])
                showSnackbar('History cleared', 'info')
              }}
            >
              Clear History
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default EmployeeLeave