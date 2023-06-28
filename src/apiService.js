import { TodoistApi } from '@doist/todoist-api-typescript';

// Required interfaces with Todoist API:
// On API enabled:
//   Add all native tasks to project
// On API disabled:
//   Convert all tasks to native tasks
// On refresh:
//   Sync whole list with project
//   Add all tasks with label 
// On task completion or edit:
//   Update task
const api = new TodoistApi(
  // (async () = {
    
  // })() 
);

// This app interfaces with the Touch Bar using functions injected by BTT.
// Badness ensues if we attempt to call these functions before BTT has had
// time to inject them. Hence this 100ms delay we place on these function
// calls on app load.
// let delay = 100;
// setTimeout(() => delay = 0, 100);

// All variables used by this app:
//  TBT_ <- common prefix shared by all following variables
//      timerEnabled
//      timerWorkLength   
//      timerRestLength
//      timerWorkSound
//      timerRestSound
//      timerStartSound
//      timerCount
//        emoji: 
//        day: 
//        count:
//      timerDisplayMode
//      taskCompleteSound
//      cachedTasks
//      todoistEnabled
//      todoistApiToken
//      todoistProjectName
//      todoistLabelName
//      appColorTheme
//      appMuted
//      appInitialized
//      appPathToPresetFolder
export const setBTTVariable = async (varName, value) => {
  // console.log(`setting BTT ${varName}`, value)
  await window.callBTT('set_persistent_string_variable', {
    variable_name: `TBT_${varName}`,
    to: JSON.stringify(value)
    }
  )
};

export const getBTTVariable = async (varName) => {
  return JSON.parse(await window.callBTT('get_string_variable', {
    variable_name: `TBT_${varName}`,
  }));
};

export const refreshTouchBar = () => {

};




export const changeTimerVariable = async (key, newValue) => {
  const oldTimer = await getBTTVariable('timer');
  const newTimer = {
    ...oldTimer,
    [key]: newValue
  };
  // console.log(oldTimer, newTimer);
  setBTTVariable('timer', newTimer);
  return newTimer;
}

export const playSound = async (sound) => {
  if (await getBTTVariable('appIsMuted'))
    return;
  const filePath = `${await getBTTVariable('appPathToPresetFolder')}/sounds/${sound}.mp3`
  let shellScript = `afplay "${filePath}"`;
	let shellScriptWrapper = {
   	 script: shellScript,
    	launchPath: '/bin/bash',
    	parameters: '-c'
	};
	await window.runShellScript(shellScriptWrapper);
}

export const playSoundEvent = async (event) => {
  let sound = '';
  if (sound === 'task')
    sound = await getBTTVariable('taskCompleteSound');
  else {
    let timer = await getBTTVariable('timer');
    sound = timer[`${event}Sound`];
  }
  console.log(sound);
}

export const syncTodoist = () => {
  
};