import { useState, useEffect } from "react";
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
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

// Shared leave data that both components can access
const sharedLeaveRequests = [
  {
    id: 1,
    employee: "John Doe",
    employeeId: "EMP001",
    profilePic: "JD",
    type: "Paid Leave",
    startDate: "2023-11-10",
    endDate: "2023-11-12",
    days: 3,
    appliedDate: "2023-10-25",
    status: "pending",
    remarks: "Family vacation",
    department: "Engineering",
    leaveBalance: 12,
  },
  {
    id: 2,
    employee: "Jane Smith",
    employeeId: "EMP002",
    profilePic: "JS",
    type: "Sick Leave",
    startDate: "2023-11-15",
    endDate: "2023-11-15",
    days: 1,
    appliedDate: "2023-10-28",
    status: "pending",
    remarks: "Doctor appointment",
    department: "Marketing",
    leaveBalance: 8,
  },
  {
    id: 3,
    employee: "Mike Johnson",
    employeeId: "EMP003",
    profilePic: "MJ",
    type: "Unpaid Leave",
    startDate: "2023-11-20",
    endDate: "2023-11-22",
    days: 3,
    appliedDate: "2023-10-30",
    status: "approved",
    remarks: "Personal work",
    department: "Sales",
    leaveBalance: 5,
  },
  {
    id: 4,
    employee: "Sarah Wilson",
    employeeId: "EMP004",
    profilePic: "SW",
    type: "Maternity Leave",
    startDate: "2023-12-01",
    endDate: "2024-03-01",
    days: 90,
    appliedDate: "2023-10-15",
    status: "approved",
    remarks: "Maternity leave",
    department: "HR",
    leaveBalance: 90,
  },
  {
    id: 5,
    employee: "Robert Brown",
    employeeId: "EMP005",
    profilePic: "RB",
    type: "Paid Leave",
    startDate: "2023-11-05",
    endDate: "2023-11-07",
    days: 3,
    appliedDate: "2023-10-20",
    status: "rejected",
    remarks: "Tour",
    department: "Engineering",
    leaveBalance: 10,
  },
];

// Function to update leave status
const updateLeaveStatus = (id, status) => {
  const leaveIndex = sharedLeaveRequests.findIndex(leave => leave.id === id);
  if (leaveIndex !== -1) {
    sharedLeaveRequests[leaveIndex].status = status;
    // Return updated copy
    return [...sharedLeaveRequests];
  }
  return sharedLeaveRequests;
};

const LeaveManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [leaveStats, setLeaveStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  // Use shared leave data
  const [leaveRequests, setLeaveRequests] = useState(sharedLeaveRequests);

  useEffect(() => {
    // Load from localStorage if exists (for persistence across page refresh)
    const savedLeaves = localStorage.getItem('leaveRequests');
    if (savedLeaves) {
      const parsedLeaves = JSON.parse(savedLeaves);
      setLeaveRequests(parsedLeaves);
      // Update shared array
      sharedLeaveRequests.length = 0;
      sharedLeaveRequests.push(...parsedLeaves);
    } else {
      // Save initial data to localStorage
      localStorage.setItem('leaveRequests', JSON.stringify(sharedLeaveRequests));
    }
  }, []);

  useEffect(() => {
    // Calculate stats
    const stats = {
      pending: leaveRequests.filter((req) => req.status === "pending").length,
      approved: leaveRequests.filter((req) => req.status === "approved").length,
      rejected: leaveRequests.filter((req) => req.status === "rejected").length,
      total: leaveRequests.length,
    };
    setLeaveStats(stats);
  }, [leaveRequests]);

  // Listen for storage changes (from Admin Dashboard)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLeaves = localStorage.getItem('leaveRequests');
      if (savedLeaves) {
        const parsedLeaves = JSON.parse(savedLeaves);
        setLeaveRequests(parsedLeaves);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const statusMap = ["all", "pending", "approved", "rejected"];
    setFilter(statusMap[newValue]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon />;
      case "pending":
        return <PendingIcon />;
      case "rejected":
        return <CancelIcon />;
      default:
        return null;
    }
  };

  const handleApprove = (id) => {
    const updatedLeaves = updateLeaveStatus(id, "approved");
    setLeaveRequests(updatedLeaves);
    
    // Save to localStorage
    localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaves));
    
    // Dispatch storage event for Admin Dashboard to listen
    window.dispatchEvent(new Event('storage'));
  };

  const handleReject = (id) => {
    const updatedLeaves = updateLeaveStatus(id, "rejected");
    setLeaveRequests(updatedLeaves);
    
    // Save to localStorage
    localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaves));
    
    // Dispatch storage event for Admin Dashboard to listen
    window.dispatchEvent(new Event('storage'));
  };

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
    setOpenDialog(true);
  };

  const filteredLeaves = leaveRequests.filter((leave) => {
    const matchesSearch =
      leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || leave.status === filter;

    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      field: "employee",
      headerName: "Employee",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
            {params.row.profilePic}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.employeeId}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: "type", headerName: "Leave Type", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 120 },
    { field: "endDate", headerName: "End Date", width: 120 },
    { field: "days", headerName: "Days", width: 100 },
    {
      field: "status",
      headerName: "Status",
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
    { field: "appliedDate", headerName: "Applied On", width: 120 },
    { field: "department", headerName: "Department", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          {params.row.status === "pending" && (
            <>
              <Tooltip title="Approve">
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => handleApprove(params.row.id)}
                >
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reject">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleReject(params.row.id)}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </>
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
        </Box>
      ),
    },
  ];

  // Filter leaves that are active today
  const todayLeaves = leaveRequests.filter((leave) => {
    const today = dayjs();
    dayjs.extend(isBetween);
    return today.isBetween(
      dayjs(leave.startDate),
      dayjs(leave.endDate),
      null,
      "[]" // inclusive: includes start & end date
    );
  });

  const leaveTypeStats = leaveRequests.reduce((acc, leave) => {
    acc[leave.type] = (acc[leave.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Leave Management
      </Typography>

      {/* Sync Status Alert */}
      <Alert severity="info" sx={{ mb: 2 }}>
        Leave status changes are synced with Admin Dashboard. Changes made here will reflect in both sections.
      </Alert>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PendingIcon color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Pending</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {leaveStats.pending}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(leaveStats.pending / leaveStats.total) * 100}
                color="warning"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Approved</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {leaveStats.approved}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(leaveStats.approved / leaveStats.total) * 100}
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CancelIcon color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Rejected</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {leaveStats.rejected}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(leaveStats.rejected / leaveStats.total) * 100}
                color="error"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarIcon color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Today on Leave</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {todayLeaves.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs().format("DD MMM YYYY")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by employee name or ID..."
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
            <TextField
              fullWidth
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Leave Type</InputLabel>
              <Select label="Leave Type" defaultValue="">
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Paid Leave">Paid Leave</MenuItem>
                <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                <MenuItem value="Unpaid Leave">Unpaid Leave</MenuItem>
                <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Leaves" />
          <Tab label="Pending" icon={<PendingIcon />} iconPosition="start" />
          <Tab
            label="Approved"
            icon={<CheckCircleIcon />}
            iconPosition="start"
          />
          <Tab label="Rejected" icon={<CancelIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Actions Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Leave Requests ({filteredLeaves.length})
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button startIcon={<FilterIcon />} variant="outlined">
            Advanced Filters
          </Button>
          <Button 
            startIcon={<DownloadIcon />} 
            variant="outlined"
            onClick={() => {
              const dataStr = JSON.stringify(leaveRequests, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = 'leave_requests.json';
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
          >
            Export
          </Button>
          <Button 
            startIcon={<RefreshIcon />} 
            variant="contained"
            onClick={() => {
              const savedLeaves = localStorage.getItem('leaveRequests');
              if (savedLeaves) {
                const parsedLeaves = JSON.parse(savedLeaves);
                setLeaveRequests(parsedLeaves);
              }
            }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Leave Requests Table */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredLeaves}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>

      {/* Today's Leaves and Stats */}
      <Grid container spacing={3}>
        {/* Today's Leaves */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Today on Leave ({todayLeaves.length})
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              mr: 1,
                              width: 32,
                              height: 32,
                              bgcolor: "primary.main",
                            }}
                          >
                            {leave.profilePic}
                          </Avatar>
                          <Typography variant="body2">
                            {leave.employee}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>
                        <Chip
                          label={leave.status}
                          color={getStatusColor(leave.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Leave Type Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Leave Type Distribution
            </Typography>
            {Object.entries(leaveTypeStats).map(([type, count]) => (
              <Box key={type} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{type}</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {count} requests
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(count / leaveRequests.length) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Leave Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Leave Request Details</DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      mr: 2,
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                    }}
                  >
                    {selectedLeave.profilePic}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {selectedLeave.employee}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedLeave.employeeId} • {selectedLeave.department}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Leave Information
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 500, border: "none" }}>
                        Leave Type
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {selectedLeave.type}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 500, border: "none" }}>
                        Date Range
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {dayjs(selectedLeave.startDate).format("DD MMM YYYY")} -{" "}
                        {dayjs(selectedLeave.endDate).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 500, border: "none" }}>
                        Total Days
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {selectedLeave.days} days
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 500, border: "none" }}>
                        Applied On
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {dayjs(selectedLeave.appliedDate).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 500, border: "none" }}>
                        Remaining Balance
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {selectedLeave.leaveBalance} days
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Remarks
                </Typography>
                <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
                  <Typography variant="body2">
                    {selectedLeave.remarks}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Current Status
                </Typography>
                <Chip
                  icon={getStatusIcon(selectedLeave.status)}
                  label={selectedLeave.status.toUpperCase()}
                  color={getStatusColor(selectedLeave.status)}
                  size="medium"
                  sx={{ fontWeight: 600 }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {selectedLeave?.status === "pending" && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  handleApprove(selectedLeave.id);
                  setOpenDialog(false);
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => {
                  handleReject(selectedLeave.id);
                  setOpenDialog(false);
                }}
              >
                Reject
              </Button>
            </>
          )}
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveManagement;