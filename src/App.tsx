
import { Box } from '@mui/material';
import GoalsPage from './pages/Goals';
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";


function App() {

  return (

     <ThemeProvider theme={theme}>
      <GoalsPage />
    </ThemeProvider>

  )
}

export default App;
