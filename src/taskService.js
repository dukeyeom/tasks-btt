import { getBTTVariable, playSound, setBTTVariable } from "./apiService"

export const taskWidgetEventHandler = async event => {
  if (event.detail.name !== 'TBT_taskWidgetTapped')
    return;

}

const icons = {
};

const taskCompletedHandler = () => {

  // playSound
}

const updateTaskWidget = async (task, event) => {
  const iconPath = await getBTTVariable('appPathToPresetFolder');
  let timer;
  let test = [
    {
      "BTTTouchBarButtonName" : "Figure out timing issue on timer widget",
      "BTTUUID" : "045B775D-C4A8-46D6-8574-EBF3C5C2BD96",
      "BTTEnabled" : 1,
      "BTTIconData" : ''
    }
  ]

  const widgetConfig = {
    "BTTTouchBarButtonName" : timer.content,
    "BTTUUID" : "2BE46137-3057-4987-B76E-21A6101A1283",
    "BTTEnabled" : 1,
    "BTTIconPath": '/Users/dukeyeom/Library/Application Support/BetterTouchTool/PresetBundles/67F0CD61-3E9A-4431-AAA8-010A858F5F6ETouch Bar Tasks/icons/music.png',
    // "BTTIconData" : `${iconPath}icons/pause.png`,
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