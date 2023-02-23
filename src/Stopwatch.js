import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Stopwatch() {
  const [startedAt, setStartedAt] = useState(0);
  const start = () => setStartedAt(Date.now());
  const reset = () => setStartedAt(null);
  const pause = () => console.warn("Pause: not implemented.");

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const worker = setInterval(() => {
      const elapsedMs = startedAt ? Date.now() - startedAt : 0;
      const elapsingSeconds = Math.floor(elapsedMs / 1000);
      setElapsedSeconds(elapsingSeconds);
    }, 200);
    return () => clearInterval(worker);
  }, [startedAt]);

  return (
    <Box component="section">
      <Typography variant="h4" component="p" p={2}>
        {elapsedSeconds}
        <Typography variant="overline">s</Typography>
      </Typography>
      {startedAt ? (
        <Button onClick={pause} variant="contained">
          Pause
        </Button>
      ) : (
        <Button onClick={start} variant="contained">
          Start
        </Button>
      )}{" "}
      <Button onClick={reset} variant="outlined">
        Reset
      </Button>
    </Box>
  );
}
