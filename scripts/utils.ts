import { Alarms } from "./types";
import waterAnimation from "../assets/lottiefiles/water.json";
import stretchAnimation from "../assets/lottiefiles/stretch.json";
import lookAwayAnimation from "../assets/lottiefiles/break.json";

const map = new Map();
map.set(Alarms.ScreenBreak, [
  "Look at Something 20 Feet Away For 20 Seconds",
  20000,
  lookAwayAnimation,
]);
map.set(Alarms.Water, ["Drink A Glass Of Water", 60000, waterAnimation]);
map.set(Alarms.Walk, ["Stretch, Walk and Recharge!", 120000, stretchAnimation]);
map.set("walkAndWaterAlarm", map.get(Alarms.Walk));
map.set("breakAndWaterAlarm", [
  "Drink a Glass of Water and Look Away from the Screen",
  80000,
  waterAnimation,
]);
map.set("breakAndWaterAndWalkAlarm", [
  "Time to drink a Glass of Water, Look Away from the Screen and, take a Short Stroll",
  180000,
  stretchAnimation,
]);

export function getMessageAndIntervalAndAnimation(alarmName: string) {
  if (map.has(alarmName)) {
    return map.get(alarmName);
  }
  return ["", 0, undefined];
}

export function getTaskName(items: { [key: string]: boolean }) {
  const alarms = Object.keys(items);
  alarms.includes("showNotifications") &&
    alarms.splice(alarms.indexOf("showNotifications"), 1);
  if (alarms.length === 3) {
    return "breakAndWaterAndWalkAlarm";
  } else if (alarms.length === 2) {
    return items[Alarms.ScreenBreak] && items[Alarms.Water]
      ? "breakAndWaterAlarm"
      : "waterAndWalkAlarm";
  } else {
    return alarms[0];
  }
}

export const validateInput = ({
  timeout,
  water,
  walk,
}: {
  timeout: number;
  water: number;
  walk: number;
}) => {
  if (timeout < 10 || water < 45 || walk < 30) {
    throw new Error(
      "Break intervals cannot be less than the minimum specified values."
    );
  }
  return true;
};
