import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import ReportImage from "../../assets/images/Report-amico.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import ReportTable from "../../components/ReportOverview/ReportTable";
import GenerateReport from "../../components/ReportOverview/GenerateReport";
import Sidebar from "../../components/sidebar/sidebar";

const ReportOverview: React.FC = () => {
  return (
    <Box display="flex">
      <Sidebar />

      <Box sx={{  flexGrow: 1 }}>
        <Header pageName="Report Overview" />

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#023E8A80"
          borderRadius={4}
          p={4}
          width="80%"
        
          //height={{ xs: "auto", md: "auto" }}
          height="280px"
          mx="auto"
          mt={2}
        >
          {/* Text Content */}
          <Box textAlign={{ xs: "center", md: "left" }} mb={{ xs: 4, md: 0 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              }}
            >
              Hello!
            </Typography>
            <Box>
              <Typography
                gutterBottom
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                }}
              >
                Tailor your report to perfection.
              </Typography>

              <Typography
                gutterBottom
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                }}
              >
                Choose any date range you need and get the insights that matter
                most to you!
              </Typography>
            </Box>
            <GenerateReport />
          </Box>

          {/* Image */}
          <Box
            component="img"
            src={ReportImage}
            alt="Report Illustration"
            sx={{
              width: { xs: "80%", sm: "60%", md: "50%" },
              maxWidth: "345px",
              height: "auto",
              display: "block",
              mx: "auto",
            }}
          />
        </Box>
        

        {/* Report Table Section */}


          <Box sx={{ mt: 7 }}>
            <ReportTable />
          </Box>

        {/* Footer */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ width: "100%" }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportOverview;
