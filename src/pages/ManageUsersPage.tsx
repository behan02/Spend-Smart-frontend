import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography,  
  Paper, 
  Tabs, 
  Tab, 
  Alert,
  Chip,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import ManageUsersTable from '../components/ManageUsers/ManageUsersTable'; 
import { adminApi } from '../services/adminApi';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ManageUsersPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [admins, setAdmins] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');

  // Filter functions
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setCurrencyFilter('');
  };

  const hasActiveFilters = searchQuery || statusFilter || currencyFilter;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setError(null);
      
      // Load admins
      const adminsData = await adminApi.getAllAdmins();
      setAdmins(adminsData);
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(`Failed to load data: ${err.message}`);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: 'white',
          overflowY: 'auto',
          height: '100vh',
          width: '100%',
        }}
      >
        <Topbar />
        <Container maxWidth="xl" sx={{ mt: 4, padding: 0 }}>
          
         

          {/* Page Title */}
          <Typography variant="h4" sx={{ mb: 4 }}>
            User Management
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Tabs for Users and Admins */}
          <Paper elevation={3} sx={{ mb: 2 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="user management tabs"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Users" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Admins (View Only)" id="tab-1" aria-controls="tabpanel-1" />
            </Tabs>
          </Paper>

          {/* Filter Section - Only show for Users tab */}
          {tabValue === 0 && (
            <Paper elevation={2} sx={{ p: 3, mb: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
                Filter Users
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
                {/* Search Field */}
                <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                  <TextField
                    fullWidth
                    label="Search by username"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                    }}
                    placeholder="Enter username..."
                  />
                </Box>

                {/* Status Filter */}
                <Box sx={{ flex: '1 1 150px', minWidth: '150px' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="">All Statuses</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Currency Filter */}
                <Box sx={{ flex: '1 1 150px', minWidth: '150px' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={currencyFilter}
                      label="Currency"
                      onChange={(e) => setCurrencyFilter(e.target.value)}
                    >
                      <MenuItem value="">All Currencies</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="JPY">JPY</MenuItem>
                      <MenuItem value="LKR">LKR</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Clear Filters Button */}
                <Box sx={{ flex: '0 0 auto' }}>
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={handleClearFilters}
                    disabled={!hasActiveFilters}
                    sx={{ height: '40px' }}
                  >
                    Clear
                  </Button>
                </Box>
              </Box>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Active Filters:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {searchQuery && (
                      <Chip
                        label={`Username: "${searchQuery}"`}
                        onDelete={() => setSearchQuery('')}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {statusFilter && (
                      <Chip
                        label={`Status: ${statusFilter}`}
                        onDelete={() => setStatusFilter('')}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {currencyFilter && (
                      <Chip
                        label={`Currency: ${currencyFilter}`}
                        onDelete={() => setCurrencyFilter('')}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Paper>
          )}

          {/* Tab Panels */}
          <Paper elevation={3}>
            <TabPanel value={tabValue} index={0}>
              {/* Users Table with full CRUD */}
              <ManageUsersTable 
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                currencyFilter={currencyFilter}
              />
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              {/* Admins Table (Read-only) */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  System Administrators
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  View-only list of system administrators. To manage admin accounts, use the System Settings page.
                </Typography>
                
                {admins.length > 0 ? (
                  <Box display="flex" flexDirection="column" gap={2}>
                    {admins.map((admin) => (
                      <Card key={admin.id} variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%' } }}>
                              <Typography variant="h6">{admin.name}</Typography>
                            </Box>
                            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 40%' } }}>
                              <Typography variant="body2" color="text.secondary">
                                {admin.email}
                              </Typography>
                            </Box>
                            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 20%' } }}>
                              <Chip 
                                label="Administrator" 
                                color="primary" 
                                size="small" 
                                variant="filled"
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No administrators found.
                  </Typography>
                )}
              </Box>
            </TabPanel>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ManageUsersPage;
