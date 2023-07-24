import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button, Text } from "@chakra-ui/react";
import { useTodo } from "../../src/hooks/UseTodo";
import styles from "../../src/styles/EditPage.module.css";

const EditTodoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const { updateTodo, todos } = useTodo();
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const id = Number(router.query.id);
    const todoItem = todos.find((todo) => todo.id === id);
    if (todoItem) {
      setUpdatedTodo({
        title: todoItem.title,
        description: todoItem.description,
      });
    }
  }, [router.query.id]);

  const handleUpdateTodo = (id: number, title: string, description: string) => {
    updateTodo(id, title, description);
    setUpdatedTodo({title:"",description:""})
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.box}>
        <Text textColor="white" fontSize="3xl">
          Update Todo
        </Text>
        <Input
          variant="filled"
          placeholder="Enter Todo Title"
          maxLength={100}
          value={updatedTodo.title}
          _focus={{ outline: "none", backgroundColor: "white" }}
          onChange={(e) => {
            setUpdatedTodo({
              ...updatedTodo,
              title: e.target.value,
            });
          }}
        />
        <Input
          variant="filled"
          placeholder="Enter Todo Description"
          value={updatedTodo.description}
          _focus={{ outline: "none", backgroundColor: "white" }}
          onChange={(e) => {
            setUpdatedTodo({
              ...updatedTodo,
              description: e.target.value,
            });
          }}
        />
        <Button
          colorScheme="gray"
          mr={3}
          onClick={() =>
            handleUpdateTodo(
              Number(router.query.id),
              updatedTodo.title,
              updatedTodo.description
            )
          }
          _focus={{ outline: "none" }}
          pr="30px"
          pl="30px"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditTodoPage;
