import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
  Paper,
  ListItemAvatar,
  Button,
  Chip,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography as MuiTypography,
  Grid,
  Alert,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
  Assignment as LeaveIcon,
  AccountBalanceWallet as SalaryIcon,
  People as PeopleIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Email as EmailIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import dayjs from 'dayjs'

const drawerWidth = 240
const collapsedDrawerWidth = 70

// Mock notifications data (in real app, this would come from API)
const mockNotifications = [
  {
    id: 1,
    type: 'payslip',
    title: 'Payslip Available',
    message: 'Your payslip for November 2023 is now available',
    date: '2023-11-05 14:30',
    read: false,
    amount: '₹60,000',
    month: 'November 2023',
    employeeId: 'EMP001',
  },
  {
    id: 2,
    type: 'payslip',
    title: 'Payslip Sent',
    message: 'Payslip for October 2023 has been emailed to you',
    date: '2023-10-05 10:15',
    read: true,
    amount: '₹59,500',
    month: 'October 2023',
    employeeId: 'EMP001',
  },
  {
    id: 3,
    type: 'payslip',
    title: 'Salary Credited',
    message: 'Your salary has been credited to your bank account',
    date: '2023-11-05 09:00',
    read: false,
    amount: '₹60,000',
    month: 'November 2023',
    employeeId: 'EMP001',
  },
  {
    id: 4,
    type: 'leave',
    title: 'Leave Approved',
    message: 'Your leave request for Nov 10-12 has been approved',
    date: '2023-10-30 16:45',
    read: true,
  },
  {
    id: 5,
    type: 'attendance',
    title: 'Attendance Regularized',
    message: 'Your attendance for Nov 3 has been regularized',
    date: '2023-11-04 11:20',
    read: false,
  },
]

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedPayslip, setSelectedPayslip] = useState(null)
  const [openPayslipDialog, setOpenPayslipDialog] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const user = JSON.parse(localStorage.getItem('hrms_user') || '{}')

  useEffect(() => {
    // In real app, you would fetch notifications from API
    // Simulate periodic updates
    const interval = setInterval(() => {
      // Check for new payslips (simulated)
      if (Math.random() > 0.8) {
        const newNotification = {
          id: Date.now(),
          type: 'payslip',
          title: 'Payslip Available',
          message: `Your payslip for ${dayjs().format('MMMM YYYY')} is now available`,
          date: dayjs().format('YYYY-MM-DD HH:mm'),
          read: false,
          amount: `₹${Math.floor(Math.random() * 20000) + 50000}`,
          month: dayjs().format('MMMM YYYY'),
          employeeId: user.employeeId || 'EMP001',
        }
        setNotifications(prev => [newNotification, ...prev])
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [user.employeeId])

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Attendance', icon: <CalendarIcon />, path: '/attendance' },
    { text: 'Leave', icon: <LeaveIcon />, path: '/leave' },
    { text: 'Salary', icon: <SalaryIcon />, path: '/salary' },
  ]

  const adminMenuItems = [
    { text: 'Admin Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Employees', icon: <PeopleIcon />, path: '/admin/employees' },
    { text: 'Attendance', icon: <CalendarIcon />, path: '/admin/attendance' },
    { text: 'Leave Management', icon: <LeaveIcon />, path: '/admin/leave' },
    { text: 'Payroll', icon: <SalaryIcon />, path: '/admin/payroll' },
    { text: 'Reports', icon: <ChartIcon />, path: '/admin/reports' },
  ]

  const currentMenuItems = user.role === 'admin' ? adminMenuItems : menuItems

  // Toggle mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Toggle desktop sidebar collapse/expand
  const handleDesktopDrawerToggle = () => {
    setDesktopCollapsed(!desktopCollapsed)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null)
  }

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
    handleNotificationClose()
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payslip':
        return <MoneyIcon color="success" />;
      case 'leave':
        return <LeaveIcon color="info" />;
      case 'attendance':
        return <CalendarIcon color="warning" />;
      default:
        return <NotificationsIcon />;
    }
  }

  const handleViewPayslip = (notification) => {
    setSelectedPayslip(notification)
    setOpenPayslipDialog(true)
    markAsRead(notification.id)
    handleNotificationClose()
  }

  const handleDownloadPayslip = () => {
    if (selectedPayslip) {
      // Simulate download
      alert(`Downloading payslip for ${selectedPayslip.month}...`)
      // In real app, you would trigger actual download
      setOpenPayslipDialog(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('hrms_token')
    localStorage.removeItem('hrms_user')
    navigate('/login')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Drawer content for mobile
  const mobileDrawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
          Dayflow HRMS
        </Typography>
        <IconButton onClick={handleDrawerToggle} size="small">
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2 }}>
        {currentMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path)
                setMobileOpen(false) // Close mobile drawer after navigation
              }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  // Drawer content for desktop (collapsible)
  const desktopDrawer = (
    <div>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: desktopCollapsed ? 'center' : 'space-between', 
        px: desktopCollapsed ? 1 : 2,
        minHeight: '64px'
      }}>
        {!desktopCollapsed && (
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            Dayflow HRMS
          </Typography>
        )}
        <IconButton 
          onClick={handleDesktopDrawerToggle} 
          size="small"
          sx={{ 
            ml: desktopCollapsed ? 0 : 'auto',
            transform: desktopCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        >
          {desktopCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ px: desktopCollapsed ? 1 : 2 }}>
        {currentMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Tooltip title={desktopCollapsed ? item.text : ''} placement="right">
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  justifyContent: desktopCollapsed ? 'center' : 'flex-start',
                  px: desktopCollapsed ? 2 : 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: desktopCollapsed ? 0 : 40,
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </ListItemIcon>
                {!desktopCollapsed && (
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem'
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { 
            xs: '100%',
            sm: `calc(100% - ${desktopCollapsed ? collapsedDrawerWidth : drawerWidth}px)` 
          },
          ml: { sm: `${desktopCollapsed ? collapsedDrawerWidth : drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 600 }}>
            {currentMenuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotificationClick}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  width: 380,
                  maxHeight: 500,
                  mt: 1.5,
                },
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {unreadCount > 0 && (
                    <Button size="small" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                  <IconButton size="small" onClick={clearAllNotifications}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {notifications.length === 0 ? (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <NotificationsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                    <Typography color="text.secondary">No notifications</Typography>
                  </Box>
                ) : (
                  notifications.map((notification) => (
                    <MenuItem
                      key={notification.id}
                      onClick={() => {
                        if (notification.type === 'payslip') {
                          handleViewPayslip(notification)
                        } else {
                          markAsRead(notification.id)
                          handleNotificationClose()
                        }
                      }}
                      sx={{
                        py: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: notification.read ? 'transparent' : 'action.hover',
                        '&:hover': {
                          backgroundColor: 'action.selected',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: notification.read ? 'grey.300' : 'primary.light' }}>
                          {getNotificationIcon(notification.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                              {notification.title}
                            </Typography>
                            <Chip
                              label={dayjs(notification.date).format('MMM D')}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {notification.message}
                            </Typography>
                            {notification.type === 'payslip' && (
                              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                  icon={<CheckCircleIcon />}
                                  label={notification.amount}
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {notification.month}
                                </Typography>
                              </Box>
                            )}
                          </>
                        }
                      />
                    </MenuItem>
                  ))
                )}
              </Box>
              {notifications.length > 0 && (
                <>
                  <Divider />
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Button 
                      fullWidth 
                      onClick={() => {
                        handleNotificationClose()
                        navigate('/salary')
                      }}
                      startIcon={<VisibilityIcon />}
                    >
                      View All Salary Details
                    </Button>
                  </Box>
                </>
              )}
            </Menu>

            {/* User Profile */}
            <Tooltip title="Account">
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {user.firstName?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/salary'); }}>
                <ListItemIcon>
                  <SalaryIcon fontSize="small" />
                </ListItemIcon>
                Salary & Payslips
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: desktopCollapsed ? collapsedDrawerWidth : drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          {mobileDrawer}
        </Drawer>
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: desktopCollapsed ? collapsedDrawerWidth : drawerWidth,
              borderRight: '1px solid #e2e8f0',
              transition: 'width 0.2s ease-in-out',
            },
          }}
          open
        >
          {desktopDrawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { 
            xs: '100%',
            sm: `calc(100% - ${desktopCollapsed ? collapsedDrawerWidth : drawerWidth}px)` 
          },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          mt: 8,
          transition: 'margin-left 0.2s ease-in-out',
        }}
      >
        <Outlet />
      </Box>

      {/* Payslip Details Dialog */}
      <Dialog 
        open={openPayslipDialog} 
        onClose={() => setOpenPayslipDialog(false)} 
        maxWidth="sm" 
        fullWidth
      >
        {selectedPayslip && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Payslip Details</Typography>
                <Chip 
                  label={selectedPayslip.month} 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {selectedPayslip.amount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Net Salary Credited
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'success.light', width: 60, height: 60 }}>
                      <MoneyIcon sx={{ fontSize: 32, color: 'success.main' }} />
                    </Avatar>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Employee ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedPayslip.employeeId}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Notification Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {dayjs(selectedPayslip.date).format('MMM D, YYYY HH:mm')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedPayslip.message}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Alert severity="info" sx={{ mb: 2 }}>
                Your payslip PDF has been generated and is ready for download.
              </Alert>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Need help with your payslip?
                  </Typography>
                  <Button size="small" startIcon={<EmailIcon />}>
                    Contact HR
                  </Button>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    View detailed breakdown
                  </Typography>
                  <Button 
                    size="small" 
                    startIcon={<VisibilityIcon />}
                    onClick={() => {
                      setOpenPayslipDialog(false)
                      navigate('/salary')
                    }}
                  >
                    View Salary Details
                  </Button>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPayslipDialog(false)}>Close</Button>
              <Button 
                variant="contained" 
                startIcon={<DownloadIcon />}
                onClick={handleDownloadPayslip}
              >
                Download Payslip
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default Layout