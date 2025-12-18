import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },

    // ✅ MUI Link customization
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          '&:visited': {
            color: 'inherit',
          },
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },

    // ✅ Native <a> tags (important!)
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          color: 'inherit',

          '&:visited': {
            color: 'inherit',
          },

          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

export default theme;
