import React, { ChangeEvent, useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Box,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useTodo } from "../hooks/UseTodo";
import AddPopUp from "./AddPopUp";
import TodoCard from "./TodoCard";
import DeleteAllPopUp from "./DeleteAllPopUp";
import { useRouter } from "next/router";

function TodoList() {
  const { todos, setSortOption } = useTodo();


  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const url = () => {
    return `/add/${todos.length + 1}`;
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Tabs>
        <TabList
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent={{ base: "flex-start", md: "space-between" }}
        >
          <Box
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            justifyContent="space-between"
            mb="1rem"
          >
            <DeleteAllPopUp />
            <Select
              onChange={handleSortChange}
              size="md"
              width="150px"
              ml={{ base: "0.5rem", md: "1rem" }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="newest-updated">Newest Updated First</option>
              <option value="oldest-updated">Oldest Updated First</option>
            </Select>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            mb={{ base: "0rem", md: "-0.5rem" }}
          >
            <Tab _focus={{ outline: "none" }}>All</Tab>
            <Tab _focus={{ outline: "none" }}>Active</Tab>
            <Tab _focus={{ outline: "none" }}>Completed</Tab>
          </Box>

          <Box
            display={{ base: "none", md: "flex" }}
            alignItems="start"
            justifyContent="flex-end"
            mr="3rem"
            mb="0.5rem"
          >
            <AddPopUp url={url()} />
            <DeleteAllPopUp />
            <Select
              onChange={handleSortChange}
              size="md"
              width="175px"
              ml="1rem"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="newest-updated">Newest Updated First</option>
              <option value="oldest-updated">Oldest Updated First</option>
            </Select>
          </Box>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 4, md: 8 }}
            >
              {todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 4, md: 8 }}
            >
              {todos
                .filter((todo) => todo.isActive)
                .map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 4, md: 8 }}
            >
              {todos
                .filter((todo) => !todo.isActive)
                .map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default TodoList;
