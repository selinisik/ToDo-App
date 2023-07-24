import React, { ChangeEvent } from "react";
import Todo from "../types/Todo";
import {
  Box,
  Switch,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import DeletePopUp from "./DeletePopUp";
import EditPopUp from "./EditPopUp";
import { useTodo } from "../hooks/UseTodo";

type TodoCardProps = {
  todo: Todo;
};

function TodoCard({ todo }: TodoCardProps) {
  const { updateActiveTodo } = useTodo();
  const handleChecked = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    e.stopPropagation();
    updateActiveTodo(id);
  };

  return (
    <Card mb="1rem">
      <Stack divider={<StackDivider />} spacing="4">
        <h2>
          <CardHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flex="1" overflow="hidden" paddingRight="1rem">
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                fontWeight="bold"
              >
                {todo.title}
              </Text>
            </Box>
            <Box display="flex" alignItems="center">
              <Switch
                colorScheme="green"
                size="lg"
                isChecked={!todo.isActive}
                pr="1rem"
                onChange={(e) => handleChecked(e, todo.id)}
                _focus={{ outline: "none" }}
              />
              <EditPopUp id={todo.id} url={`/edit/${todo.id}`} />
              <DeletePopUp id={todo.id} />
            </Box>
          </CardHeader>
        </h2>
        <CardBody>{todo.description}</CardBody>
      </Stack>
    </Card>
  );
}

export default TodoCard;
