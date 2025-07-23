import { Box, Card, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface DashboardPiechartProps {
  dashboardData: {
    income: number;
    expense: number;
    balance: number;
    recentTransactions: any[];
  },
}

const DashboardPiechart: React.FC<DashboardPiechartProps> = ({dashboardData}) => {

    const [data, setData] = useState<any[]>([]);

    let userId: Number = 1;

    useEffect(() => {
        async function fetchPieChartData() {
            try {
                const response = await fetch(`https://localhost:7211/api/Dashboard/Piechart/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch pie chart data");
                }
                const result = await response.json();
                setData(result);
                console.log(result);
                // Assuming the result is in the same format as dataset
            } catch (error: any) {
                console.error(error);
            }
        }
        fetchPieChartData();
    },[dashboardData])

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
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            // flexDirection: "column",
            // height: "100%",
            textAlign: "center",
        }}>
            <PieChart 
                series={[
                    {
                        data: data,
                        innerRadius: 50,
                        outerRadius: 120,
                        paddingAngle: 0.5,
                        cornerRadius: 2,
                        highlightScope: {fade: 'global', highlight: 'item'},
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    }
                ]}
                width={400}
                height={400}
                slotProps={{
                    legend: {
                        direction: "row", position: {horizontal: "left", vertical: "bottom"},
                    
                    },
                }}
            />
        </Box>
    </Card>
  )
}

export default DashboardPiechart;