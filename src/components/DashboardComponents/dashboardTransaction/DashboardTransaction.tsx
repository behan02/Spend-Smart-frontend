import { Box, Button, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import theme from "../../../assets/styles/theme";
import { DeleteOutline } from "@mui/icons-material";
import CategoryIcons, { iconType } from "../../../assets/categoryIcons/CategoryIcons";

interface Transaction {
    type: string;
    category: string;
    date: string;
    description: string;
    amount: number;
}

interface DashboardTransactionProps {
    data: Transaction[];
}

const DashboardTransaction: React.FC<DashboardTransactionProps> = ({data}) => {

    const isTabletOrDesktop: boolean = useMediaQuery(theme.breakpoints.down("laptop"));

    return (
        <ThemeProvider theme={theme}>
                <Card sx={{ p: "20px", borderRadius: "15px", height: "100%"}}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: "35px"
                    }}>
                        <Typography variant="h5" component="p" fontWeight="bold">Recent Transactions</Typography>
                        <Button variant="text" size="small" sx={{textTransform: "none"}}>View all</Button>
                    </Box>
                    <Box mt="30px" sx={{
                        [theme.breakpoints.between("mobile","tablet")]: {
                            display: "none",
                        }
                    }}
                    >
                        <TableContainer sx={{borderRadius: "15px"}}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Type</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Category</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Date</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Description</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {data.map((list: Transaction, index: number) => (
                                    <TableRow 
                                        key={index} 
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{textAlign: "center"}}>{CategoryIcons.map((item: iconType, iconIndex: number) => (
                                                list.category === item.category ? <item.icon key={iconIndex} sx={{color: item.color}}/> : null
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.type}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.category}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.date}</Typography>
                                        </TableCell>
                                        <TableCell sx={{wordBreak: "break-word", whiteSpace: "normal", maxWidth: "250px"}}>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.description}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                            >
                                                <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p" sx={{
                                                    color: list.type === "Income" ? "#19A23D" : "#EE3838",
                                                    fontWeight: "bold",
                                                }}
                                                >
                                                    {list.amount}
                                                </Typography>
                                                <IconButton>
                                                    <DeleteOutline fontSize="medium"/>
                                                </IconButton>
                                            </Box>  
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    
                    {/* Mobile view */}
                    <Box mt="30px" sx={{
                        [theme.breakpoints.between("mobile", "tablet")]: {
                            display: "block",
                        },
                        [theme.breakpoints.up("tablet")]: {
                            display: "none"
                        }
                    }}
                    >
                        <TableContainer sx={{borderRadius: "15px"}}>
                            <Table aria-label="simple table">
                                <TableBody>
                                {data.map((list: Transaction, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{textAlign: "center"}}>{CategoryIcons.map((item: iconType, iconIndex: number) => (
                                                        list.category === item.category ? <item.icon key={iconIndex} sx={{color: item.color}}/> : null
                                                    ))}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" component="p">{list.category}</Typography>
                                            <Typography variant="body2" component="p">{list.type}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" component="p">{list.date}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            }}>
                                            <Typography variant="body2" component="p" sx={{
                                                color: list.type === "Income" ? "#19A23D" : "#EE3838",
                                                fontWeight: "bold",
                                            }}
                                            >
                                                {list.amount}
                                            </Typography>
                                            <IconButton>
                                                <DeleteOutline fontSize="small"/>
                                            </IconButton>
                                            </Box>  
                                        </TableCell>
                                        {/* <TableCell><DeleteOutline /></TableCell> */}
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Card>
        </ThemeProvider>
    )
}

export default DashboardTransaction;