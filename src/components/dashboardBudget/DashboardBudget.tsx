import { Box, Button, Card, LinearProgress, ThemeProvider, Typography } from "@mui/material";
import { Budget, budgetset } from "./budgetset";
import theme from "../../assets/styles/theme";

const DashboardBudget = () => {
  return (
    <ThemeProvider theme={theme}>
        <Card sx={{ p: "20px", borderRadius: "15px", height: "100%"}}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "35px"
            }}>
                <Typography variant="h5" component="p" fontWeight="bold">Budget Status</Typography>
                <Button variant="text" size="small" sx={{textTransform: "none"}}>View all</Button>
            </Box>
            {budgetset.map((set: Budget, index: number)=>(
                <Box width="85%" m="0px auto 35px" key={index}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Typography variant="h6" component="p" fontSize="16px">{set.name}</Typography>
                        <Typography variant="h6" component="p" fontSize="12px">{set.status}</Typography>
                    </Box>
                    <LinearProgress variant="buffer" value={set.progress} sx={{
                            height: "12px", 
                            borderRadius: "5px",
                            '& .MuiLinearProgress-bar': {
                                bgcolor: index % 2 === 0 ? "primary" : "#0096C7",
                                borderRadius: "5px"
                            },
                            '& .MuiLinearProgress-bar2Buffer': {
                                bgcolor: "#E4E4E4"
                            }
                        }}
                    >
                    </LinearProgress>
                    <Typography variant="h6" component="p" fontSize="12px" textAlign="right">{set.progress}%</Typography>
                </Box>
            ))}
        </Card>
    </ThemeProvider>
  )
}

export default DashboardBudget;