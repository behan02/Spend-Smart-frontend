import { SxProps } from "@mui/material";
import theme from "../../assets/styles/theme";

const filterContainerStyle: SxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    mt: "30px",
    [theme.breakpoints.between("mobile", "tablet")]: {
        flexDirection: "column",
        alignItems: "flex-start",
    }
}

export {filterContainerStyle};