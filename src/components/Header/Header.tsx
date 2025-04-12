import { NotificationsOutlined } from "@mui/icons-material";
import { Box, ThemeProvider, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";

interface TransactionHeaderProps {
  pageName: string;
}

const Header = ({ pageName }: TransactionHeaderProps) => {
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "40px",
        }}>
            <Box>
                <Typography variant="h4" sx={{
                    [theme.breakpoints.between("mobile", "tablet")]: {
                        fontSize: "26px",
                    },
                }}>{pageName}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "5%",
                [theme.breakpoints.between("mobile", "tablet")]: { 
                    gap: "10%",
                },
            }}>
                <NotificationsOutlined />
            </Box>
        </Box>
    </ThemeProvider>
  )
}

export default Header;