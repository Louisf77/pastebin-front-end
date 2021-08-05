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
  Box,
  Button,
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
  //   const [openPaste,setOpenPaste] = useState({
  //       paste_title : "",
  //       paste_text : "",
  //       paste_id: 0,
  //       time: ""

  //   })
  async function getPastes() {
    try {
      const response = await fetch("http://localhost:4000/pastes");
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
        <ModalContent>
          <ModalHeader>{openPaste.paste_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{openPaste.paste_text}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <h2>Saved Pastes</h2>
      {storedPastes.map((obj) => (
        <Box
          onClick={() => {
            onOpen();
            setOpenPaste(obj);
          }}
          key={obj.paste_id}
        >
          {obj.paste_text}
        </Box>
      ))}
    </>
  );
}
