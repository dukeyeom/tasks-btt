// Skip when long hold
// Pause when tapped
// Get times according to BTT variables ()

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./timerWorker.js';
import { changeTimerVariable, getBTTVariable, playSound, setBTTVariable } from "./apiService"
import icons from './icons.json';


let timerTick;

const startTimer = (timer) => {
  // timerInterval = setInterval(() => incrementTimer(timer), 1000);
  timerTick = new Worker();
  timerTick.onmessage = (e) => {
    incrementTimer(timer);
  }
  timerTick.postMessage(timer.secsRemaining);
}
const stopTimer = () => {
  timerTick?.terminate();
}

let isEventHandled = false;
export const timerWidgetEventHandler = async event => {
  if (!(event.detail.name === 'TBT_timerWidgetTapped'
     || event.detail.name === 'TBT_timerWidgetHeld'))
    return;
  console.log('firing timerWidgetEventHandler');
  if (!isEventHandled) {
    isEventHandled = true;
    if (event.detail.name === 'TBT_timerWidgetTapped')
      handleTimerTapped();
    if (event.detail.name === 'TBT_timerWidgetHeld')
      handleTimerHeld();
  }
  setTimeout(() => {
    isEventHandled = false
  }, 50);
};

export const handleTimerTapped = async () => {
  const timer = await getBTTVariable('timer');
  if (timer.isStarted) {
    const action = (timer.isPaused)
      ? startTimer
      : stopTimer;
    action(timer);
    timer.isPaused = !timer.isPaused;
  }
  else {
    startTimer(timer);
    playSound(timer.startSound);
    timer.isStarted = true;
    timer.isPaused = false;
    timer.content = getTimerText(timer);
  }
  updateTimerWidget(timer);
  setBTTVariable('timer', timer);
}

export const handleTimerHeld = async () => {
  const timer = await getBTTVariable('timer');
  if (!timer.isStarted)
    return;
  completeInterval(timer);
}

const getTimerText = timer => {
  if (timer.format === 'mm min')
    return String(Math.ceil(timer.secsRemaining / 60)) + "min";
  if (timer.format === 'mm:ss')
    return String(Math.floor(timer.secsRemaining / 60)) + ":" + String(timer.secsRemaining % 60).padStart(2, '0');
}

const updateTimerWidget = async (timer, event) => {
  const iconPath = await getBTTVariable('appPathToPresetFolder');
  console.log(icons.pause);

  const widgetConfig = {
    "BTTTouchBarButtonName" : timer.content,
    "BTTUUID" : "2BE46137-3057-4987-B76E-21A6101A1283",
    "BTTEnabled" : 1,
    // "BTTIconPath": '/Users/dukeyeom/Library/Application Support/BetterTouchTool/PresetBundles/67F0CD61-3E9A-4431-AAA8-010A858F5F6ETouch Bar Tasks/icons/music.png',
    "BTTIconData" : timer.isPaused ? icons.pause : icons.timer,
    "BTTTriggerConfig" : {
      "BTTTouchBarButtonColor" : "206.000003, 35.000002, 43.000001, 255.000000",
      "BTTTouchBarButtonHoverColor" : "248.880000, 146.115000, 128.010000, 181.050000",
      "BTTTouchBarButtonWidth" : 100,
      "BTTTouchBarAlternateBackgroundColor" : "75.323769, 75.323769, 75.323769, 255.000000",
      "BTTTouchBarBorderColor" : "255.000000, 255.000000, 255.000000, 255.000000",
      "BTTTouchBarButtonName" : "25 min",
      "BTTTouchBarLongPressActionName" : "Skip Timer",
    }
  };
  window.callBTT('update_trigger', {
    uuid: '2BE46137-3057-4987-B76E-21A6101A1283',
    json: JSON.stringify(widgetConfig)
  });
};

const completeInterval = timer => {
  stopTimer();
  const sound = timer.onWorkInterval
    ? timer.workSound
    : timer.restSound;
  playSound(sound);
  timer.isStarted = false;
  timer.isPaused = false;
  timer.onWorkInterval = !timer.onWorkInterval;
  timer.secsRemaining = (timer.onWorkInterval)
    ? timer.workLength * 60
    : timer.restLength * 60;
  timer.content = (timer.onWorkInterval)
    ? 'Start work'
    : 'Start rest';
  const currentDay = new Date().getDate();
  if (currentDay === timer.currentDay)
    timer.count++;
  else {
    timer.currentDay = currentDay;
    timer.count = 1;
  }
  updateTimerWidget(timer);
  setBTTVariable('timer', timer);
}

const incrementTimer = timer => {
  timer.secsRemaining = timer.secsRemaining - 1;
  if (timer.secsRemaining > 0) {
    timer.content = getTimerText(timer);
  }
  else {
    completeInterval(timer);
  }
  updateTimerWidget(timer);
  setBTTVariable('timer', timer);
}

export const timerService = {
  handleTimerTapped,
  handleTimerHeld
}

export default timerService;


//
// if (false) {
//   (async () => {
//     const timer = JSON.parse(await callBTT('get_string_variable', {
//         variable_name: `TBT_timer`,
//         }
//       ));
//     const sound = timer.workSound;
  
//     let shellScript = `logname`;
//     let shellScriptWrapper = {
//         script: shellScript,
//         launchPath: '/bin/bash',
//         parameters: '-c'
//     };
//     const logname = await runShellScript(shellScriptWrapper);
//     shellScript = `afplay "/Users/${logname}/Library/Application Support/BetterTouchTool/PresetBundles/67F0CD61-3E9A-4431-AAA8-010A858F5F6ETouch Bar Tasks/sounds/${sound}.mp3"`;
//     shellScriptWrapper = {
//         script: shellScript,
//         launchPath: '/bin/bash',
//         parameters: '-c'
//     };
//     await runShellScript(shellScriptWrapper);
//   })();
//   returnToBTT('please return a string like this somewhere in your script');


//   // Widget tapped

//   const handleTimerTapped = async () => {
//     const timer = await getBTTVariable('timer');
//     if (timer.isStarted) {
//       const action = (timer.isPaused)
//         ? startTimer
//         : stopTimer;
//       action(timer);
//       timer.isPaused = !timer.isPaused;
//     }
//     else {
//       startTimer(timer);
//       playSound(timer.startSound);
//       timer.isStarted = true;
//       timer.isPaused = false;
//       timer.content = getTimerText(timer);
//     }
//     setBTTVariable('timer', timer);
//   }
//   handleTimerTapped();

//   // Widget held

// }


