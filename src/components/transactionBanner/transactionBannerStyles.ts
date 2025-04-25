import { SxProps } from "@mui/material";
import theme from "../../assets/styles/theme";

const bannerContainerStyle: SxProps = {
    mt: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "#7C9AC1",
    width: "80%",
    borderRadius: "15px",
    padding: "1px",
    [theme.breakpoints.between("mobile", "laptop")]: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",  
    },
    // [theme.breakpoints.between("mobile", "tablet")]: {
    //     justifyContent: "center",
    //     textAlign: "center",
    // }
}

export {bannerContainerStyle};