// import { Box, Typography } from "@mui/material"
// import { overviewList } from "./overview";

// const DashboardOverview = () => {
//   return (
//     <Box>
//         <Typography variant="h4" mb={3}>Overview</Typography>
//         <Box sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "center",
//             justifyContent: "space-between",
//         }}>
//             {overviewList.map((item)=>(
//                 <Box sx={{
//                     width: "280px",
//                     height: "160px",
//                     bgcolor: item.color,
//                     borderRadius: "15px ",
//                     pt: "15px",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: "5px"
//                 }}>
//                     <Box sx={{
//                         display: "flex",
//                         gap: "5%",
//                         alignItems: "center",
//                     }}>
//                         <item.icon />
//                         <Typography variant="h5" color="rgba(0,0,0,0.7)">{item.name}</Typography>
//                     </Box>
//                     <Typography variant="h3" fontSize={28}>LKR {item.amount}</Typography>
//                     <Box sx={{
//                         display: "flex",
//                         flexDirection: "row",
//                         alignItems: "center",
//                         gap: "5px"
//                     }}>
//                         {item.difference < 0 ? 
//                             <Typography variant="body1" color="#EE3838" fontWeight="bold">LKR {item.difference}</Typography>: 
//                             <Typography variant="body1" color="#19A23D" fontWeight="bold">+LKR {item.difference}</Typography>
//                         }
//                         <Typography variant="body1">than last month</Typography>
//                     </Box>
//                 </Box>
//             ))}
//         </Box>
//     </Box>
//   )
// }

// export default DashboardOverview;

import { Box, Typography, Grid, ThemeProvider } from "@mui/material";
import { overviewList } from "./overview";
import theme from "../../assets/styles/theme";

const DashboardOverview = () => {
  return (
    <ThemeProvider theme={theme}>
    <Box>
      <Typography variant="h5" mb={3} sx={{
        [theme.breakpoints.between("mobile","tablet")]: {
          fontSize: "20px",
        },
      }}>
        Overview
      </Typography>
      <Grid container spacing={3}>
        {overviewList.map((item) => (
          <Grid item mobile={6} tablet={6} laptop={3} desktop={3} key={item.name}>
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
                LKR {item.amount}
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
                {item.difference < 0 ? 
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
                </Typography>
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