import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import ReportOverview from "../../Spend-Smart-frontend/src/pages/Report/ReportOverview";
import Header from "../../Spend-Smart-frontend/src/components/header/header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header pageName="Report Overview" />
      <ReportOverview />
    </ThemeProvider>
  );
}

export default App;
