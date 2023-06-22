import { ChakraProvider } from "@chakra-ui/react";
import { NavBar } from "./NavBar.js";
import { TaskListBody } from "./TaskListBody.js";

const App = () => {
  return (
    <ChakraProvider>
      <NavBar />
      <TaskListBody />
    </ChakraProvider>
  );
};

export default App;