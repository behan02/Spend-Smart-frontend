import { Box, Card, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { dataset } from "./dataset";
import { useState } from "react";

const DashboardBargraph: React.FC = () => {

  const [age, setAge] = useState<string>("");

  const handleChange = (e: SelectChangeEvent) => {
    setAge(e.target.value);
  }

  return (
    // <Box
    //     bgcolor= "#fff"
    //     width= "100%"
    //     borderRadius= "15px"
    //     padding= "20px"
    //     height= "100%"
    // >
    <Card sx={{ p: "20px", borderRadius: "15px", height: "100%"}}>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h5" component="p" fontWeight="bold">Statistics</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            size="small"
          >
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                { dataKey: 'income', label: 'Income', color: "#0077B6"},
                { dataKey: 'expense', label: 'Expense', color: "#00B4D8"},
            ]}
            borderRadius={8}
            // width={800}
            height={350}
        />
    </Card>
  )
}

export default DashboardBargraph;