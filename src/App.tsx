import { BrowserRouter } from "react-router-dom";
import './App.css';

import theme from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Routes from "./Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
