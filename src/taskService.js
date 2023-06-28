import { getBTTVariable, playSound, setBTTVariable } from "./apiService"
import icons from './icons.json';

export const changeTaskWidgetText = (text, isChecked) => {
  const widgetConfig = {
    "BTTTouchBarButtonName": text,
    "BTTTouchBarBorderColor" : "40.000000, 255.000000, 0.000000, 255.000000",
    "BTTIconData": isChecked ? icons.checked : icons.unchecked
  };
  console.log(widgetConfig);
  window.callBTT('update_trigger', {
    uuid: '045B775D-C4A8-46D6-8574-EBF3C5C2BD96',
    json: JSON.stringify(widgetConfig)
  });
};