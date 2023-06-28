import { getBTTVariable, setBTTVariable } from "./apiService";

// If BTT persistent variables have not been set by the app (either due to
// fresh install or resetting of variables), initialize them with default values
export const initializeBTT = async () => {
  const isAppInitialized = await getBTTVariable('appInitialized');
  if (!isAppInitialized) {
    console.log('Performing initialization of BTT variables to default values');
    setBTTVariable('taskCompleteSound', 'Done');

    // Path to preset data folder (primarily for sounds at this moment,
    // but may come in handy for adding functionality later)
    // Hardcoded only because I couldn't find a more straightforward way to retrieve it from BTT
	  const shellScriptWrapper = {
   	  script: 'logname',
    	launchPath: '/bin/bash',
    	parameters: '-c'
	  };
	  const logname = await window.runShellScript(shellScriptWrapper);
	  const path = `/Users/${logname}/Library/Application Support/BetterTouchTool/PresetBundles/67F0CD61-3E9A-4431-AAA8-010A858F5F6ETouch Bar Tasks/`;
    setBTTVariable('appPathToPresetFolder', path);
    
    const timer = {
      content: 'Start work',
      icon: 'timer',
      enabled: true,
      isPaused: false,
      isStarted: false,
      onWorkInterval: true,
      workLength: 25,
      restLength: 5,
      secsRemaining: 1500,
      format: 'mm:ss',
      workSound: 'Start',
      restSound: 'Complete',
      startSound: 'Ding',
      count: 0,
      currentDay: (new Date()).getDate(),
      emoji: '🍅'
    }
    setBTTVariable('timer', timer);
    setBTTVariable('taskCompleteSound', 'Done');
    setBTTVariable('appIsMuted', false);

    setBTTVariable('cachedTasks', [{content: '', id: -1}])

    setBTTVariable('appInitialized', true);
  }
}

export default initializeBTT;