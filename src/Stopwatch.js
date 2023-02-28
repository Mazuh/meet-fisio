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
  const [visibleDecisecond, setVisibleDecisecond] = useState(0);

  useEffect(() => {
    const worker = setInterval(() => {
      const miliseconds = getElapsedDelta() - getPausedDelta();
      const roundedSeconds = Math.floor(miliseconds / 1000);
      setVisibleSeconds(roundedSeconds);

      const unvisibleMiliseconds = miliseconds - roundedSeconds * 1000;
      const roundedDecisecond = Math.floor(unvisibleMiliseconds / 100);
      setVisibleDecisecond(roundedDecisecond);
    }, 100);
    return () => clearInterval(worker);
  }, [getElapsedDelta, getPausedDelta]);

  const clear = () =>
    setVisibleSeconds(0) &
    setVisibleDecisecond(0) &
    setStartedAt(0) &
    setPausedAt(0);

  return (
    <Box component="section">
      <Typography component="p" p={2}>
        <Typography variant="h4" component="span" p={2}>
          {visibleSeconds}
        </Typography>
        <Typography variant="overline">s</Typography>
        <Typography variant="h6" component="span" p={2}>
          {startedAt ? visibleDecisecond : ""}
        </Typography>
      </Typography>
      {startedAt && !pausedAt ? (
        <Button onClick={pause} variant="outlined" color="warning">
          Pause
        </Button>
      ) : (
        <Button onClick={pausedAt ? unpause : start} variant="outlined">
          Start
        </Button>
      )}{" "}
      <Button onClick={clear} variant="outlined" color="secondary">
        Clear
      </Button>
    </Box>
  );
}
