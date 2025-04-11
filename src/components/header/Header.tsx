import { NotificationsOutlined, Search } from "@mui/icons-material"
import { Box, InputAdornment, TextField, ThemeProvider, Typography } from "@mui/material"
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
                <TextField
                    id="input-with-icon-textfield"
                    type="search"
                    placeholder="Search"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                    size="small"
                    sx={{
                        [theme.breakpoints.between("mobile", "laptop")]: {
                            display: "none",
                        },
                    }}
                />
                <Search sx={{
                    [theme.breakpoints.up("laptop")]: {
                        display: "none",
                    },
                }}/>
                <NotificationsOutlined />
            </Box>
        </Box>
    </ThemeProvider>
  )
}

export default Header;