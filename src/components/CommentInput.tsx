import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { CommentInputProps } from "../utils/types";

export default function CommentInput({
  openPaste,
}: CommentInputProps): JSX.Element {
  const [commentBody, setCommentBody] = useState("");
  const apiBaseURL = process.env.REACT_APP_API_BASE;
  const onSubmit = async () => {
    try {
      await fetch(apiBaseURL + "/pastes/comments", {
        method: "POST",
        body: JSON.stringify({
          comment: commentBody,
          paste_id: openPaste.paste_id,
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Box>
        <Textarea
          type="form"
          placeholder="Add comments here....."
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <Button onClick={onSubmit} variant="outline">
          Add Comment
        </Button>
      </Box>
    </>
  );
}
