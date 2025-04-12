
import { Box } from '@mui/material';
import GoalsPage from './pages/Goals';
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import Dashboard from './pages/Dashboard/Dashboard';


function App() {

  return (

     <ThemeProvider theme={theme}>
      {/* <GoalsPage /> */}
      <Dashboard />
    </ThemeProvider>

  )
}

export default App;
