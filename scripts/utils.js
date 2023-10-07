import { Alarms } from "./constants";
import waterAnimation from "../assets/lottiefiles/water.json";
import stretchAnimation from "../assets/lottiefiles/stretch.json";
import lookAwayAnimation from "../assets/lottiefiles/break.json";
import walkAnimation from "../assets/lottiefiles/walk.json";
const map = new Map();

chrome.storage.local.get(["timeout", "water", "walk"], (items) => {
  const { timeout, water, walk } = items;
  const weightageToAnimation = {
    [timeout]: Alarms.ScreenBreak,
    [water]: Alarms.Water,
    [walk]: Alarms.Walk,
  };
  map.set(Alarms.ScreenBreak, {
    message: "Look at Something 20 Feet Away For 20 Seconds",
    breaktime: 20000,
    animation: lookAwayAnimation,
    weightage: timeout,
  });
  map.set(Alarms.Water, {
    message: "Drink A Glass Of Water",
    breaktime: 60000,
    animation: waterAnimation,
    weightage: water,
  });
  map.set(Alarms.Walk, {
    message: "Stretch, Walk and Recharge!",
    breaktime: 120000,
    animation: stretchAnimation,
    weightage: walk,
  });
  map.set(Alarms.WalkAndWater, {
    message: "Stretch, Walk and Drink Water!",
    breaktime: 180000,
    animation: map.get(weightageToAnimation[Math.max(walk, water)])?.animation,
    weightage: 0,
  });
  map.set(Alarms.BreakAndWater, {
    message: "Drink a Glass of Water and Look Away from the Screen",
    breaktime: 80000,
    animation: map.get(weightageToAnimation[Math.max(timeout, water)])
      ?.animation,
    weightage: 0,
  });
  map.set(Alarms.BreakAndWalk, {
    message: "Take a Short Walk and Look Away from the Screen",
    breaktime: 140000,
    animation: walkAnimation,
    weightage: 0,
  });
  map.set(Alarms.BreakAndWaterAndWalk, {
    message:
      "Time to drink a Glass of Water, Look Away from the Screen and, take a Short Walk",
    breaktime: 200000,
    animation: map.get(weightageToAnimation[Math.max(timeout, walk, water)])
      ?.animation,
    weightage: 0,
  });
});

export function getMessageAndIntervalAndAnimation(alarmName) {
  if (map.has(alarmName)) {
    return (
      map.get(alarmName) || {
        message: "",
        breaktime: 0,
        animation: undefined,
        weightage: 0,
      }
    );
  }
  return { message: "", breaktime: 0, animation: undefined, weightage: 0 };
}

export function getTaskName(items) {
  const alarms = Object.keys(items);
  alarms.includes("showNotifications") &&
    alarms.splice(alarms.indexOf("showNotifications"), 1);

  if (alarms.length === 3) {
    return Alarms.BreakAndWaterAndWalk;
  } else if (alarms.length === 2) {
    return items[Alarms.ScreenBreak] && items[Alarms.Water]
      ? Alarms.BreakAndWater
      : items[Alarms.ScreenBreak] && items[Alarms.Walk]
      ? Alarms.BreakAndWalk
      : Alarms.WalkAndWater;
  } else {
    return alarms[0];
  }
}

export const validateInput = ({ timeout, water, walk }) => {
  if (timeout < 10 || water < 45 || walk < 30) {
    throw new Error(
      "Break intervals cannot be less than the minimum specified values."
    );
  }
  return true;
};

export const getBreakDurationStringInMinutesAndSeconds = (breaktime) => {
  const breakTimeInSeconds = breaktime / 1000;
  const minutes = Math.floor(breakTimeInSeconds / 60);
  const seconds = Math.floor(breakTimeInSeconds % 60);

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ${seconds} second${
      seconds > 1 ? "s" : ""
    }`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""}`;
};
