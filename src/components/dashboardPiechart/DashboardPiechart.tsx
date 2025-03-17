import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { dataset } from "./dataset";

const DashboardPiechart = () => {
  return (
    <Box 
        bgcolor="#fff" 
        borderRadius="15px" 
        p="20px" 
        height="100%"
    >
        <Typography variant="h5" component="p" fontWeight="bold">Expense Structure</Typography>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            // margin: "auto",
            height: "100%"
        }}>
            <PieChart 
                series={[
                    {
                        data: dataset,
                        innerRadius: 50,
                        paddingAngle: 0.5,
                        cornerRadius: 2,
                    }
                ]}
                width={400}
                height={270}
                slotProps={{
                    legend: {direction: "column", position: {horizontal: "right", vertical: "top"}}
                }}
            />
        </Box>
    </Box>
  )
}

export default DashboardPiechart;