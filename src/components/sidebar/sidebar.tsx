import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SummarizeIcon from "@mui/icons-material/Summarize";
import {
  AccountBalanceWallet,
  Flag,
  Receipt,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import Logo from "../../assets/images/logo/Logo.png";
import React, { useState } from "react";

// Define a type for menu items
interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

// Type menuItems with optional badges
const menuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  { 
    text: "Report", 
    icon: <SummarizeIcon />, 
    path: "/report",
  
  },
  { 
    text: "Budget", 
    icon: <AccountBalanceWallet />, 
    path: "/budget" 
  },
  { 
    text: "Goals", 
    icon: <Flag />, 
    path: "/goals",
  },
  { 
    text: "Transaction", 
    icon: <Receipt />, 
    path: "/transaction" 
  },
  { 
    text: "Settings", 
    icon: <Settings />, 
    path: "/settings" 
  },
  { 
    text: "Logout", 
    icon: <ExitToApp />, 
    path: "/" 
  },
];


const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: "border-box",
          background: "#ffffff",
          border: "none",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          px: 2,
          background: "#ffffff",
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="SpendSmart Logo"
          sx={{
            width: 120,
            height: 150,
            mb: 1,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ px: 2, py: 3 }}>
       

        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => {
            const isActive = activeItem === item.text;
            const isLogout = item.text === "Logout";

            return (
              <React.Fragment key={item.text}>
                {isLogout && (
                  <Divider 
                    sx={{ 
                      my: 2, 
                      mx: 2, 
                      borderColor: "rgba(100, 116, 139, 0.2)" 
                    }} 
                  />
                )}
                
                <ListItemButton
                  onClick={() => setActiveItem(item.text)}
                  sx={{
                    mx: 1,
                    mb: 1,
                    borderRadius: 3,
                    minHeight: 48,
                    color: isActive ? "#ffffff" : "#475569",
                    backgroundColor: isActive
                      ? "#023e8a"
                      : "transparent",
                    background: isActive
                      ? "#023e8a"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 4px 12px rgba(2, 62, 138, 0.4)"
                      : "none",
                    transform: isActive ? "translateY(-1px)" : "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "#023e8a"
                        : "rgba(2, 62, 138, 0.08)",
                      background: isActive
                        ? "#023e8a"
                        : "rgba(2, 62, 138, 0.08)",
                      transform: "translateY(-2px)",
                      boxShadow: isActive
                        ? "0 6px 20px rgba(2, 62, 138, 0.4)"
                        : "0 2px 8px rgba(2, 62, 138, 0.15)",
                      "& .MuiListItemIcon-root": {
                        color: isActive ? "#ffffff" : "#023e8a",
                        transform: "scale(1.1)",
                      },
                      "& .MuiListItemText-primary": {
                        color: isActive ? "#ffffff" : "#334155",
                        fontWeight: 600,
                      },
                    },
                    "&:active": {
                      transform: "translateY(0px)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#ffffff" : "#64748b",
                      minWidth: 40,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.95rem",
                        fontWeight: isActive ? 600 : 500,
                        transition: "all 0.3s ease",
                      },
                    }}
                  />
                  
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.7rem",
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 0.2)"
                          : "#023e8a",
                        color: isActive ? "#ffffff" : "#ffffff",
                        fontWeight: 600,
                        minWidth: item.badge.length === 1 ? 20 : "auto",
                        "& .MuiChip-label": {
                          px: item.badge.length === 1 ? 0 : 1,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      {/* Bottom User Section */}
      <Box
        sx={{
          mt: "auto",
          p: 2,
          background: "#ffffff",
          borderTop: "1px solid rgba(2, 62, 138, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderRadius: 2,
            background: "rgba(2, 62, 138, 0.05)",
            border: "1px solid rgba(2, 62, 138, 0.1)",
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: "#023e8a",
              mr: 2,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            U
          </Avatar>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#334155",
                fontSize: "0.9rem",
              }}
            >
              User Name
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#64748b",
                fontSize: "0.75rem",
              }}
            >
              Free Plan
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;