import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { NavBar } from "./NavBar.js";
import { TaskListBody } from "./TaskListBody.js";
import { initializeBTT } from "./initializeBTT.js";
import { getBTTVariable } from "./apiService.js";
import './App.css';
import { timerWidgetEventHandler, restartTimer } from "./timerService.js";
import { useEffect } from "react";

// Add buffer time upon launching WebView to give BTT time
// to inject its scripting functions into our JS.
// (otherwise an error is throwed upon attempting to access persistent variables)
await new Promise(r => setTimeout(r, 100));
await initializeBTT();
const tasks = await getBTTVariable('cachedTasks');
const timer = await getBTTVariable('timer');

// Registers handlers for events invoked by BTT bridge
// A little hacky, but a viable workaround for the fact that the BTT bridge
// can only find these functions in inline scripts
const script = document.createElement('script');
script.innerHTML = `
  function BTTInitialize() {
    window.dispatchEvent(new CustomEvent('windowRevealed'));
  }
  function BTTWillCloseWindow() {
    console.log('closing window');
    window.dispatchEvent(new CustomEvent('windowClosed'));
  }
  function BTTWillHideWindow() {
    console.log('hiding window');
    window.dispatchEvent(new CustomEvent('windowHidden'));
  }
  async function BTTNotification(note) {
    let data = JSON.parse(note);
    window.dispatchEvent(new CustomEvent('bttVarChanged', {
      detail: data
    }));
  }
`;
document.head.appendChild(script);
window.addEventListener('bttVarChanged', timerWidgetEventHandler);

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

await restartTimer(timer);

// const windowRevealedHandler = async () => {
//   console.log('firing windowRevealedHandler');
//   const timer = await getBTTVariable('timer');
//   restartTimer(timer);
//   const currentDay = new Date().getDate();
//   if (currentDay !== timer.currentDay)
//     timer.count = 0;
// };
// window.addEventListener('windowRevealed', windowRevealedHandler);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
    <Box
      className="appWrapper"
    >
      <NavBar timer={timer} />
      <TaskListBody
        initialTimer={timer}
        initialTasks={tasks}
      />
    </Box>
    </ChakraProvider>
  );
};

export default App;