import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex
        as="nav"
        bg="blue.500"
        color="white"
        p={4}
        justifyContent="center"
        mb={6}
      >
        <Heading size="lg">Todo App</Heading>
      </Flex>
      <VStack spacing={4}>
        <Flex width="100%">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <Button ml={2} onClick={addTask} colorScheme="blue">
            Add
          </Button>
        </Flex>
        <List width="100%">
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              p={2}
              bg={task.completed ? "green.100" : "gray.100"}
              borderRadius="md"
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text
                as={task.completed ? "s" : ""}
                flex="1"
                onClick={() => toggleTaskCompletion(index)}
                cursor="pointer"
              >
                {task.text}
              </Text>
              <Box>
                <IconButton
                  aria-label="Complete Task"
                  icon={<FaCheck />}
                  onClick={() => toggleTaskCompletion(index)}
                  colorScheme="green"
                  mr={2}
                />
                <IconButton
                  aria-label="Delete Task"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(index)}
                  colorScheme="red"
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;