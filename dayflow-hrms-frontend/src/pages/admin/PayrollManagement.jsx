import { useState, useEffect } from 'react'
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
  Switch,
  FormControlLabel,
  Slider,
  Input,
  FormGroup,
  Snackbar,
  CircularProgress,
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  AttachMoney as MoneyIcon,
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  Receipt as ReceiptIcon,
  CalendarMonth as CalendarIcon,
  Send as SendIcon,
  Print as PrintIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Email as EmailIcon,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'

const PayrollManagement = () => {
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'))
  const [openDialog, setOpenDialog] = useState(false)
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false)
  const [openSendDialog, setOpenSendDialog] = useState(false)
  const [selectedPayroll, setSelectedPayroll] = useState(null)
  const [selectedDepartments, setSelectedDepartments] = useState({
    Engineering: true,
    Marketing: true,
    Sales: true,
    HR: true,
    Finance: false,
    Operations: false,
  })
  const [generatedMonth, setGeneratedMonth] = useState(dayjs().format('YYYY-MM'))
  const [payrollStats, setPayrollStats] = useState({
    total: 0,
    processed: 0,
    pending: 0,
    failed: 0,
    totalAmount: 0,
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [sendingEmail, setSendingEmail] = useState(false)

  // Mock payroll data
  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employee: 'John Doe',
      email: 'john@company.com',
      employeeId: 'EMP001',
      profilePic: 'JD',
      department: 'Engineering',
      position: 'Senior Developer',
      basicSalary: 50000,
      allowances: 25000,
      deductions: 15000,
      netSalary: 60000,
      status: 'processed',
      paymentDate: '2023-11-05',
      paymentMethod: 'Bank Transfer',
      bankAccount: 'XXXX-XXXX-1234',
      month: '2023-11',
      payslipSent: true,
      sentDate: '2023-11-06',
    },
    {
      id: 2,
      employee: 'Jane Smith',
      email: 'jane@company.com',
      employeeId: 'EMP002',
      profilePic: 'JS',
      department: 'Marketing',
      position: 'Marketing Manager',
      basicSalary: 60000,
      allowances: 30000,
      deductions: 20000,
      netSalary: 70000,
      status: 'processed',
      paymentDate: '2023-11-05',
      paymentMethod: 'Bank Transfer',
      bankAccount: 'XXXX-XXXX-5678',
      month: '2023-11',
      payslipSent: true,
      sentDate: '2023-11-06',
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      email: 'mike@company.com',
      employeeId: 'EMP003',
      profilePic: 'MJ',
      department: 'Sales',
      position: 'Sales Executive',
      basicSalary: 45000,
      allowances: 20000,
      deductions: 12000,
      netSalary: 53000,
      status: 'pending',
      paymentDate: '',
      paymentMethod: 'Bank Transfer',
      bankAccount: 'XXXX-XXXX-9012',
      month: '2023-11',
      payslipSent: false,
      sentDate: '',
    },
    {
      id: 4,
      employee: 'Sarah Wilson',
      email: 'sarah@company.com',
      employeeId: 'EMP004',
      profilePic: 'SW',
      department: 'HR',
      position: 'HR Manager',
      basicSalary: 55000,
      allowances: 28000,
      deductions: 18000,
      netSalary: 65000,
      status: 'failed',
      paymentDate: '2023-11-05',
      paymentMethod: 'Bank Transfer',
      bankAccount: 'XXXX-XXXX-3456',
      month: '2023-11',
      payslipSent: false,
      sentDate: '',
    },
    {
      id: 5,
      employee: 'Robert Brown',
      email: 'robert@company.com',
      employeeId: 'EMP005',
      profilePic: 'RB',
      department: 'Engineering',
      position: 'Frontend Developer',
      basicSalary: 48000,
      allowances: 22000,
      deductions: 14000,
      netSalary: 56000,
      status: 'processed',
      paymentDate: '2023-11-05',
      paymentMethod: 'Bank Transfer',
      bankAccount: 'XXXX-XXXX-7890',
      month: '2023-11',
      payslipSent: false,
      sentDate: '',
    },
  ])

  const [salaryComponents, setSalaryComponents] = useState({
    basic: { percentage: 60, min: 30000, max: 100000 },
    hra: { percentage: 20, min: 10000, max: 40000 },
    specialAllowance: { percentage: 15, min: 5000, max: 30000 },
    bonus: { percentage: 5, min: 0, max: 20000 },
    pf: { percentage: 12, min: 1800, max: 7200 },
    tax: { percentage: 10, min: 0, max: 20000 },
    insurance: { percentage: 2, min: 500, max: 2000 },
  })

  useEffect(() => {
    updateStats()
  }, [payrollData])

  const updateStats = () => {
    const stats = {
      total: payrollData.length,
      processed: payrollData.filter(p => p.status === 'processed').length,
      pending: payrollData.filter(p => p.status === 'pending').length,
      failed: payrollData.filter(p => p.status === 'failed').length,
      totalAmount: payrollData.reduce((sum, p) => sum + p.netSalary, 0),
    }
    setPayrollStats(stats)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'success'
      case 'pending': return 'warning'
      case 'failed': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed': return <CheckCircleIcon />
      case 'pending': return <PendingIcon />
      case 'failed': return <ErrorIcon />
      default: return null
    }
  }

  const handleProcessPayment = (id) => {
    setPayrollData(prev => prev.map(p => 
      p.id === id ? { 
        ...p, 
        status: 'processed',
        paymentDate: dayjs().format('YYYY-MM-DD')
      } : p
    ))
    showSnackbar('Payment processed successfully!', 'success')
  }

  const handleViewDetails = (payroll) => {
    setSelectedPayroll(payroll)
    setOpenDialog(true)
  }

  const handleSendPayslip = (payroll) => {
    setSelectedPayroll(payroll)
    setOpenSendDialog(true)
  }

  const sendPayslipToEmployee = async () => {
    if (!selectedPayroll) return
    
    setSendingEmail(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setPayrollData(prev => prev.map(p => 
      p.id === selectedPayroll.id ? { 
        ...p, 
        payslipSent: true,
        sentDate: dayjs().format('YYYY-MM-DD HH:mm')
      } : p
    ))
    
    setSendingEmail(false)
    setOpenSendDialog(false)
    showSnackbar(`Payslip sent successfully to ${selectedPayroll.employee}!`, 'success')
  }

  const sendBulkPayslips = async () => {
    // Filter employees who haven't received payslips and have processed status
    const employeesToSend = filteredPayroll.filter(p => 
      p.status === 'processed' && !p.payslipSent
    )
    
    if (employeesToSend.length === 0) {
      showSnackbar('All payslips have already been sent!', 'info')
      return
    }
    
    setSendingEmail(true)
    
    // Simulate bulk sending
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const updatedData = payrollData.map(p => {
      if (employeesToSend.some(e => e.id === p.id)) {
        return {
          ...p,
          payslipSent: true,
          sentDate: dayjs().format('YYYY-MM-DD HH:mm')
        }
      }
      return p
    })
    
    setPayrollData(updatedData)
    setSendingEmail(false)
    showSnackbar(`Successfully sent ${employeesToSend.length} payslips!`, 'success')
  }

  const generatePayrollData = () => {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']
    const positions = {
      'Engineering': ['Senior Developer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'QA Engineer'],
      'Marketing': ['Marketing Manager', 'Content Writer', 'SEO Specialist', 'Digital Marketer'],
      'Sales': ['Sales Executive', 'Sales Manager', 'Account Executive', 'Business Development'],
      'HR': ['HR Manager', 'Recruiter', 'HR Generalist', 'Compensation Analyst'],
      'Finance': ['Accountant', 'Financial Analyst', 'Finance Manager', 'Auditor'],
      'Operations': ['Operations Manager', 'Project Coordinator', 'Logistics Specialist']
    }
    
    const employeeNames = [
      'Alex Johnson', 'Maria Garcia', 'David Smith', 'Lisa Wong', 'Kevin Brown',
      'Emma Wilson', 'James Miller', 'Sophia Davis', 'Michael Taylor', 'Olivia Anderson',
      'Daniel Thomas', 'Ava Martinez', 'Christopher Lee', 'Isabella Harris', 'Matthew Clark',
      'Mia Lewis', 'Andrew Walker', 'Charlotte Hall', 'Joshua Allen', 'Amelia Young'
    ]
    
    const paymentMethods = ['Bank Transfer', 'Check', 'UPI']
    const statuses = ['pending', 'pending', 'pending', 'processed', 'processed']
    
    // Filter departments based on selection
    const selectedDepts = departments.filter(dept => selectedDepartments[dept])
    
    // Generate new payroll data
    const newPayrollData = []
    const baseId = payrollData.length > 0 ? Math.max(...payrollData.map(p => p.id)) : 0
    
    // Generate 3-5 records per selected department
    selectedDepts.forEach(dept => {
      const recordsPerDept = Math.floor(Math.random() * 3) + 3 // 3-5 records per department
      
      for (let i = 1; i <= recordsPerDept; i++) {
        const employeeName = employeeNames[Math.floor(Math.random() * employeeNames.length)]
        const firstName = employeeName.split(' ')[0]
        const lastName = employeeName.split(' ')[1] || ''
        const position = positions[dept][Math.floor(Math.random() * positions[dept].length)]
        const basicSalary = Math.round(Math.random() * 40000 + 30000) // 30k-70k
        const allowances = Math.round(basicSalary * (Math.random() * 0.4 + 0.2)) // 20%-60% of basic
        const deductions = Math.round(basicSalary * (Math.random() * 0.3 + 0.1)) // 10%-40% of basic
        const netSalary = basicSalary + allowances - deductions
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const paymentDate = status === 'processed' ? dayjs().format('YYYY-MM-DD') : ''
        
        newPayrollData.push({
          id: baseId + newPayrollData.length + 1,
          employee: employeeName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
          employeeId: `EMP${String(baseId + newPayrollData.length + 1).padStart(3, '0')}`,
          profilePic: `${firstName.charAt(0)}${lastName.charAt(0)}`,
          department: dept,
          position: position,
          basicSalary: basicSalary,
          allowances: allowances,
          deductions: deductions,
          netSalary: netSalary,
          status: status,
          paymentDate: paymentDate,
          paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
          bankAccount: `XXXX-XXXX-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          month: generatedMonth,
          payslipSent: false,
          sentDate: '',
        })
      }
    })
    
    return newPayrollData
  }

  const handleGeneratePayslips = () => {
    const newPayrollData = generatePayrollData()
    setPayrollData(prev => [...prev, ...newPayrollData])
    showSnackbar(`Successfully generated ${newPayrollData.length} payroll entries for ${dayjs(generatedMonth).format('MMMM YYYY')}!`, 'success')
    setOpenGenerateDialog(false)
  }

  const handleDepartmentToggle = (department) => {
    setSelectedDepartments(prev => ({
      ...prev,
      [department]: !prev[department]
    }))
  }

  const getFilteredPayroll = () => {
    let filtered = payrollData.filter(p => {
      const matchesSearch = 
        p.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesMonth = selectedMonth === '' || p.month === selectedMonth
      
      return matchesSearch && matchesMonth
    })

    // Apply tab filter
    switch (tabValue) {
      case 0: // All
        break
      case 1: // Processed
        filtered = filtered.filter(p => p.status === 'processed')
        break
      case 2: // Pending
        filtered = filtered.filter(p => p.status === 'pending')
        break
      case 3: // Failed
        filtered = filtered.filter(p => p.status === 'failed')
        break
      default:
        break
    }

    return filtered
  }

  const filteredPayroll = getFilteredPayroll()

  const columns = [
    {
      field: 'employee',
      headerName: 'Employee',
      width: 220,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            {params.row.profilePic}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.employeeId} • {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'position', headerName: 'Position', width: 180 },
    {
      field: 'netSalary',
      headerName: 'Net Salary',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          ₹{params.value.toLocaleString()}
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
      field: 'payslipSent',
      headerName: 'Payslip',
      width: 120,
      renderCell: (params) => (
        params.value ? (
          <Chip
            icon={<CheckCircleIcon />}
            label="Sent"
            color="success"
            size="small"
            variant="outlined"
          />
        ) : (
          <Chip
            icon={<ErrorIcon />}
            label="Pending"
            color="warning"
            size="small"
            variant="outlined"
          />
        )
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <Box>
          {params.row.status === 'pending' && (
            <Tooltip title="Process Payment">
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => handleProcessPayment(params.row.id)}
                sx={{ mr: 1 }}
              >
                Pay Now
              </Button>
            </Tooltip>
          )}
          <Tooltip title="View Details">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleViewDetails(params.row)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Payslip">
            <IconButton size="small">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send Payslip">
            <IconButton 
              size="small" 
              color={params.row.payslipSent ? "success" : "secondary"}
              onClick={() => handleSendPayslip(params.row)}
              disabled={params.row.status !== 'processed'}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const generateMonths = () => {
    const months = []
    for (let i = 0; i < 12; i++) {
      const date = dayjs().subtract(i, 'month')
      months.push({
        value: date.format('YYYY-MM'),
        label: date.format('MMMM YYYY'),
      })
    }
    return months
  }

  const calculateSalary = (base) => {
    return {
      basic: Math.round(base * (salaryComponents.basic.percentage / 100)),
      hra: Math.round(base * (salaryComponents.hra.percentage / 100)),
      specialAllowance: Math.round(base * (salaryComponents.specialAllowance.percentage / 100)),
      bonus: Math.round(base * (salaryComponents.bonus.percentage / 100)),
      pf: Math.min(Math.round(base * (salaryComponents.pf.percentage / 100)), salaryComponents.pf.max),
      tax: Math.round(base * (salaryComponents.tax.percentage / 100)),
      insurance: salaryComponents.insurance.min,
    }
  }

  const handleComponentChange = (component, field, value) => {
    setSalaryComponents(prev => ({
      ...prev,
      [component]: {
        ...prev[component],
        [field]: value,
      },
    }))
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

  // Calculate stats for current tab
  const getCurrentTabStats = () => {
    const currentTabData = filteredPayroll
    return {
      total: currentTabData.length,
      totalAmount: currentTabData.reduce((sum, p) => sum + p.netSalary, 0),
      processed: currentTabData.filter(p => p.status === 'processed').length,
      pending: currentTabData.filter(p => p.status === 'pending').length,
      failed: currentTabData.filter(p => p.status === 'failed').length,
    }
  }

  const currentTabStats = getCurrentTabStats()

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Payroll Management
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WalletIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Payroll</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                ₹{(currentTabStats.totalAmount / 100000).toFixed(1)}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentTabStats.total} employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Processed</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {currentTabStats.processed}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(currentTabStats.processed / currentTabStats.total) * 100 || 0}
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PendingIcon color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Pending</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {currentTabStats.pending}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(currentTabStats.pending / currentTabStats.total) * 100 || 0}
                color="warning"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Average Salary</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                ₹{currentTabStats.total > 0 ? Math.round(currentTabStats.totalAmount / currentTabStats.total).toLocaleString() : 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Per employee
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenGenerateDialog(true)}
              fullWidth
            >
              Generate Payroll
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              fullWidth
              onClick={() => {
                const employeesToPrint = filteredPayroll.filter(p => p.status === 'processed')
                if (employeesToPrint.length === 0) {
                  showSnackbar('No processed employees to print!', 'warning')
                  return
                }
                showSnackbar(`Preparing ${employeesToPrint.length} payslips for printing...`, 'info')
              }}
            >
              Bulk Payslips
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              startIcon={<SendIcon />}
              fullWidth
              onClick={sendBulkPayslips}
              disabled={sendingEmail}
            >
              {sendingEmail ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Sending...
                </>
              ) : (
                'Send All'
              )}
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              fullWidth
              onClick={() => {
                const dataStr = JSON.stringify(filteredPayroll, null, 2)
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
                const exportFileDefaultName = 'payroll_report.json'
                const linkElement = document.createElement('a')
                linkElement.setAttribute('href', dataUri)
                linkElement.setAttribute('download', exportFileDefaultName)
                linkElement.click()
                showSnackbar('Payroll report exported successfully!', 'success')
              }}
            >
              Export Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <FormControl fullWidth>
              <InputLabel>Select Month</InputLabel>
              <Select
                value={selectedMonth}
                label="Select Month"
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {generateMonths().map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select 
                label="Department" 
                defaultValue=""
                onChange={(e) => {
                  // You can add department filter logic here
                }}
              >
                <MenuItem value="">All Departments</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="HR">Human Resources</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`All (${payrollStats.total})`} />
          <Tab 
            label={`Processed (${payrollStats.processed})`}
            icon={<CheckCircleIcon />} 
            iconPosition="start"
          />
          <Tab 
            label={`Pending (${payrollStats.pending})`}
            icon={<PendingIcon />} 
            iconPosition="start"
          />
          <Tab 
            label={`Failed (${payrollStats.failed})`}
            icon={<ErrorIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Tab Content Summary */}
      <Alert severity="info" sx={{ mb: 3 }}>
        Showing {currentTabStats.total} employees in {tabValue === 0 ? 'All' : tabValue === 1 ? 'Processed' : tabValue === 2 ? 'Pending' : 'Failed'} status • 
        Total amount: ₹{currentTabStats.totalAmount.toLocaleString()}
      </Alert>

      {/* Payroll Table */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredPayroll}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>

      {/* Salary Calculator and Summary */}
      <Grid container spacing={3}>
        {/* Salary Structure Calculator */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Salary Structure Calculator
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Base Salary: ₹50,000
              </Typography>
              <Slider
                defaultValue={50000}
                min={20000}
                max={150000}
                step={5000}
                valueLabelDisplay="auto"
                sx={{ mb: 2 }}
              />
            </Box>

            {Object.entries(salaryComponents).map(([component, data]) => (
              <Box key={component} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {component.replace(/([A-Z])/g, ' $1')}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {data.percentage}% = ₹{Math.round(50000 * (data.percentage / 100)).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Slider
                    value={data.percentage}
                    onChange={(e, value) => handleComponentChange(component, 'percentage', value)}
                    min={0}
                    max={100}
                    sx={{ flex: 1 }}
                  />
                  <Input
                    value={data.percentage}
                    size="small"
                    onChange={(e) => handleComponentChange(component, 'percentage', Number(e.target.value))}
                    inputProps={{ min: 0, max: 100, type: 'number' }}
                    sx={{ width: 70 }}
                  />
                </Box>
              </Box>
            ))}

            <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                Calculated Net Salary: ₹{calculateSalary(50000).basic + calculateSalary(50000).hra + calculateSalary(50000).specialAllowance + calculateSalary(50000).bonus - calculateSalary(50000).pf - calculateSalary(50000).tax - calculateSalary(50000).insurance}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Department-wise Summary */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Department-wise Summary
            </Typography>
            
            {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map((dept) => {
              const deptPayroll = payrollData.filter(p => p.department === dept)
              const total = deptPayroll.reduce((sum, p) => sum + p.netSalary, 0)
              const avg = deptPayroll.length > 0 ? Math.round(total / deptPayroll.length) : 0
              
              return (
                <Box key={dept} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {dept} ({deptPayroll.length})
                    </Typography>
                    <Typography variant="body2">
                      ₹{total.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={payrollStats.totalAmount > 0 ? (total / payrollStats.totalAmount) * 100 : 0}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Average: ₹{avg.toLocaleString()}
                  </Typography>
                </Box>
              )
            })}
          </Paper>
        </Grid>
      </Grid>

      {/* Payroll Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Payroll Details</DialogTitle>
        <DialogContent>
          {selectedPayroll && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 64, height: 64 }}>
                    {selectedPayroll.profilePic}
                  </Avatar>
                  <Box>
                    <Typography variant="h5">{selectedPayroll.employee}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      {selectedPayroll.position} • {selectedPayroll.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Employee ID: {selectedPayroll.employeeId} • Email: {selectedPayroll.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Salary Breakdown
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Basic Salary</TableCell>
                        <TableCell align="right">₹{selectedPayroll.basicSalary.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Allowances</TableCell>
                        <TableCell align="right">₹{selectedPayroll.allowances.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Deductions</TableCell>
                        <TableCell align="right">₹{selectedPayroll.deductions.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '& td': { fontWeight: 600, fontSize: '1.1rem' } }}>
                        <TableCell>Net Salary</TableCell>
                        <TableCell align="right">₹{selectedPayroll.netSalary.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Payment Information
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Status
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          icon={getStatusIcon(selectedPayroll.status)}
                          label={selectedPayroll.status.toUpperCase()}
                          color={getStatusColor(selectedPayroll.status)}
                          size="small"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Payslip Sent
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {selectedPayroll.payslipSent ? (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="Yes"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip
                            icon={<ErrorIcon />}
                            label="No"
                            color="warning"
                            size="small"
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Payment Date
                      </Typography>
                      <Typography variant="body2">
                        {selectedPayroll.paymentDate || 'Not processed'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Payment Method
                      </Typography>
                      <Typography variant="body2">
                        {selectedPayroll.paymentMethod}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Bank Account
                      </Typography>
                      <Typography variant="body2">
                        {selectedPayroll.bankAccount}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Month
                      </Typography>
                      <Typography variant="body2">
                        {dayjs(selectedPayroll.month).format('MMMM YYYY')}
                      </Typography>
                    </Grid>
                    {selectedPayroll.payslipSent && selectedPayroll.sentDate && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          Payslip Sent On
                        </Typography>
                        <Typography variant="body2">
                          {selectedPayroll.sentDate}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            startIcon={<PrintIcon />}
            onClick={() => {
              showSnackbar(`Printing payslip for ${selectedPayroll.employee}...`, 'info')
              setOpenDialog(false)
            }}
          >
            Print Payslip
          </Button>
          <Button 
            startIcon={<DownloadIcon />}
            onClick={() => {
              showSnackbar(`Downloading payslip for ${selectedPayroll.employee}...`, 'info')
              setOpenDialog(false)
            }}
          >
            Download PDF
          </Button>
          <Button 
            startIcon={<SendIcon />} 
            variant="contained"
            onClick={() => {
              setOpenDialog(false)
              handleSendPayslip(selectedPayroll)
            }}
            disabled={selectedPayroll?.status !== 'processed'}
          >
            Send to Employee
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send Payslip Dialog */}
      <Dialog open={openSendDialog} onClose={() => setOpenSendDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Payslip</DialogTitle>
        <DialogContent>
          {selectedPayroll && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 48, height: 48 }}>
                    {selectedPayroll.profilePic}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedPayroll.employee}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPayroll.position} • {selectedPayroll.department}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="To Email"
                  value={selectedPayroll.email}
                  disabled
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={`Payslip for ${dayjs(selectedPayroll.month).format('MMMM YYYY')} - ${selectedPayroll.employee}`}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  defaultValue={`Dear ${selectedPayroll.employee},

Please find attached your payslip for the month of ${dayjs(selectedPayroll.month).format('MMMM YYYY')}.

Employee Details:
- Employee ID: ${selectedPayroll.employeeId}
- Department: ${selectedPayroll.department}
- Position: ${selectedPayroll.position}
- Net Salary: ₹${selectedPayroll.netSalary.toLocaleString()}
- Payment Date: ${selectedPayroll.paymentDate}
- Payment Method: ${selectedPayroll.paymentMethod}

Please contact HR if you have any questions.

Best regards,
Payroll Department`}
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info">
                  The payslip PDF will be automatically attached to this email.
                </Alert>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSendDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={sendPayslipToEmployee}
            disabled={sendingEmail}
            startIcon={sendingEmail ? <CircularProgress size={20} /> : <SendIcon />}
          >
            {sendingEmail ? 'Sending...' : 'Send Payslip'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Generate Payroll Dialog */}
      <Dialog open={openGenerateDialog} onClose={() => setOpenGenerateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Payroll</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Month</InputLabel>
                <Select 
                  label="Select Month" 
                  value={generatedMonth}
                  onChange={(e) => setGeneratedMonth(e.target.value)}
                >
                  {generateMonths().map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Include Departments
              </Typography>
              <FormGroup>
                {Object.keys(selectedDepartments).map((dept) => (
                  <FormControlLabel 
                    key={dept}
                    control={
                      <Switch 
                        checked={selectedDepartments[dept]}
                        onChange={() => handleDepartmentToggle(dept)}
                      />
                    } 
                    label={dept}
                  />
                ))}
              </FormGroup>
            </Grid>
            
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mt: 2 }}>
                This will generate payroll for all selected departments for {dayjs(generatedMonth).format('MMMM YYYY')}. 
                Approximately 3-5 employees per selected department will be added.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGenerateDialog(false)}>Cancel</Button>
          <Button onClick={handleGeneratePayslips} variant="contained" color="primary">
            Generate Payroll
          </Button>
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

export default PayrollManagement