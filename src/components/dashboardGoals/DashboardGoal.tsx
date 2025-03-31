import { Box, Button, Card, Divider, LinearProgress, Typography } from "@mui/material";
import { colors, Goal, goalset } from "./goalset";

const DashboardGoal = () => {
  return (
    <Card sx={{ p: "20px", borderRadius: "15px", height: "100%"}}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "35px"
        }}>
            <Typography variant="h5" component="p" fontWeight="bold">Goal Status</Typography>
            <Button variant="text" size="small" sx={{textTransform: "none"}}>View all</Button>
        </Box>
        {goalset.map((item: Goal, index: number) => (
            <Box width="85%" m="auto" key={index}>
                <Typography variant="h6" component="p" fontSize="16px">{item.name}</Typography>
                <Typography variant="h6" component="p" fontSize="14px" color="rgba(0,0,0,0.6)">Target date {item.date.toLocaleDateString()}</Typography>
                <LinearProgress variant="buffer" value={item.progress} sx={{
                        height: "12px", 
                        borderRadius: "5px",
                        '& .MuiLinearProgress-bar': {
                            bgcolor: colors[index % 3],
                            borderRadius: "5px",
                        },
                        '& .MuiLinearProgress-bar2Buffer': {
                            bgcolor: "#E4E4E4",
                        }
                    }}
                >
                </LinearProgress>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "5px"
                }}>
                    <Typography variant="h6" component="p" fontSize="14px">Saved: LKR {item.saved}</Typography>
                    <Typography variant="h6" component="p" fontSize="12px">{item.progress}%</Typography>
                </Box>
                <Divider sx={{m: "18px 0px"}}/>
            </Box>
        ))}
    </Card>
  )
}

export default DashboardGoal;