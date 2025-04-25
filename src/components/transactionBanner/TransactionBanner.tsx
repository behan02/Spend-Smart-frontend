import { Box, Button, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import theme from "../../assets/styles/theme";
import bannerImg from "../../assets/images/transactionBanner.png";
import { bannerContainerStyle } from "./transactionBannerStyles";

interface TransactionBannerProps {
    setAddTransaction: (clicked: boolean) => void;
    setRecurringTransaction: (clicked: boolean) => void;
}

const TransactionBanner: React.FC<TransactionBannerProps> = ({ setAddTransaction, setRecurringTransaction }) => {

    const matches: boolean = useMediaQuery('(max-width:900px)');

    return(
        <ThemeProvider theme={theme}>
            <Box sx={bannerContainerStyle}>
                <Box sx={{
                        m: "40px",
                    }}
                >
                    <Typography variant="body1" component="p">
                        Keep Your Finances on Track—Record Every Expense <br />
                        and Income with Ease! <br />
                        Effortlessly log your daily transactions to stay on top <br />
                        of your budget.
                    </Typography>
                    <Box sx={{
                            display: "flex", 
                            flexDirection: "row", 
                            gap: "10px",
                            [theme.breakpoints.between("mobile", "tablet")]: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                                alignItems: "center",
                            }
                        }}
                    >
                        <Button 
                            variant="contained"
                            disableRipple
                            onClick={()=>setAddTransaction(true)}
                            sx={{
                                bgcolor: "primary.main", 
                                borderRadius: "15px", 
                                mt: "15px",
                                [theme.breakpoints.between("mobile", "tablet")]: {
                                    width: "100%",
                                    fontSize: "14px",
                                }
                            }}
                        >
                            + Add transaction
                        </Button>
                        <Button 
                            variant="contained" 
                            disableRipple 
                            onClick={()=>setRecurringTransaction(true)}
                            sx={{
                                bgcolor: "primary.main", 
                                borderRadius: "15px", 
                                mt: "15px",
                                [theme.breakpoints.between("mobile", "tablet")]: {
                                    width: "100%",
                                    fontSize: "14px",
                                }
                            }}
                        >
                            + Add recurring transaction
                        </Button>
                    </Box>  
                </Box>
                <Box sx={{
                    [theme.breakpoints.between("mobile", "laptop")]: {
                        display: "none",
                    }
                }}>
                    <img src={bannerImg} alt="Banner Image" style={{
                            width: matches ? "200px" : "250px",
                            height: matches ? "200px" : "250px",
                        }}
                    />
                </Box>
            </Box>
        </ThemeProvider>    
    )
}

export default TransactionBanner;