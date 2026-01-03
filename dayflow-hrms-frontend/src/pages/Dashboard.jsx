import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material'
import {
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
  Assignment as LeaveIcon,
  AccountBalanceWallet as SalaryIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('hrms_user') || '{}')
    setUser(userData)
  }, [])

  const quickActions = [
    {
      title: 'Check In/Out',
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      description: 'Mark your attendance',
      action: () => navigate('/attendance'),
      color: 'primary.main',
    },
    {
      title: 'Apply Leave',
      icon: <LeaveIcon sx={{ fontSize: 40 }} />,
      description: 'Submit leave request',
      action: () => navigate('/leave'),
      color: 'secondary.main',
    },
    {
      title: 'View Salary',
      icon: <SalaryIcon sx={{ fontSize: 40 }} />,
      description: 'Check salary details',
      action: () => navigate('/salary'),
      color: 'success.main',
    },
    {
      title: 'Update Profile',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      description: 'Edit personal information',
      action: () => navigate('/profile'),
      color: 'warning.main',
    },
  ]

  const recentActivities = [
    { id: 1, text: 'Leave request submitted', time: '2 hours ago', type: 'leave' },
    { id: 2, text: 'Attendance marked - Check In', time: 'Yesterday', type: 'attendance' },
    { id: 3, text: 'Salary slip generated', time: '3 days ago', type: 'salary' },
    { id: 4, text: 'Profile updated', time: '1 week ago', type: 'profile' },
  ]

  const stats = [
    { label: 'Attendance This Month', value: '24/26', progress: 92 },
    { label: 'Leave Balance', value: '12 days', progress: 60 },
    { label: 'Projects Completed', value: '8', progress: 80 },
    { label: 'Tasks Pending', value: '3', progress: 25 },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome back, {user?.firstName || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your HR activities today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stat.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.progress}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                },
              }}
              onClick={action.action}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: 3,
                    bgcolor: `${action.color}15`,
                    color: action.color,
                    mb: 2,
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <Button endIcon={<ArrowForwardIcon />}>View All</Button>
            </Box>
            <List>
              {recentActivities.map((activity) => (
                <ListItem
                  key={activity.id}
                  sx={{
                    px: 0,
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 0 },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40 }}>
                      {activity.type === 'leave' && <LeaveIcon />}
                      {activity.type === 'attendance' && <CalendarIcon />}
                      {activity.type === 'salary' && <SalaryIcon />}
                      {activity.type === 'profile' && <PersonIcon />}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.text}
                    secondary={activity.time}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Chip
                    label={activity.type}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Notifications
              </Typography>
            </Box>
            <List>
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Leave Approved"
                  secondary="Your sick leave for Oct 20 has been approved"
                />
              </ListItem>
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemIcon>
                  <AccessTimeIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Attendance Alert"
                  secondary="Remember to check in by 10:00 AM"
                />
              </ListItem>
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemIcon>
                  <TrendingUpIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Salary Updated"
                  secondary="November salary has been processed"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard