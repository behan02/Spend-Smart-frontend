import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
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
import React from "react";
import { Link } from "react-router-dom";
import theme from "../../assets/styles/theme";

// ✅ Define a type for menu items
interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

// ✅ Type menuItems
const menuItems: MenuItem[] = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/", },
  { text: "Report", icon: <SummarizeIcon />, path: "/report" },
  { text: "Budget", icon: <AccountBalanceWallet />, path: "/budget" },
  { text: "Goals", icon: <Flag />, path: "/goals" },
  { text: "Transaction", icon: <Receipt />, path: "/transaction" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
  { text: "Logout", icon: <ExitToApp />, path: "/logout" },
];

// ✅ Sidebar component typed
const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        height: 1117,
        flexShrink: 0,
        [theme.breakpoints.between("mobile","laptop")]: {
          display: "none",

        },
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: "border-box",
          background: "#023e8a",
          color: "#fff",
        },
      }}
    >
      <Box
        component="img"
        src={Logo}
        alt="site logo"
        sx={{ width: 150, height: 200, padding: 5 }}
      />
      
      <List>
        {menuItems.map((item) => (
          <Link to={item.path} style={{ textDecoration: "none" }}>
          <ListItemButton
            key={item.text}
            sx={{
              color: "white",
              backgroundColor: "#023e8a",
              borderRadius: 30,
              "&:hover": {
                backgroundColor: "white",
                borderRadius: 30,
                color: "#023e8a",
              },
              "&:hover .icon": {
                color: "#023e8a",
              },
            }}
          >
            <ListItemIcon className="icon" sx={{ color: "#fff" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
