import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import theme from "../../../assets/styles/theme";
import CategoryIcons, { iconType } from "../../../assets/categoryIcons/CategoryIcons";
import { useState } from "react";

interface Transaction {
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    description: string;
}

interface DashboardTransactionProps {
  data: Transaction[];
  onDelete?: (id: number) => Promise<void>; // Add onDelete prop
    userId: number; // Add userId prop
}

const DashboardTransaction: React.FC<DashboardTransactionProps> = ({ data, onDelete, userId }) => {
    const isTabletOrDesktop: boolean = useMediaQuery(theme.breakpoints.down("laptop"));

    const handleDelete = async (id: number) => {
        if (onDelete) {
            await onDelete(id);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR'
        }).format(amount);
    };

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
                                {data.map((transaction: Transaction, index: number) => (
                                    <TableRow key={transaction.id || index}>
                                        {/* <TableCell sx={{textAlign: "center"}}>{CategoryIcons.map((item: iconType, iconIndex: number) => (
                                                list.category === item.category ? <item.icon key={iconIndex} sx={{color: item.color}}/> : null
                                            ))}
                                        </TableCell> */}
                                        <TableCell sx={{textAlign: "center"}}>
                                            {CategoryIcons.map((item: iconType, iconIndex: number) => (
                                                    transaction.category === item.category ? (
                                                        <Box
                                                            key={iconIndex}
                                                            sx={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: "50%",
                                                                backgroundColor: item.color,
                                                            }}
                                                        >
                                                            <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                                                        </Box>
                                                    ) : null
                                                ))}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{transaction.type}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{transaction.category}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{transaction.date}</Typography>
                                        </TableCell>
                                        <TableCell sx={{wordBreak: "break-word", whiteSpace: "normal", maxWidth: "250px"}}>
                                            <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{transaction.description}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                            >
                                                <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p" sx={{
                                                    color: transaction.type === "Income" ? "#19A23D" : "#EE3838",
                                                    fontWeight: "bold",
                                                }}
                                                >
                                                    {formatCurrency(transaction.amount)}
                                                </Typography>
                                                <IconButton onClick={() => handleDelete(transaction.id)}>
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
                                {data.map((transaction: Transaction, index: number) => (
                                    <TableRow key={transaction.id || index}>
                                        {/* <TableCell sx={{textAlign: "center"}}>{CategoryIcons.map((item: iconType, iconIndex: number) => (
                                                        list.category === item.category ? <item.icon key={iconIndex} sx={{color: item.color}}/> : null
                                                    ))}
                                        </TableCell> */}
                                        <TableCell sx={{textAlign: "center"}}>
                                            {CategoryIcons.map((item: iconType, iconIndex: number) => (
                                            transaction.category === item.category ? (
                                                <Box
                                                key={iconIndex}
                                                sx={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: "50%",
                                                    backgroundColor: item.color,
                                                }}
                                                >
                                                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                                                </Box>
                                            ) : null
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" component="p">{transaction.category}</Typography>
                                            <Typography variant="body2" component="p">{transaction.type}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" component="p">{transaction.date}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            }}>
                                            <Typography variant="body2" component="p" sx={{
                                                color: transaction.type === "Income" ? "#19A23D" : "#EE3838",
                                                fontWeight: "bold",
                                            }}
                                            >
                                                ${transaction.amount}
                                            </Typography>
                                            <IconButton onClick={() => handleDelete(transaction.id)}>
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