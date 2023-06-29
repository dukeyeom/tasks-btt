// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./timerWorker.js';
import { changeTimerVariable, getBTTVariable, playSound, setBTTVariable } from "./apiService"
import icons from './icons.json';

const iconNames = {
  work: [
    'target',
    'trend',
    'work',
    'flag'
  ],
  rest: [
    'metabolism',
    'nature',
    'stand',
    'play',
    'celebrate',
    'trees',
    'music',
    'draw',
    'stretch',
    'food',
    'book',
    'leaf',
    'read',
    'sit',
    'meditate',
    'coffee',
    'water'
  ],
};

export const timerTick = new Worker();
timerTick.onmessage = (e) => {
  getBTTVariable('timer')
  .then(timer => incrementTimer(timer));
}

const startTimer = () => {
  timerTick.postMessage(true);
}
const stopTimer = () => {
  timerTick.postMessage(false);
}

const getTimerText = timer => {
  if (timer.format === 'mm min')
    return String(Math.ceil(timer.secsRemaining / 60)) + "min";
  if (timer.format === 'mm:ss')
    return String(Math.floor(timer.secsRemaining / 60)) + ":" + String(timer.secsRemaining % 60).padStart(2, '0');
}
// KNOWN ISSUE
// Time spent paused will be counted as if it not paused when timer is restarted due to reboot
export const restartTimer = async timer => {
  const intervalLength = Number(timer.onWorkInterval ? timer.workLength : timer.restLength) * 60;
  let timeElapsed = timer.secsRemaining;
  if (timer.isStarted && !timer.isPaused)
    timer.secsRemaining = intervalLength - Math.floor((Date.now() - timer.startTime) / 1000);
  timeElapsed -= timer.secsRemaining;
  console.log(`Time elapsed: ${timeElapsed} seconds`)
  await setBTTVariable('timer', timer);
  setTimeout(() => startTimer(), 100);
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
  let action = () => {};
  if (timer.isStarted) {
    action = (timer.isPaused)
      ? startTimer
      : stopTimer;
    timer.isPaused = !timer.isPaused;
    timer.icon = timer.isPaused ? 'pause' : 'timer';
  }
  else {
    playSound(timer.startSound);  
    action = startTimer;
    timer.icon = 'timer';
    timer.isStarted = true;
    timer.isPaused = false;
    timer.secsRemaining = (timer.onWorkInterval)
      ? timer.workLength * 60
      : timer.restLength * 60;
    timer.content = getTimerText(timer);
    timer.startTime = Date.now();
    console.log('setting timer.startTime:', timer.startTime);
  }
  updateTimerWidget(timer);
  setBTTVariable('timer', timer)
    .then(() => action(timer));
}

export const handleTimerHeld = async () => {
  const timer = await getBTTVariable('timer');
  if (!timer.isStarted)
    return;
  completeInterval(timer);
}

const updateTimerWidget = async (timer, event) => {
  // const workIcon = iconNames.work.at(Math.floor(Math.random() * iconNames.work.length));
  // const restIcon = iconNames.rest.at(Math.floor(Math.random() * iconNames.rest.length));
  // const inProgressIcon = timer.isPaused ? "pause" : "timer";
  // const widgetIcon = (timer.isStarted) ? inProgressIcon : (timer.onWorkInterval) ? workIcon : restIcon;
  // const widgetConfig = {
    // "BTTTouchBarButtonName" : timer.content,
    // "BTTEnabled" : 1,
    // "text": "dslkfjsdlfjdk",
    // "icon_path": '/Users/dukeyeom/Library/Application Support/BetterTouchTool/PresetBundles/67F0CD61-3E9A-4431-AAA8-010A858F5F6ETouch Bar Tasks/icons/music.png',
    // "icon_data" : icons[widgetIcon],
    // "background_color" : timer.onWorkInterval ? "206.000003, 35.000002, 43.000001, 255.000000" : "73.000003, 155.000006, 201.000003, 255.000000",
    // "BTTTriggerConfig" : {
    //   "BTTTouchBarButtonHoverColor" : "248.880000, 146.115000, 128.010000, 181.050000",
    //   "BTTTouchBarButtonWidth" : 100,
    //   "BTTTouchBarAlternateBackgroundColor" : "75.323769, 75.323769, 75.323769, 255.000000",
    //   "BTTTouchBarBorderColor" : "255.000000, 255.000000, 255.000000, 255.000000",
    //   "BTTTouchBarButtonName" : "25 min",
    //   "BTTTouchBarLongPressActionName" : "Skip Timer",
    // }
  // };
  // console.log('updating')
  window.callBTT('refresh_widget', {
    uuid: '18E14B53-FEAA-4EA7-B890-97D89BFE9D11',
    // json: JSON.stringify(widgetConfig)
  });
};

const completeInterval = timer => {
  stopTimer();
  console.log(`workLength: ${timer.workLength}, restLength: ${timer.restLength}`);
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
  const workIcon = iconNames.work.at(Math.floor(Math.random() * iconNames.work.length));
  const restIcon = iconNames.rest.at(Math.floor(Math.random() * iconNames.rest.length));
  timer.icon = (timer.onWorkInterval) ? workIcon : restIcon;
  const currentDay = new Date().getDate();
  if (currentDay === timer.currentDay && timer.onWorkInterval)
    timer.count++;
  else {
    timer.currentDay = currentDay;
    timer.count = 1;
  }
  updateTimerWidget(timer);
  setBTTVariable('timer', timer);
}

const incrementTimer = timer => {
  console.log('incrementing timer', timer.secsRemaining);
  timer.secsRemaining = timer.secsRemaining - 1;
  if (timer.secsRemaining > 0) {
    timer.content = getTimerText(timer);
  }
  else {
    completeInterval(timer);
  }
  setBTTVariable('timer', timer);
}

export const timerService = {
  handleTimerTapped,
  handleTimerHeld
}

export default timerService; 

