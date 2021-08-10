import { Box, Center, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CommentInputProps, IComment } from "../utils/types";

export default function SavedComments({
  openPaste,
}: CommentInputProps): JSX.Element {
  const [savedComments, setSavedComments] = useState<IComment[]>([]);
  const apiBaseURL = process.env.REACT_APP_API_BASE;

  async function getComments() {
    try {
      const commentResponse = await fetch(
        apiBaseURL + `/pastes/comments/${openPaste.paste_id}`
      );
      const commentBody = await commentResponse.json();
      setSavedComments(commentBody.data.comments);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getComments();
  }, []);

  return (
    <Box>
      {savedComments.length > 0 && (
        <Heading
          textAlign="center"
          fontSize="25px"
          margin="10px"
          color="gray.400"
        >
          Saved Comments
        </Heading>
      )}
      <Stack
        marginTop={2}
        marginLeft="5px"
        spacing={3}
        overflowY="scroll"
        maxHeight={150}
        sx={{
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "8px",
            backgroundColor: `gray.100`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `gray.400`,
            borderRadius: "10px",
          },
        }}
      >
        {savedComments.map((obj) => (
          <Box key={obj.comment_id} height="25px" padding="5px">
            <Text fontSize="15px" textAlign="left">
              {obj.comment}
            </Text>
            <Divider />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
