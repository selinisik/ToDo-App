import React, { useEffect, useState } from "react";
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
import { EditIcon } from "@chakra-ui/icons";
import Todo from "../types/Todo";
import { useTodo } from "../hooks/UseTodo";
import { useRouter } from "next/router";
import Link from "next/link";

type EditPopUpProps = {
  id: number;
  url: string;
};
function EditPopUp({url }: EditPopUpProps) {
  const router = useRouter();
  return (
    <>
        <Button
          colorScheme="facebook"
          variant="outline"
          _focus={{ outline: "none" }}
          marginRight="1rem"
          onClick={() => router.push(url)}
        >
          <EditIcon boxSize={5} color="facebook" />
        </Button>
    </>
  );
}

export default EditPopUp;
