import { Box, Card, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { dataset } from "./dataset";
import { useState } from "react";

const DashboardBargraph: React.FC = () => {

  //State to manage the selected time period for the bar graph
  const [timeperiod, setTimeperiod] = useState<string>("");

  const handleChange = (e: SelectChangeEvent) => {
    setTimeperiod(e.target.value);
  }

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
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bar chart section */}
      <BarChart
          dataset={dataset} // Data for the bar chart
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
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