import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const [countSetter, setCountSetter] = useState(10);
  const handleCountSetterChange = (event, newValue) => setCountSetter(newValue);
  const syncCountWithSetter = () => setCount(countSetter);

  return (
    <Box component="section">
      <Typography component="p" p={2}>
        <Typography variant="h4" component="span" p={2}>
          {count}
        </Typography>
        <Typography variant="overline">x</Typography>
      </Typography>
      <Button onClick={increment} variant="outlined" color="success">
        Increment
      </Button>{" "}
      <Button onClick={decrement} variant="outlined" color="warning">
        Decrement
      </Button>
      <Box display="flex" alignContent="center" mt={2}>
        <TextField
          id="count-setter"
          label="Go to number"
          type="number"
          min="0"
          value={countSetter}
          onChange={handleCountSetterChange}
        />
        <Button onClick={syncCountWithSetter} variant="contained">
          Set
        </Button>
      </Box>
    </Box>
  );
}
