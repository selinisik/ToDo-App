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

function DeleteAllPopUp() {
  const { deleteAllTodo } = useTodo();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenPopUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };
  const handleDeleteAll = () => {
    onClose();
    deleteAllTodo();
  };
  return (
    <>
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="outline"
        _focus={{ outline: "none" }}
        ml={{base:"0.5rem" ,md:"1rem"}}
        onClick={handleOpenPopUp}
      >
        Delete All
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete All</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete all todos?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteAll}>
              Delete All
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteAllPopUp;
