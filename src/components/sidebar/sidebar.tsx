import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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

//  Define a type for menu items
interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Report", icon: <SummarizeIcon />, path: "/report" },
  { text: "Budget", icon: <AccountBalanceWallet />, path: "/budget" },
  { text: "Goals", icon: <Flag />, path: "/goals" },
  { text: "Transaction", icon: <Receipt />, path: "/transaction" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
  { text: "Logout", icon: <ExitToApp />, path: "/logout" },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openState: boolean) => () => {
    setOpen(openState);
  };

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Swipeable Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ModalProps={{ keepMounted: true }} // better performance on mobile
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 280,
            boxSizing: "border-box",
            background: "#fff",
            color: "#023e8a",
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
            <ListItemButton
              key={item.text}
              sx={{
                color: "#023e8a",
                backgroundColor: "#fff",
                borderRadius: 30,
                "&:hover": {
                  backgroundColor: "gray",
                  color: "#fff",
                },
                "&:hover .icon": {
                  color: "#fff",
                },
              }}
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon className="icon" sx={{ color: "#023e8a" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

