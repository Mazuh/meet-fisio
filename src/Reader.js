import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Reader() {
  const [link, setLink] = useState("");
  const clear = () => setLink("") & setErrorMessage("");

  const [errorMessage, setErrorMessage] = useState("");

  const [linkField, setLinkField] = useState("");
  const handleLinkFieldChange = (event) =>
    setErrorMessage("") & setLinkField(event.target.value.trim());

  const handleLinkSubmit = (event) => {
    event.preventDefault();

    if (!linkField.startsWith("https://docs.google.com/document/d/")) {
      setErrorMessage(
        'Invalid Google Docs link. It usually starts with "https://docs.google.com/document/d/..." and you must have access to it.'
      );
      return;
    }

    setLink(linkField.replaceAll(/edit.*/g, ""));
  };

  return (
    <Box component="section">
      <Box p={2}>
        {!!link && (
          <iframe
            title="Reader"
            src={link}
            style={{ width: "100%", height: "65vh", border: "none" }}
          ></iframe>
        )}
        <Typography variant="overline" component="div" p={2}>
          <Typography fontWeight="bold">Viewing now:</Typography>
          {link ? link : "None"}
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleLinkSubmit}
        display="flex"
        alignContent="center"
        mt={2}
      >
        <TextField
          type="search"
          id="link-setter"
          label="Google Docs link"
          value={linkField}
          onChange={handleLinkFieldChange}
          autoComplete="off"
          required
        />
        <Button type="submit" variant="outlined" color="info">
          Set
        </Button>
        <Button variant="outlined" color="secondary" onClick={clear}>
          Clear
        </Button>
      </Box>
      {!!errorMessage && (
        <Typography color="error" mt={1}>
          <Typography component="span" fontWeight="bold">
            Error:{" "}
          </Typography>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
