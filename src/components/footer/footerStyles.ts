import { SxProps } from "@mui/material";
import theme from "../../assets/styles/theme";

const footerStyles: SxProps = {
    display: 'flex',
    margin: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'primary.main',
    padding: '20px 0px 20px 0px',
    color: 'rgba(255, 255, 255, 0.8)',
    ml: 31,
   
    [theme.breakpoints.down('laptop')]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "20px",
    },
}

const footerButtonContainerStyles: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
};

export { footerStyles, footerButtonContainerStyles };