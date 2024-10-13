import { Alarms, TO_MS_MULTIPLER } from "./constants";
import waterAnimation from "../assets/lottiefiles/water.json";
import stretchAnimation from "../assets/lottiefiles/stretch.json";
import lookAwayAnimation from "../assets/lottiefiles/break.json";
import walkAnimation from "../assets/lottiefiles/walk.json";
const map = new Map();

chrome.storage.local.get(
  [
    "timeout",
    "water",
    "walk",
    "lookawayDuration",
    "walkDuration",
    "waterDuration",
  ],
  (items) => {
    const {
      timeout,
      water,
      walk,
      lookawayDuration,
      walkDuration,
      waterDuration,
    } = items;

    const weightageToAnimation = {
      [timeout]: Alarms.ScreenBreak,
      [water]: Alarms.Water,
      [walk]: Alarms.Walk,
    };
    map.set(Alarms.ScreenBreak, {
      message: "Look at Something 20 Feet Away For 20 Seconds",
      breaktime: +lookawayDuration,
      animation: lookAwayAnimation,
      weightage: timeout,
    });
    map.set(Alarms.Water, {
      message: "Drink A Glass Of Water",
      breaktime: +waterDuration,
      animation: waterAnimation,
      weightage: water,
    });
    map.set(Alarms.Walk, {
      message: "Stretch, Walk and Recharge!",
      breaktime: +walkDuration,
      animation: stretchAnimation,
      weightage: walk,
    });
    map.set(Alarms.WalkAndWater, {
      message: "Stretch, Walk and Drink Water!",
      breaktime: +walkDuration + +waterDuration,
      animation: map.get(weightageToAnimation[Math.max(walk, water)])
        ?.animation,
      weightage: 0,
    });
    map.set(Alarms.BreakAndWater, {
      message: "Drink a Glass of Water and Look Away from the Screen",
      breaktime: +lookawayDuration + +waterDuration,
      animation: map.get(weightageToAnimation[Math.max(timeout, water)])
        ?.animation,
      weightage: 0,
    });
    map.set(Alarms.BreakAndWalk, {
      message: "Take a Short Walk and Look Away from the Screen",
      breaktime: +lookawayDuration + +walkDuration,
      animation: walkAnimation,
      weightage: 0,
    });
    map.set(Alarms.BreakAndWaterAndWalk, {
      message:
        "Time to drink a Glass of Water, Look Away from the Screen and, take a Short Walk",
      breaktime: +lookawayDuration + +waterDuration + +walkDuration,
      animation: map.get(weightageToAnimation[Math.max(timeout, walk, water)])
        ?.animation,
      weightage: 0,
    });
  }
);

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
  ["showNotifications", "notifyOnBreakCompletion"].forEach((item) => {
    if (alarms.includes(item)) {
      alarms.splice(alarms.indexOf(item), 1);
    }
  });

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
    return `${minutes} minute${minutes > 1 ? "s" : ""} ${
      seconds === 1
        ? seconds + " second"
        : seconds > 1
        ? seconds + " seconds"
        : ""
    }`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""}`;
};

export async function getNextAlarmTime() {
  const allAlarms = await chrome.alarms.getAll();
  allAlarms.sort((a, b) => a.scheduledTime - b.scheduledTime);
  const nextAlarm = allAlarms[1].scheduledTime;

  return nextAlarm;
}

export const getDurationInMS = (e) => {
  return parseInt(e.target.value) * TO_MS_MULTIPLER;
};
