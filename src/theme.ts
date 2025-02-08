import { createTheme } from '@mui/material/styles';
import { defaultTheme } from "react-admin";

export const theme = createTheme(defaultTheme, {
  palette: {
    mode: 'light',
    primary: {
      main: '#007fff', // Toolpad's blue
    },
    secondary: {
      main: '#ff4081', // Accent color
    },
    background: {
      default: '#f4f6f8', // Light gray background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      letterSpacing: '0.0075em',
    },
  },
  components: {
    MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff', // White navbar
            color: '#000000', // Black text/icons
            boxShadow: 'none', // Remove the box shadow
            borderBottom: '1px solid #e0e0e0', // Add a light gray border at the bottom
          },
        },
      },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

