import { NotificationsOutlined, Search } from "@mui/icons-material"
import { Box, InputAdornment, TextField, Typography } from "@mui/material"

const TransactionHeader = () => {
  return (
    <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }}>
        <Box>
            <Typography variant="h4">Transaction</Typography>
        </Box>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5%"
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
            />
            <NotificationsOutlined />
        </Box>
    </Box>
  )
}

export default TransactionHeader;