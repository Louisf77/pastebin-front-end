import { useState } from "react";
import { Input, Button, Box, Stack, Textarea } from "@chakra-ui/react";
import { AiOutlineSave } from "react-icons/ai";

export default function UserInput(): JSX.Element {
  const [textBody, setTextBody] = useState("");
  const [title, setTitle] = useState("");
  const apiBaseURL = process.env.REACT_APP_API_BASE;
  const onSubmit = async () => {
    try {
      await fetch(apiBaseURL + "/pastes", {
        // const response = await fetch("http://localhost:4000/pastes", {
        method: "POST",
        body: JSON.stringify({ textbody: textBody, title: title }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Box marginLeft="15%" marginTop="8%" p={5}>
        <Stack spacing="20px">
          <Input
            className="titleinput"
            placeholder="Input your title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            width="50%"
            size="xs"
            variant="filled"
            shadow="md"
          />
          <Textarea
            className="pasteTextarea"
            type="form"
            placeholder="Paste text here....."
            value={textBody}
            onChange={(e) => setTextBody(e.target.value)}
            width="100%"
            variant="filled"
            size="xs"
            height={400}
            shadow="md"
            resize="none"
          />
        </Stack>
        <Button
          onClick={onSubmit}
          marginTop={5}
          variant="outline"
          leftIcon={<AiOutlineSave />}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
