import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { NavBar } from "./NavBar.js";
import { TaskListBody } from "./TaskListBody.js";
import { initializeBTT } from "./initializeBTT.js";
import { getBTTVariable } from "./apiService.js";
import './App.css';
import { timerWidgetEventHandler } from "./timerService.js";
import { taskWidgetEventHandler } from "./taskService.js";
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
  function BTTWindowWillBecomeVisible() {
    window.dispatchEvent(new CustomEvent('windowRevealed'));
  }
  function BTTWillCloseWindow() {
    window.dispatchEvent(new CustomEvent('windowClosed'));
  }
  function BTTWillHideWindow() {
    window.dispatchEvent(new CustomEvent('windowHidden'));
  }
  async function BTTNotification(note) {
    let data = JSON.parse(note);
    // console.log(data);
    window.dispatchEvent(new CustomEvent('bttVarChanged', {
      detail: data
    }));
  }
`;
document.head.appendChild(script);
// window.addEventListener('windowRevealed', () => {
//   // console.log('WebView revealed');
// });
// window.addEventListener('bttVarChanged', (event) => {
//   console.log(event.detail);
// });

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

const windowRevealedHandler = async () => {
  const timer = await getBTTVariable('timer');
  const currentDay = new Date().getDate();
  if (currentDay !== timer.currentDay)
    timer.count = 0;
};

const App = () => {
  useEffect(() => {
    window.addEventListener('windowRevealed', windowRevealedHandler);
    window.addEventListener('bttVarChanged', timerWidgetEventHandler);
    window.addEventListener('bttVarChanged', taskWidgetEventHandler);
    return () => {
      window.removeEventListener('windowRevealed', windowRevealedHandler);
      window.removeEventListener('bttVarChanged', timerWidgetEventHandler);
    window.addEventListener('bttVarChanged', taskWidgetEventHandler);
    }
  }, [])

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