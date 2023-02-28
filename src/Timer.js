import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Timer() {
  const [targetedAt, setTargetedAt] = useState(0);

  const [pausedAt, setPausedAt] = useState(0);
  const pause = () => {
    setPausedAt(Date.now());
  };
  const unpause = () => {
    setPausedAt(0);
    setTargetedAt(Date.now() - pausedAt + targetedAt);
  };

  const [visibleMinutes, setVisibleMinutes] = useState(DEFAULT_MINUTES);
  const [visibleSeconds, setVisibleSeconds] = useState(DEFAULT_SECONDS);

  useEffect(() => {
    const worker = setInterval(() => {
      if (!targetedAt || pausedAt) {
        return;
      }

      const remaining = targetedAt - Date.now();
      if (remaining <= 0) {
        setVisibleMinutes(0);
        setVisibleSeconds(0);
        return;
      }

      const remainingMinutes = Math.floor(remaining / 1000 / 60);
      setVisibleMinutes(remainingMinutes);

      const remainingSeconds =
        Math.floor(remaining / 1000) - remainingMinutes * 60;
      setVisibleSeconds(remainingSeconds);
    }, 200);
    return () => clearInterval(worker);
  }, [targetedAt, pausedAt]);

  const start = () => {
    setTargetedAt(
      Date.now() + visibleMinutes * 60 * 1000 + visibleSeconds * 1000
    );
  };

  const handleEventToTriggerSelection = (event) => event.target.select();

  const handleTimerSubmit = (event) => {
    event.preventDefault();

    const minutes = parseInt(event.target.minutes.value || "0", 10);
    const seconds = parseInt(event.target.seconds.value || "0", 10);

    setVisibleMinutes(minutes);
    setVisibleSeconds(seconds);
    setTargetedAt(0);
    setPausedAt(0);
  };

  return (
    <Box component="section">
      <Typography component="p" p={2}>
        <Typography variant="h4" component="span" p={2}>
          {visibleMinutes}
        </Typography>
        <Typography variant="overline">min</Typography>
        <Typography variant="h4" component="span" p={2}>
          {visibleSeconds.toString().padStart(2, "0")}
        </Typography>
        <Typography variant="overline">s</Typography>
      </Typography>
      {targetedAt && !pausedAt ? (
        <Button
          onClick={pause}
          variant="outlined"
          color="warning"
          disabled={!visibleMinutes && !visibleSeconds}
        >
          Pause
        </Button>
      ) : (
        <Button
          onClick={pausedAt ? unpause : start}
          variant="outlined"
          disabled={!visibleMinutes && !visibleSeconds}
        >
          Start
        </Button>
      )}
      <Typography mt={2}>Setup timer:</Typography>
      <Box
        component="form"
        display="flex"
        alignContent="center"
        mt={2}
        onSubmit={handleTimerSubmit}
      >
        <FormControl variant="outlined">
          <OutlinedInput
            id="minutes-input"
            name="minutes"
            endAdornment={<InputAdornment position="end">min</InputAdornment>}
            inputProps={{ "aria-label": "Minutes", min: 0, max: 59 }}
            type="number"
            autoComplete="off"
            defaultValue={DEFAULT_MINUTES}
            onFocus={handleEventToTriggerSelection}
          />
        </FormControl>
        <FormControl variant="outlined">
          <OutlinedInput
            id="seconds-input"
            name="seconds"
            endAdornment={<InputAdornment position="end">s</InputAdornment>}
            inputProps={{ "aria-label": "Seconds", min: 0, max: 59 }}
            type="number"
            autoComplete="off"
            defaultValue={DEFAULT_SECONDS}
            onFocus={handleEventToTriggerSelection}
          />
        </FormControl>
        <Button type="submit" variant="outlined" color="info">
          Set/Reset
        </Button>
      </Box>
    </Box>
  );
}

const DEFAULT_SECONDS = 30;
const DEFAULT_MINUTES = 0;
