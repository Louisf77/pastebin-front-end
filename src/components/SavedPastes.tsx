import { useEffect, useState } from "react";
import { IPaste } from "../utils/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import CommentInput from "./CommentInput";
import SavedComments from "./SavedComments";

export default function SavedPastes(): JSX.Element {
  const [storedPastes, setStoredPastes] = useState<IPaste[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openPaste, setOpenPaste] = useState<IPaste>({
    paste_title: "",
    paste_text: "",
    paste_id: 0,
    time: "",
  });
  const apiBaseURL = process.env.REACT_APP_API_BASE;

  async function getPastes() {
    try {
      const response = await fetch(apiBaseURL + "/pastes");
      const body = await response.json();

      setStoredPastes(body.data.pastes);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getPastes();
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="gray.100">
          <ModalHeader>{openPaste.paste_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{openPaste.paste_text}</ModalBody>
          <CommentInput openPaste={openPaste} />
          <SavedComments openPaste={openPaste} />
        </ModalContent>
      </Modal>
      <Box align="center">
        <Heading size="md" color="gray.400">
          Saved Pastes
        </Heading>
        <Stack
          marginTop={2}
          spacing={2}
          align="center"
          overflowY="scroll"
          height={525}
          sx={{
            "&::-webkit-scrollbar": {
              width: "12px",
              borderRadius: "8px",
              backgroundColor: `gray.100`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `gray.400`,
              borderRadius: "10px",
            },
          }}
        >
          {storedPastes.map((obj) => (
            <Box
              isTruncated
              p="15px"
              shadow="md"
              borderWidth="1px"
              width={300}
              fontSize="10px"
              background="gray.100"
              color="gray.400"
              height="20px"
              align="center"
              onClick={() => {
                onOpen();
                setOpenPaste(obj);
              }}
              key={obj.paste_id}
            >
              <Text> {obj.paste_text}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
