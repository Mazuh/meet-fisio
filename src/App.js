import "./App.css";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";
import Counter from "./Counter";

export default function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box component="main">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Timer ⏱️" {...a11yProps(0)} />
            <Tab label="Stopwatch ⌛" {...a11yProps(1)} />
            <Tab label="Counter ✋" {...a11yProps(2)} />
            <Tab label="ℹ️" aria-label="About it" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Timer />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stopwatch />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Counter />
        </TabPanel>
        <TabPanel value={value} index={3} sx={{ maxWidth: "400px" }}>
          Made by Mazuh under MIT License and available at GitHub{" "}
          <Link target="_blank" href="https://github.com/Mazuh/meet-fisio">
            Mazuh/meet-fisio
          </Link>{" "}
          repository.
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3, display: value === index ? "block" : "none" }}>
        {children}
      </Box>
    </Box>
  );
}
