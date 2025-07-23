import { Box, Typography, Grid, ThemeProvider } from "@mui/material";
import { overviewList } from "./overview";
import theme from "../../../assets/styles/theme";
import React from "react";

interface DashboardOverviewProps {
  data: {
    income: number;
    expense: number;
    balance: number;
  };
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({data}) => {

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
              // pt: "15px",
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
                }}
                >
                  {item.name}
                </Typography>
              </Box>
              <Typography variant="h3" fontSize={28} sx={{
                [theme.breakpoints.between("mobile","desktop")]: {
                  fontSize: "20px",
                },
              }}
              >
                LKR {new Intl.NumberFormat('en-LK').format(data[item.key as keyof typeof data] ?? 0)}
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
                {/* {item.difference < 0 ? 
                  <Typography variant="body1" color="#EE3838" fontWeight="bold" sx={{
                    [theme.breakpoints.between("mobile","desktop")]: {
                      fontSize: "14px",
                    },
                  }}>
                    LKR {item.difference}
                  </Typography> : 
                  <Typography variant="body1" color="#19A23D" fontWeight="bold" sx={{
                    [theme.breakpoints.between("mobile","desktop")]: {
                      fontSize: "14px",
                    },
                  }}>
                    +LKR {item.difference}
                  </Typography>
                }
                <Typography variant="body1" sx={{
                  [theme.breakpoints.between("mobile","desktop")]: {
                    fontSize: "14px",
                  },
                }}>
                  than last month
                </Typography> */}
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