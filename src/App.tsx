import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  )

}

export default App;