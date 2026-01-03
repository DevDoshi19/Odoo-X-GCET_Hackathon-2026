import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  LinearProgress,
  Button,
  Chip,
  Alert,
} from '@mui/material'
import {
  People as PeopleIcon,
  CalendarMonth as CalendarIcon,
  Assignment as LeaveIcon,
  AccountBalanceWallet as SalaryIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  Pending as PendingIcon,
  ThumbUp as ApproveIcon,
  ThumbDown as RejectIcon,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    pendingLeaves: 0,
    payrollPending: 0,
  })

  const [recentActivities, setRecentActivities] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [actionHistory, setActionHistory] = useState([])

  useEffect(() => {
    // Mock data
    setStats({
      totalEmployees: 156,
      presentToday: 142,
      pendingLeaves: 8,
      payrollPending: 3,
    })

    setRecentActivities([
      { id: 1, employee: 'John Doe', action: 'Leave Request', time: '2 hours ago', type: 'leave' },
      { id: 2, employee: 'Jane Smith', action: 'Check In Late', time: '3 hours ago', type: 'attendance' },
      { id: 3, employee: 'Mike Johnson', action: 'Profile Updated', time: '5 hours ago', type: 'profile' },
      { id: 4, employee: 'Sarah Wilson', action: 'Salary Query', time: '1 day ago', type: 'salary' },
    ])

    // Initial pending requests
    setPendingRequests([
      { 
        id: 1, 
        employee: 'John Doe', 
        type: 'Paid Leave', 
        dates: 'Nov 10-12', 
        days: 3,
        status: 'pending',
        requestDate: '2023-11-09',
        employeeId: 'EMP001'
      },
      { 
        id: 2, 
        employee: 'Jane Smith', 
        type: 'Sick Leave', 
        dates: 'Nov 15', 
        days: 1,
        status: 'pending',
        requestDate: '2023-11-09',
        employeeId: 'EMP002'
      },
      { 
        id: 3, 
        employee: 'Robert Brown', 
        type: 'Unpaid Leave', 
        dates: 'Nov 20-22', 
        days: 3,
        status: 'pending',
        requestDate: '2023-11-08',
        employeeId: 'EMP003'
      },
      { 
        id: 4, 
        employee: 'Sarah Wilson', 
        type: 'Annual Leave', 
        dates: 'Nov 25-28', 
        days: 4,
        status: 'pending',
        requestDate: '2023-11-07',
        employeeId: 'EMP004'
      },
    ])
  }, [])

  const handleApprove = (requestId) => {
    // Find the request
    const requestToApprove = pendingRequests.find(req => req.id === requestId)
    if (!requestToApprove) return

    // Update the request status
    const updatedRequests = pendingRequests.filter(req => req.id !== requestId)
    setPendingRequests(updatedRequests)

    // Update stats
    setStats(prev => ({
      ...prev,
      pendingLeaves: prev.pendingLeaves - 1
    }))

    // Add to action history
    const newAction = {
      id: Date.now(),
      employee: requestToApprove.employee,
      action: 'Leave Approved',
      time: 'Just now',
      type: 'approval',
      details: `${requestToApprove.type} (${requestToApprove.dates})`,
    }
    
    setActionHistory(prev => [newAction, ...prev])
    
    // Add to recent activities
    setRecentActivities(prev => [{
      id: Date.now(),
      employee: requestToApprove.employee,
      action: `Leave Approved: ${requestToApprove.type}`,
      time: 'Just now',
      type: 'approval',
    }, ...prev])

    // Show success message (in real app, you might want to use a toast/snackbar)
    console.log(`Approved leave request for ${requestToApprove.employee}`)
  }

  const handleReject = (requestId) => {
    // Find the request
    const requestToReject = pendingRequests.find(req => req.id === requestId)
    if (!requestToReject) return

    // Update the request status
    const updatedRequests = pendingRequests.filter(req => req.id !== requestId)
    setPendingRequests(updatedRequests)

    // Update stats
    setStats(prev => ({
      ...prev,
      pendingLeaves: prev.pendingLeaves - 1
    }))

    // Add to action history
    const newAction = {
      id: Date.now(),
      employee: requestToReject.employee,
      action: 'Leave Rejected',
      time: 'Just now',
      type: 'rejection',
      details: `${requestToReject.type} (${requestToReject.dates})`,
    }
    
    setActionHistory(prev => [newAction, ...prev])
    
    // Add to recent activities
    setRecentActivities(prev => [{
      id: Date.now(),
      employee: requestToReject.employee,
      action: `Leave Rejected: ${requestToReject.type}`,
      time: 'Just now',
      type: 'rejection',
    }, ...prev])

    // Show rejection message
    console.log(`Rejected leave request for ${requestToReject.employee}`)
  }

  const handleApproveAll = () => {
    if (pendingRequests.length === 0) return

    // Store all requests for history
    const allRequests = [...pendingRequests]
    
    // Clear all pending requests
    setPendingRequests([])

    // Update stats
    setStats(prev => ({
      ...prev,
      pendingLeaves: 0
    }))

    // Add batch action to history
    const batchAction = {
      id: Date.now(),
      employee: 'Multiple Employees',
      action: 'Batch Leave Approval',
      time: 'Just now',
      type: 'batch-approval',
      details: `Approved ${allRequests.length} leave requests`,
    }
    
    setActionHistory(prev => [batchAction, ...prev])
    
    // Add to recent activities
    allRequests.forEach(request => {
      setRecentActivities(prev => [{
        id: Date.now() + Math.random(),
        employee: request.employee,
        action: `Leave Approved: ${request.type}`,
        time: 'Just now',
        type: 'approval',
      }, ...prev])
    })

    console.log(`Approved all ${allRequests.length} leave requests`)
  }

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: <PeopleIcon />,
      color: 'primary.main',
      progress: 100,
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: <CalendarIcon />,
      color: 'success.main',
      progress: (stats.presentToday / stats.totalEmployees) * 100,
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      icon: <LeaveIcon />,
      color: 'warning.main',
      progress: (stats.pendingLeaves / 20) * 100,
    },
    {
      title: 'Payroll Pending',
      value: stats.payrollPending,
      icon: <SalaryIcon />,
      color: 'error.main',
      progress: (stats.payrollPending / 10) * 100,
    },
  ]

  const columns = [
    { field: 'employee', headerName: 'Employee', width: 150 },
    { field: 'action', headerName: 'Action', width: 200 },
    { field: 'time', headerName: 'Time', width: 120 },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => {
        const typeColor = {
          'leave': 'primary',
          'attendance': 'warning',
          'profile': 'info',
          'salary': 'success',
          'approval': 'success',
          'rejection': 'error',
        }
        
        return (
          <Chip
            label={params.value}
            size="small"
            color={typeColor[params.value] || 'default'}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      },
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success'
      case 'rejected': return 'error'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon />
      case 'rejected': return <WarningIcon />
      case 'pending': return <PendingIcon />
      default: return <PendingIcon />
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Admin Dashboard
      </Typography>

      {/* Action History Alert */}
      {actionHistory.length > 0 && (
        <Alert 
          severity="info" 
          sx={{ mb: 3 }}
          onClose={() => setActionHistory([])}
        >
          Recent actions: {actionHistory.slice(0, 2).map(action => 
            `${action.employee} - ${action.action}`
          ).join(', ')}
          {actionHistory.length > 2 && ` and ${actionHistory.length - 2} more`}
        </Alert>
      )}

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 1,
                      borderRadius: 2,
                      bgcolor: `${stat.color}15`,
                      color: stat.color,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.progress}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Pending Approvals */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Pending Approvals
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {pendingRequests.length > 0 && (
                  <Button 
                    variant="contained" 
                    color="success"
                    onClick={handleApproveAll}
                    startIcon={<CheckCircleIcon />}
                  >
                    Approve All ({pendingRequests.length})
                  </Button>
                )}
                <Button endIcon={<ArrowForwardIcon />}>View All</Button>
              </Box>
            </Box>
            
            {pendingRequests.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No Pending Approvals
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All requests have been processed
                </Typography>
              </Box>
            ) : (
              <List>
                {pendingRequests.map((request) => (
                  <ListItem
                    key={request.id}
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 0 },
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'warning.light', width: 40, height: 40 }}>
                        <PendingIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography fontWeight={500}>
                            {request.employee}
                          </Typography>
                          <Chip
                            label={request.status}
                            size="small"
                            color={getStatusColor(request.status)}
                            icon={getStatusIcon(request.status)}
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {request.type} • {request.dates} ({request.days} days)
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Requested: {request.requestDate} • ID: {request.employeeId}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        onClick={() => handleApprove(request.id)}
                        size="small" 
                        variant="contained" 
                        color="success"
                        startIcon={<ApproveIcon />}
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(request.id)}
                        size="small" 
                        variant="outlined" 
                        color="error"
                        startIcon={<RejectIcon />}
                      >
                        Reject
                      </Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Activities
              </Typography>
              <Button endIcon={<ArrowForwardIcon />}>View All</Button>
            </Box>
            <Box sx={{ height: 300, width: '100%' }}>
              <DataGrid
                rows={recentActivities}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[4]}
                disableSelectionOnClick
                sx={{ border: 0 }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Quick Stats
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={`${pendingRequests.length} pending`}
                  color="warning"
                  size="small"
                />
                <Chip
                  label={`${actionHistory.filter(a => a.type === 'approval').length} approved`}
                  color="success"
                  size="small"
                />
                <Chip
                  label={`${actionHistory.filter(a => a.type === 'rejection').length} rejected`}
                  color="error"
                  size="small"
                />
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.light', color: 'success.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                    <CheckCircleIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    92%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Attendance Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                    <TrendingUpIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    15%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Growth This Month
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                    <WarningIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {stats.pendingLeaves}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Approvals
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Avatar sx={{ bgcolor: 'info.light', color: 'info.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                    <NotificationsIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {recentActivities.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Activities
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard