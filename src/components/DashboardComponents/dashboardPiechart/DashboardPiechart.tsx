import { Box, Card, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { dataset } from "./dataset";

const DashboardPiechart = () => {
  return (
    // <Box 
    //     bgcolor="#fff" 
    //     borderRadius="15px" 
    //     p="20px" 
    //     height="100%"
    // >
    <Card sx={{ p: "20px", borderRadius: "15px", height: "100%"}}>
        <Typography variant="h5" component="p" fontWeight="bold">Expense Structure</Typography>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
        }}>
            <PieChart 
                series={[
                    {
                        data: dataset,
                        innerRadius: 50,
                        outerRadius: 120,
                        paddingAngle: 0.5,
                        cornerRadius: 2,
                    }
                ]}
                width={400}
                height={400}
                slotProps={{
                    legend: {direction: "column", position: {horizontal: "right", vertical: "middle"}}
                }}
            />
        </Box>
    </Card>
  )
}

export default DashboardPiechart;