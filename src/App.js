import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { NavBar } from "./NavBar.js";
import { TaskListBody } from "./TaskListBody.js";
import './App.css';

document.body.style.overflow = "hidden";

const theme = extendTheme({
  styles: {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false
    },
    global: () => ({
      body: {
        bg: ""
      },
    }),
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
    <Box
      className="appWrapper"
    >
      <NavBar />
      <TaskListBody />
    </Box>
    </ChakraProvider>
  );
};

export default App;