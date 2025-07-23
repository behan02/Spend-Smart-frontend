import { Box, Card, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import React from "react";
import { useUser } from "../../../context/UserContext";

interface DashboardBargraphProps {
  dashboardData: {
    income: number;
    expense: number;
    balance: number;
    recentTransactions: any[];
  },
}

const DashboardBargraph: React.FC<DashboardBargraphProps> = ({dashboardData}) => {

  //State to manage the selected time period for the bar graph
  const [timeperiod, setTimeperiod] = useState<string>("Monthly");
  const [data, setData] = useState<any[]>([]);
  const { userId } = useUser();

  const handleChange = (e: SelectChangeEvent) => {
    setTimeperiod(e.target.value);
  }

  

  useEffect(() => {
    async function fetchBarGraphData(){
      try{
        const response = await fetch(`https://localhost:7211/api/Dashboard/Bargraph/${userId}/${timeperiod}`);
        if(!response.ok){
          throw new Error("Failed to fetch bar graph data");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      }catch(error: any){
        console.error(error);
      }
    }
    fetchBarGraphData();
  },[timeperiod, dashboardData]);

  return (
    <Card sx={{ p: "20px", borderRadius: "15px", height: "100%"}}>
      {/* Header with title and select dropdown for time period */}
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h5" component="p" fontWeight="bold">Statistics</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={timeperiod}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            size="small"
            sx={{borderRadius: "15px"}}
          >
            {/* <MenuItem value="Weekly">Weekly</MenuItem> */}
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bar chart section */}
      <BarChart
          dataset={data} // Data for the bar chart
          xAxis={[{ scaleType: 'band', dataKey: "period", }]} // X-axis data          
          series={[
              { dataKey: 'income', label: 'Income', color: "#0077B6"},
              { dataKey: 'expense', label: 'Expense', color: "#00B4D8"},
          ]}
          borderRadius={8}
          height={350}
      />
    </Card>
  )
}

export default DashboardBargraph;