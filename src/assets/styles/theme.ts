import { createTheme, Theme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true;
        tablet: true;
        laptop: true;
        desktop: true;
    }
}
  
const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#023E8A'
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif', 
    },
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 426,
            laptop: 769,
            desktop: 1024,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                },
                body: {
                    backgroundColor: '#F6F6F8',
                }
            }
        }
    }
})

export default theme;