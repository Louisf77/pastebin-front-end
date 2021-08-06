import { useEffect, useState } from "react";
import { IPaste } from "../utils/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  Button,
  ListItem,
  VStack,
  Box,
  StackDivider,
  Stack,
  Heading,
} from "@chakra-ui/react";

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
      console.log(body);
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
          height="74.5vh"
        >
          {storedPastes.map((obj) => (
            <Box
              isTruncated
              p="15px"
              shadow="md"
              borderWidth="1px"
              width={300}
              fontSize="12px"
              background="gray.100"
              color="gray.400"
              height="510px"
              align="center"
              onClick={() => {
                onOpen();
                setOpenPaste(obj);
              }}
              key={obj.paste_id}
            >
              {obj.paste_text}
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
