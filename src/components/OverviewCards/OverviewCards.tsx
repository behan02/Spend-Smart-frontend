import { Box, Card, Typography } from '@mui/material';

const cards = [
  { title: "Total Users", number: "7,265", change: "+11.39%", color: "#A5D6A7" },
  { title: "Active Users", number: "3,671", change: "+6.84%", color: "#90CAF9" },
  { title: "Inactive Users", number: "148", change: "-2.17%", color: "#FFAB91" },
  { title: "New Users", number: "256", change: "+14.44%", color: "#E1BEE7" },
];

const OverviewCards = () => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      {cards.map((card, index) => (
        <Card key={index} sx={{ backgroundColor: card.color, flex: '1 1 200px', p: 2 }}>
          <Typography variant="h6">{card.title}</Typography>
          <Typography variant="h4" fontWeight="bold">{card.number}</Typography>
          <Typography variant="body2">{card.change}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default OverviewCards;
