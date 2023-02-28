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
  const handleCountSetterChange = (event) =>
    setCountSetter(
      ["0", "00", ""].includes(event.target.value)
        ? "0"
        : event.target.value.replace(/^0+/, "")
    );

  const handleCountWithSetterSubmit = (event) => {
    event.preventDefault();
    setCount(parseInt(countSetter, 10) || 0);
  };

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
      <Typography mt={2}>Setup counter:</Typography>
      <Box
        component="form"
        onSubmit={handleCountWithSetterSubmit}
        display="flex"
        alignContent="center"
        mt={2}
      >
        <TextField
          id="count-setter"
          label="Go to number"
          type="number"
          value={countSetter}
          onChange={handleCountSetterChange}
          autoComplete="off"
          required
        />
        <Button type="submit" variant="outlined" color="info">
          Set
        </Button>
      </Box>
    </Box>
  );
}
