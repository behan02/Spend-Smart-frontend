import { Box, Button, Link, ThemeProvider, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";
import { footerStyles, footerButtonContainerStyles } from "./footerStyles";

const Footer: React.FC = () => {
  const buttons: string[] = [
    "Dashboard",
    "Transaction",
    "Budget",
    "Goals",
    "Report",
    "Settings",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={footerStyles}>
        <Box>
          <Typography variant="body1" component="p" lineHeight="25px">
            Take control of your money effortlessly. <br />
            Track expenses, analyze budgets, and <br />
            achieve your financial goals with ease. <br />
            Smart Spent makes every penny count!
          </Typography>
        </Box>
        <Box sx={footerButtonContainerStyles}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant="text"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              {button}
            </Button>
          ))}
        </Box>
        <Box>
          <Link
            href="#"
            underline="hover"
            color="rgba(255, 255, 255, 0.8)"
            variant="body2"
          >
            {"Contact us: example123@gmail.com"}
          </Link>
          <Typography variant="body2" component="p" mt={1}>
            © {new Date().getFullYear()} Spend Smart. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
