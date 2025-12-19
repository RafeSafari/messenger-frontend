import { createTheme } from '@mui/material/styles';
import { darken, lighten } from '@mui/material/styles';

export const withVariants = (main: string) => {
  return {
    main,
    light: lighten(main, 0.3),
    lighter: lighten(main, 0.85),
    lightest: lighten(main, 0.92),
    dark: darken(main, 0.3),
    darker: darken(main, 0.25),
    darkest: darken(main, 0.15),
  };
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: withVariants('#1976d2'),
    secondary: withVariants('#9c27b0'),
    error: withVariants('#d32f2f'),
    warning: withVariants('#ed6c02'),
    info: withVariants('#0288d1'),
    success: withVariants('#2e7d32')
  },

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
