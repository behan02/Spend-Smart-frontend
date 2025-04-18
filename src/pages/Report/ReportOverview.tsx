import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ReportImage from "../../assets/images/Report-amico.png";

const ReportOverview: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#023E8A80"
      borderRadius={4}
      px={6}
      gap={4}
      mx={15}
    >
      <Box maxWidth="400px">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hello!
        </Typography>
        <Typography variant="body1" gutterBottom fontStyle={"poppins"}>
          Tailor your report to perfection.
        </Typography>
        <Typography variant="body1" gutterBottom fontStyle={"poppins"}>
          choose any date range you need and
        </Typography>
        <Typography variant="body1" gutterBottom fontStyle={"poppins"}>
          get the insights that matter most to you!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: "16px", px: 3 }}
        >
          Generate Report
        </Button>
      </Box>

      <Box
        component="img"
        src={ReportImage}
        alt="Report Illustration"
        width="100%"
        maxWidth="300px"
        height="300px"
      />
    </Box>
  );
};

export default ReportOverview;
