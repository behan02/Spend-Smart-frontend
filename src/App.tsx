import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import ReportOverview from "../../Spend-Smart-frontend/src/pages/Report/ReportOverview";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
      <ReportOverview />
    </ThemeProvider>
  );
}

export default App;
