import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useTodo } from "../hooks/UseTodo";

type DeletePopUpProps = {
    id: number;
}
function DeletePopUp({ id }: DeletePopUpProps) {
  const { deleteTodo } = useTodo();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenPopUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };
  const handleDelete = (id: number) => {
    onClose();
    deleteTodo(id);
  };
  return (
    <>
      <Button
        colorScheme="red"
        variant="outline"
        _focus={{ outline: "none" }}
        marginRight="1rem"
        onClick={handleOpenPopUp}
      >
        <DeleteIcon boxSize={5} color="red.500" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete todo?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleDelete(id)} _focus={{ outline: "none" }}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeletePopUp;
