import { Box, Typography, Grid, ThemeProvider } from "@mui/material";
import { overviewList } from "./overview";
import theme from "../../../assets/styles/theme";
import React, { useEffect, useState } from "react";

interface DashboardOverviewProps {
  data: {
    income: number;
    expense: number;
    balance: number;
  };
  userId: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ data, userId }) => {
  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTotalSavings();
  }, [userId]);

  const fetchTotalSavings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://localhost:7211/api/Goal/GetTotalSavingsAmount/${userId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch total savings");
      }
      
      const savingsAmount = await response.json();
      setTotalSavings(savingsAmount);
    } catch (error: any) {
      console.error("Error fetching total savings:", error);
      setTotalSavings(0); // Set to 0 if error occurs
    } finally {
      setLoading(false);
    }
  };

  // Create enhanced data object that includes savings
  const enhancedData = {
    ...data,
    savings: totalSavings
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Overview Title */}
        <Typography variant="h5" mb={3} sx={{
          [theme.breakpoints.between("mobile","tablet")]: {
            fontSize: "20px", // Adjust font size for smaller screens
          },
        }}>
          Overview
        </Typography>

        {/* Grid Container for Overview Cards */}
        <Grid container spacing={3}>
          {overviewList.map((item) => (
            <Grid size={{mobile:6, tablet:6, laptop:3, desktop:3}} key={item.name}>
              <Box sx={{
                width: "100%",
                height: "160px",
                bgcolor: item.color,
                borderRadius: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px"
              }}>
                <Box sx={{
                  display: "flex",
                  gap: "5%",
                  alignItems: "center",
                }}>
                  <item.icon sx={{
                    [theme.breakpoints.between("mobile","laptop")]: {
                      fontSize: "18px",
                    },
                  }}/>
                  <Typography variant="h5" color="rgba(0,0,0,0.7)" sx={{
                    [theme.breakpoints.between("mobile","desktop")]: {
                      fontSize: "18px",
                    },
                  }}>
                    {item.name}
                  </Typography>
                </Box>
                <Typography variant="h3" fontSize={28} sx={{
                  [theme.breakpoints.between("mobile","desktop")]: {
                    fontSize: "20px",
                  },
                }}>
                  {item.key === 'savings' && loading ? (
                    "Loading..."
                  ) : (
                    `LKR ${new Intl.NumberFormat('en-LK').format(
                      enhancedData[item.key as keyof typeof enhancedData] ?? 0
                    )}`
                  )}
                </Typography>
                <Box sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                  [theme.breakpoints.between("mobile","desktop")]: {
                    flexDirection: "column",
                    gap: "0px",
                    mt: "5px",
                  }
                }}>
                  {/* Future: You can add savings growth percentage here */}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardOverview;