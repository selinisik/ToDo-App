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
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useTodo } from "../hooks/UseTodo";
import { useRouter } from "next/router";

type Add = {
  url: string;
};

function AddPopUp({ url }: Add) {
  const [newTodo, setNewTodo] = React.useState({ title: "", description: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addTodo, todos } = useTodo(); // Assuming useTodo returns the todoList
  const router = useRouter();

  const handleAddTodo = () => {
    onClose();
    addTodo(newTodo.title, newTodo.description);
    setNewTodo({ description: "", title: "" });
  };

  return (
    <>
      <a href={url}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="outline"
          ml={{ base: "0.5rem", md: "1rem" }}
          _focus={{ outline: "none" }}
        >
          Add Todo
        </Button>
      </a>
    </>
  );
}

export default AddPopUp;
