import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette:{
        primary:{
            main:'#F3F3F4'
        },
        secondary:{
            main:'#E33183'
        }
    }
})
const Theme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default Theme;