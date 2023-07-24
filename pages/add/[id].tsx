import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button, Text } from "@chakra-ui/react";
import { useTodo } from "../../src/hooks/UseTodo";
import styles from "../../src/styles/AddPage.module.css";

const EditTodoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const { addTodo,} = useTodo();
  const [newTodo, setNewTodo] = React.useState({ title: "", description: "" });

  const handleAddTodo = () => {
    addTodo(newTodo.title, newTodo.description);
    setNewTodo({ description: "", title: "" });
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
          Add Todo
        </Text>
        <Input
          variant="filled"
          placeholder="Enter Todo Title"
          maxLength={100}
          value={newTodo.title}
          _focus={{ outline: "none", backgroundColor: "white" }}
          onChange={(e) => {
            setNewTodo({
              ...newTodo,
              title: e.target.value,
            });
          }}
        />
        <Input
          variant="filled"
          placeholder="Enter Todo Description"
          value={newTodo.description}
          _focus={{ outline: "none", backgroundColor: "white" }}
          onChange={(e) => {
            setNewTodo({
              ...newTodo,
              description: e.target.value,
            });
          }}
        />
        <Button
          colorScheme="gray"
          mr={3}
          onClick={handleAddTodo}
          _focus={{ outline: "none" }}
          pr="30px"
          pl="30px"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default EditTodoPage;
