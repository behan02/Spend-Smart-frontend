import {
  areaElementClasses,
  LineChart,
  lineElementClasses,
} from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export default function BalanceAreaChart() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        mt: 2,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <LineChart
        height={300}
        width={600}
        series={[
          {
            data: uData,
            label: "Income",
            area: true,
            showMark: false,
            color: "blue",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ min: 0, max: 10000 }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: "blue",
          },
          [`& .${areaElementClasses.root}`]: {
            fill: "rgba(255, 0, 111, 0.3)",
          },
        }}
        margin={margin}
      />
    </Box>
  );
}
