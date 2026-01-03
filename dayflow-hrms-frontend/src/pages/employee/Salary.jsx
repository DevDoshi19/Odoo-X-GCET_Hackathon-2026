import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  Alert,
  Snackbar,
  Tooltip,
  CircularProgress,
} from '@mui/material'
import {
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  CalendarMonth as CalendarIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  Print as PrintIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import dayjs from 'dayjs'

const EmployeeSalary = () => {
  const [selectedYear, setSelectedYear] = useState('2023')
  const [selectedSalary, setSelectedSalary] = useState(null)
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [downloading, setDownloading] = useState(false)
  const [emailing, setEmailing] = useState(false)

  const salaryData = {
    basic: 50000,
    hra: 20000,
    specialAllowance: 15000,
    bonus: 10000,
    pf: 6000,
    tax: 8000,
    insurance: 2000,
    netSalary: 69000,
  }

  const salaryHistory = [
    { 
      id: 1,
      month: 'October 2023', 
      basic: 50000, 
      allowances: 45000, 
      deductions: 16000, 
      net: 79000, 
      status: 'paid',
      paymentDate: '2023-10-31',
      bankAccount: 'XXXX-XXXX-1234',
      paymentMethod: 'Bank Transfer',
      payslipSent: true,
      sentDate: '2023-10-30',
    },
    { 
      id: 2,
      month: 'September 2023', 
      basic: 50000, 
      allowances: 45000, 
      deductions: 16000, 
      net: 79000, 
      status: 'paid',
      paymentDate: '2023-09-30',
      bankAccount: 'XXXX-XXXX-1234',
      paymentMethod: 'Bank Transfer',
      payslipSent: true,
      sentDate: '2023-09-29',
    },
    { 
      id: 3,
      month: 'August 2023', 
      basic: 50000, 
      allowances: 45000, 
      deductions: 16000, 
      net: 79000, 
      status: 'paid',
      paymentDate: '2023-08-31',
      bankAccount: 'XXXX-XXXX-1234',
      paymentMethod: 'Bank Transfer',
      payslipSent: true,
      sentDate: '2023-08-30',
    },
    { 
      id: 4,
      month: 'July 2023', 
      basic: 50000, 
      allowances: 45000, 
      deductions: 16000, 
      net: 79000, 
      status: 'paid',
      paymentDate: '2023-07-31',
      bankAccount: 'XXXX-XXXX-1234',
      paymentMethod: 'Bank Transfer',
      payslipSent: false,
      sentDate: '',
    },
    { 
      id: 5,
      month: 'June 2023', 
      basic: 50000, 
      allowances: 45000, 
      deductions: 16000, 
      net: 79000, 
      status: 'paid',
      paymentDate: '2023-06-30',
      bankAccount: 'XXXX-XXXX-1234',
      paymentMethod: 'Bank Transfer',
      payslipSent: true,
      sentDate: '2023-06-29',
    },
  ]

  const salaryBreakdown = [
    { component: 'Basic Salary', amount: salaryData.basic, type: 'earning' },
    { component: 'House Rent Allowance', amount: salaryData.hra, type: 'earning' },
    { component: 'Special Allowance', amount: salaryData.specialAllowance, type: 'earning' },
    { component: 'Performance Bonus', amount: salaryData.bonus, type: 'earning' },
    { component: 'Provident Fund', amount: salaryData.pf, type: 'deduction' },
    { component: 'Income Tax', amount: salaryData.tax, type: 'deduction' },
    { component: 'Health Insurance', amount: salaryData.insurance, type: 'deduction' },
  ]

  const years = ['2023', '2022', '2021', '2020']

  // Handle View Button Click
  const handleViewSalary = (salary) => {
    setSelectedSalary(salary)
    setOpenViewDialog(true)
  }

  // Handle Download Button Click
  const handleDownloadPayslip = async (salary) => {
    setDownloading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDownloading(false)
    showSnackbar(`Payslip for ${salary.month} downloaded successfully!`, 'success')
  }

  // Handle Receipt Button Click
  const handleViewReceipt = (salary) => {
    setSelectedSalary(salary)
    setOpenReceiptDialog(true)
  }

  // Handle Email Payslip
  const handleEmailPayslip = async (salary) => {
    setEmailing(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setEmailing(false)
    showSnackbar(`Payslip for ${salary.month} emailed successfully!`, 'success')
  }

  // Handle Print Payslip
  const handlePrintPayslip = (salary) => {
    // In real app, this would open print dialog
    window.print()
    showSnackbar(`Printing payslip for ${salary.month}...`, 'info')
  }

  // Handle Bulk Download
  const handleBulkDownload = async () => {
    setDownloading(true)
    // Simulate bulk download
    await new Promise(resolve => setTimeout(resolve, 3000))
    setDownloading(false)
    showSnackbar('All payslips downloaded successfully!', 'success')
  }

  // Handle Bulk Email
  const handleBulkEmail = async () => {
    setEmailing(true)
    // Simulate bulk email
    await new Promise(resolve => setTimeout(resolve, 4000))
    setEmailing(false)
    showSnackbar('All payslips emailed successfully!', 'success')
  }

  // Show snackbar notification
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

  // Calculate totals
  const totalEarnings = salaryData.basic + salaryData.hra + salaryData.specialAllowance + salaryData.bonus
  const totalDeductions = salaryData.pf + salaryData.tax + salaryData.insurance
  const yearToDate = salaryData.netSalary * 10

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Salary & Payslips
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            onClick={handleBulkDownload}
            disabled={downloading}
          >
            {downloading ? 'Downloading...' : 'Export All'}
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<EmailIcon />}
            onClick={handleBulkEmail}
            disabled={emailing}
          >
            {emailing ? 'Sending...' : 'Email All'}
          </Button>
        </Box>
      </Box>

      {/* Current Month Salary */}
      <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Current Month Salary
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                ₹{salaryData.netSalary.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                {dayjs().format('MMMM YYYY')}
              </Typography>
            </Grid>
            <Grid item>
              <WalletIcon sx={{ fontSize: 80, opacity: 0.8 }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Salary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MoneyIcon color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Earnings</Typography>
              </Box>
              <Typography variant="h4">
                ₹{totalEarnings.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Deductions</Typography>
              </Box>
              <Typography variant="h4">
                ₹{totalDeductions.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarIcon color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Year-to-Date</Typography>
              </Box>
              <Typography variant="h4">
                ₹{yearToDate.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Salary Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Salary Breakdown
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Component</TableCell>
                    <TableCell align="right">Amount (₹)</TableCell>
                    <TableCell align="center">Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salaryBreakdown.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.component}</TableCell>
                      <TableCell align="right">{row.amount.toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.type}
                          color={row.type === 'earning' ? 'success' : 'error'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ '& td': { borderBottom: 'none', fontWeight: 600 } }}>
                    <TableCell>Net Salary</TableCell>
                    <TableCell align="right">{salaryData.netSalary.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Chip label="Net" color="primary" size="small" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Salary History */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Salary History
              </Typography>
              <Chip 
                label={`${salaryHistory.length} payslips`} 
                color="primary" 
                size="small" 
                variant="outlined"
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Net</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Payslip</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salaryHistory.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {row.month}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Paid: {dayjs(row.paymentDate).format('MMM D, YYYY')}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ₹{row.net.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status}
                          color="success"
                          size="small"
                          variant="outlined"
                          icon={<CheckCircleIcon />}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {row.payslipSent ? (
                          <Tooltip title="Payslip sent">
                            <Chip
                              label="Sent"
                              color="success"
                              size="small"
                              variant="outlined"
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Payslip not sent">
                            <Chip
                              label="Pending"
                              color="warning"
                              size="small"
                              variant="outlined"
                            />
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleViewSalary(row)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Payslip">
                          <IconButton 
                            size="small" 
                            color="info"
                            onClick={() => handleDownloadPayslip(row)}
                            disabled={downloading}
                          >
                            {downloading ? (
                              <CircularProgress size={16} />
                            ) : (
                              <DownloadIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View Receipt">
                          <IconButton 
                            size="small" 
                            color="secondary"
                            onClick={() => handleViewReceipt(row)}
                          >
                            <ReceiptIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* View Salary Details Dialog */}
      <Dialog 
        open={openViewDialog} 
        onClose={() => setOpenViewDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        {selectedSalary && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Salary Details</Typography>
                <Chip 
                  label={selectedSalary.month} 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                          <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            ₹{selectedSalary.net.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Net Salary Paid
                          </Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: 'success.light', width: 60, height: 60 }}>
                          <MoneyIcon sx={{ fontSize: 32, color: 'success.main' }} />
                        </Avatar>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Payment Information
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body2">
                              <strong>Payment Date:</strong> {dayjs(selectedSalary.paymentDate).format('MMM D, YYYY')}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Payment Method:</strong> {selectedSalary.paymentMethod}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Bank Account:</strong> {selectedSalary.bankAccount}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Status:</strong> 
                              <Chip 
                                label={selectedSalary.status} 
                                color="success" 
                                size="small" 
                                sx={{ ml: 1 }}
                              />
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Salary Components
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body2">
                              <strong>Basic Salary:</strong> ₹{selectedSalary.basic.toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Allowances:</strong> ₹{selectedSalary.allowances.toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Deductions:</strong> ₹{selectedSalary.deductions.toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Alert 
                    severity="info" 
                    icon={<PersonIcon />}
                    action={
                      <Button 
                        color="inherit" 
                        size="small"
                        onClick={() => {
                          setOpenViewDialog(false)
                          // In real app, this would navigate to support page
                          showSnackbar('Opening HR support request...', 'info')
                        }}
                      >
                        Contact HR
                      </Button>
                    }
                  >
                    Need clarification on any salary component? Contact HR for assistance.
                  </Alert>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
              <Button 
                variant="outlined" 
                startIcon={<PrintIcon />}
                onClick={() => handlePrintPayslip(selectedSalary)}
              >
                Print
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<EmailIcon />}
                onClick={() => handleEmailPayslip(selectedSalary)}
                disabled={emailing}
              >
                {emailing ? 'Sending...' : 'Email Payslip'}
              </Button>
              <Button 
                variant="contained" 
                startIcon={<DownloadIcon />}
                onClick={() => {
                  handleDownloadPayslip(selectedSalary)
                  setOpenViewDialog(false)
                }}
                disabled={downloading}
              >
                {downloading ? 'Downloading...' : 'Download'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* View Receipt Dialog */}
      <Dialog 
        open={openReceiptDialog} 
        onClose={() => setOpenReceiptDialog(false)} 
        maxWidth="sm" 
        fullWidth
      >
        {selectedSalary && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Payment Receipt</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label="RECEIPT" 
                    color="success" 
                    size="small"
                  />
                  <Chip 
                    label={selectedSalary.month} 
                    variant="outlined" 
                    size="small"
                  />
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      ₹{selectedSalary.net.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Amount Paid
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Receipt ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        REC-{selectedSalary.id.toString().padStart(3, '0')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Payment Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {dayjs(selectedSalary.paymentDate).format('MMM D, YYYY')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Payment Method
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedSalary.paymentMethod}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Bank Account
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedSalary.bankAccount}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">
                        Transaction Reference
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        TXN-{selectedSalary.id.toString().padStart(3, '0')}-{dayjs(selectedSalary.paymentDate).format('MMDD')}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Alert severity="success" icon={<CheckCircleIcon />}>
                This payment has been successfully processed and credited to your account.
              </Alert>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenReceiptDialog(false)}>Close</Button>
              <Button 
                variant="outlined" 
                startIcon={<PrintIcon />}
                onClick={() => handlePrintPayslip(selectedSalary)}
              >
                Print Receipt
              </Button>
              <Button 
                variant="contained" 
                startIcon={<DownloadIcon />}
                onClick={() => {
                  handleDownloadPayslip(selectedSalary)
                  setOpenReceiptDialog(false)
                }}
                disabled={downloading}
              >
                {downloading ? 'Downloading...' : 'Download Receipt'}
              </Button>
            </DialogActions>
          </>
        )}
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

export default EmployeeSalary