import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import MoneyOffCsredRoundedIcon from "@mui/icons-material/MoneyOffCsredRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";

const cardData = [
  {
    title: "Total Income",
    value: "LKR 8000",
    icon: <PaidRoundedIcon fontSize="large" color="primary" />,
  },
  {
    title: "Total Expenses",
    value: "LKR 3500",
    icon: <MoneyOffCsredRoundedIcon fontSize="large" color="error" />,
  },
  {
    title: "Total Savings",
    value: "LKR 1500",
    icon: <SavingsRoundedIcon fontSize="large" color="success" />,
  },
  {
    title: "Budget Utilization",
    value: "25%",
    icon: <PieChartRoundedIcon fontSize="large" color="warning" />,
  },
];

function Cards() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={15} sx={{ width: "100%", ml: 35, mt: -140 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={9} md={6} key={index}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  {card.icon}
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                </Box>
                <Box
                  alignItems={"center"}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography variant="h6" fontWeight={600}>
                    {card.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Cards;
