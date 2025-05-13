import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

function PieChart() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        ml: 35,
        mt: -110,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Total Budget Breakdown
      </Typography>
      <MUIPieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Foods" },
              { id: 1, value: 15, label: "Transport" },
              { id: 2, value: 20, label: "Groceries" },
            ],

            outerRadius: 100,
          },
        ]}
        width={400}
        height={300}
      />
    </Box>
  );
}

export default PieChart;
