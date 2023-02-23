import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Stopwatch() {
  const [startedAt, setStartedAt] = useState(0);
  const start = () => setStartedAt(Date.now());

  const [pausedAt, setPausedAt] = useState(0);

  const getElapsedDelta = useCallback(
    () => (startedAt ? Date.now() - startedAt : 0),
    [startedAt]
  );
  const getPausedDelta = useCallback(
    () => (pausedAt ? Date.now() - pausedAt : 0),
    [pausedAt]
  );

  const pause = () => setPausedAt(Date.now());
  const unpause = () =>
    setPausedAt(0) & setStartedAt(startedAt + getPausedDelta());

  const [visibleSeconds, setVisibleSeconds] = useState(0);

  useEffect(() => {
    const worker = setInterval(() => {
      const totalElapsedMiliseconds = getElapsedDelta() - getPausedDelta();
      const totalElapsedSeconds = Math.floor(totalElapsedMiliseconds / 1000);
      setVisibleSeconds(totalElapsedSeconds);
    }, 100);
    return () => clearInterval(worker);
  }, [getElapsedDelta, getPausedDelta]);

  const clear = () => setVisibleSeconds(0) & setStartedAt(0) & setPausedAt(0);

  return (
    <Box component="section">
      <Typography variant="h4" component="p" p={2}>
        {visibleSeconds}
        <Typography variant="overline">s</Typography>
      </Typography>
      {startedAt && !pausedAt ? (
        <Button onClick={pause} variant="contained">
          Pause
        </Button>
      ) : (
        <Button onClick={pausedAt ? unpause : start} variant="contained">
          Start
        </Button>
      )}{" "}
      <Button onClick={clear} variant="outlined">
        Clear
      </Button>
    </Box>
  );
}
