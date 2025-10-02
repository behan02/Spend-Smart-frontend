import { NotificationsOutlined } from "@mui/icons-material";
import { Box, ThemeProvider, Typography, IconButton, Avatar } from "@mui/material";
import theme from "../../assets/styles/theme";

interface TransactionHeaderProps {
  pageName: string;
}

const Header = ({ pageName }: TransactionHeaderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "40px",
          py: 2,
        }}
      >
        {/* Left Section - Page Title */}
        <Box>
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 700,
              color: "#023e8a",
              fontSize: "2rem",
              [theme.breakpoints.between("mobile", "tablet")]: {
                fontSize: "1.5rem",
              },
            }}
          >
            {pageName}
          </Typography>
        </Box>

        {/* Right Section - User Actions */}
        <Box 
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            [theme.breakpoints.between("mobile", "tablet")]: {
              gap: 1.5,
            },
          }}
        >
          {/* Notifications */}
          <IconButton
            sx={{
              width: 44,
              height: 44,
              backgroundColor: "#f8fafc",
              color: "#64748b",
              border: "1px solid #e2e8f0",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#023e8a",
                color: "#ffffff",
                borderColor: "#023e8a",
              },
            }}
          >
            <NotificationsOutlined />
          </IconButton>

          {/* User Avatar */}
          <Avatar
            sx={{
              width: 44,
              height: 44,
              backgroundColor: "#023e8a",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 15px rgba(2, 62, 138, 0.3)",
              },
            }}
          >
            U
          </Avatar>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Header;