import "../popup/popup.css";
import { TO_MS_MULTIPLER } from "./constants.js";
import {
  getBreakDurationStringInMinutesAndSeconds,
  getBreakDurationInMinSecOrdinal,
  getDurationInMS,
  validateInput,
} from "./utils.js";

const nextBreakNode = document.querySelector("#next-break");
const form = document.querySelector("form");
const timeoutInput = document.querySelector("#timeout");
const waterInput = document.querySelector("#water");
const walkInput = document.querySelector("#walk");

const timeoutLabel = document.querySelector("#timeoutLabel");
const waterLabel = document.querySelector("#waterLabel");
const walkLabel = document.querySelector("#walkLabel");
const notifications = document.querySelector("#notifications");
const dnd = document.querySelector("#dnd");
const notifyOnBreakCompletionInput = document.querySelector(
  "#notifyOnBreakCompletion"
);

const walkDurationInput = document.querySelector("#walkDuration");
const waterDurationInput = document.querySelector("#waterDuration");
const lookawayDurationInput = document.querySelector("#lookawayDuration");

const walkDurationLabel = document.querySelector("#walkDurationLabel");
const lookAwayDurationLabel = document.querySelector("#lookawayDurationLabel");
const waterDurationLabel = document.querySelector("#waterDurationLabel");

chrome.storage.local.get(
  [
    "timeout",
    "water",
    "walk",
    "showNotifications",
    "lookawayDuration",
    "waterDuration",
    "walkDuration",
    "notifyOnBreakCompletion",
    "enableDND",
    "nextScheduledAlarm",
  ],
  (items) => {
    const {
      timeout,
      water,
      walk,
      lookawayDuration,
      walkDuration,
      waterDuration,
      notifyOnBreakCompletion,
      showNotifications,
      enableDND,
      nextScheduledAlarm,
    } = items;

    if (nextScheduledAlarm) {
      let timeDiff = nextScheduledAlarm - Date.now();
      const intervalId = setInterval(() => {
        if (timeDiff > 0) {
          nextBreakNode.textContent = `Next Break in: ${getBreakDurationInMinSecOrdinal(
            timeDiff
          )}`;
          timeDiff -= 1000;
        } else {
          nextBreakNode.textContent = `Next Break in: 00:00:00`;
          clearInterval(intervalId);
        }
      }, 1000);
    }

    timeoutInput?.setAttribute("value", timeout?.toString());
    waterInput?.setAttribute("value", water?.toString());
    walkInput?.setAttribute("value", walk?.toString());

    lookawayDurationInput?.setAttribute("value", lookawayDuration / 1000);
    walkDurationInput?.setAttribute("value", walkDuration / 1000);
    waterDurationInput?.setAttribute("value", waterDuration / 1000);

    timeoutLabel.textContent = `Look away from screen - every ${timeout} minutes`;
    waterLabel.textContent = `Drink water - every ${water} minutes`;
    walkLabel.textContent = `Stretch/Stroll - every ${walk} minutes`;

    lookAwayDurationLabel.textContent = `Look away from screen duration - ${getBreakDurationStringInMinutesAndSeconds(
      lookawayDuration
    )}`;
    walkDurationLabel.textContent = `Stretch/Stroll duration - ${getBreakDurationStringInMinutesAndSeconds(
      walkDuration
    )}`;
    waterDurationLabel.textContent = `Drink water duration - ${getBreakDurationStringInMinutesAndSeconds(
      waterDuration
    )}`;

    notifications.checked = showNotifications;
    dnd.checked = enableDND;
    notifyOnBreakCompletionInput.checked = notifyOnBreakCompletion;
  }
);

timeoutInput?.addEventListener("input", (e) => {
  //Update the label with the current slider value
  const label = document.querySelector("#timeoutLabel");
  label.textContent = `Look away from screen - every ${e.target.value} minutes`;
});

waterInput?.addEventListener("input", (e) => {
  //Update the label with the current slider value
  const label = document.querySelector("#waterLabel");
  label.textContent = `Drink water - every ${e.target.value} minutes`;
});

walkInput?.addEventListener("input", (e) => {
  //Update the label with the current slider value
  const label = document.querySelector("#walkLabel");
  label.textContent = `Stretch/Stroll - every ${e.target.value} minutes`;
});

lookawayDurationInput?.addEventListener("input", (e) => {
  const durationInMs = getDurationInMS(e);
  lookAwayDurationLabel.textContent = `Look away from screen duration: ${getBreakDurationStringInMinutesAndSeconds(
    durationInMs
  )}`;
});

waterDurationInput?.addEventListener("input", (e) => {
  const durationInMs = getDurationInMS(e);
  waterDurationLabel.textContent = `Drink water duration: ${getBreakDurationStringInMinutesAndSeconds(
    durationInMs
  )}`;
});

walkDurationInput?.addEventListener("input", (e) => {
  const durationInMs = getDurationInMS(e);
  walkDurationLabel.textContent = `Stretch/Stroll duration: ${getBreakDurationStringInMinutesAndSeconds(
    durationInMs
  )}`;
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const formData = new FormData(form);

  const timeout = parseInt(formData.get("timeout"));
  const water = parseInt(formData.get("water"));
  const walk = parseInt(formData.get("walk"));
  const showNotifications = formData.get("notifications") === "on";
  const enableDND = formData.get("dnd") === "on";
  const notifyOnBreakCompletion =
    formData.get("notifyOnBreakCompletion") === "on";

  const lookawayDuration =
    parseInt(formData.get("lookawayDuration")) * TO_MS_MULTIPLER;
  const walkDuration = parseInt(formData.get("walkDuration")) * TO_MS_MULTIPLER;
  const waterDuration =
    parseInt(formData.get("waterDuration")) * TO_MS_MULTIPLER;

  const submitButton = document.querySelector("button[type='submit']");

  submitButton?.classList.add("takeABreak__button--animate");

  try {
    validateInput({ timeout, walk, water });
    //Animate button on click

    //Remove animation class after 1 second
    const animationTimeout = setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("takeABreak__button--animate");
        submitButton.classList.add("takeAbreak__validate");
        submitButton.disabled = true;
      }
      clearTimeout(animationTimeout);
    }, 1250);

    const submitButtonTimeout = setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("takeAbreak__validate");
        submitButton.disabled = false;
      }
      clearTimeout(submitButtonTimeout);
    }, 2350);

    chrome.runtime.sendMessage(
      {
        timeout,
        water,
        walk,
        showNotifications,
        lookawayDuration,
        walkDuration,
        waterDuration,
        notifyOnBreakCompletion,
        enableDND,
      },
      (response) => {
        if (!response) {
          chrome.runtime.reload();
        }
      }
    );
  } catch (err) {
    //Remove animation class after 1 second
    const animationTimeout = setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("takeABreak__button--animate");
        submitButton.classList.add("takeAbreak__invalidate");
        submitButton.disabled = true;
      }
      clearTimeout(animationTimeout);
    }, 1250);

    const submitButtonTimeout = setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("takeAbreak__invalidate");
        submitButton.disabled = false;
      }
      clearTimeout(submitButtonTimeout);
    }, 2350);
  }
});

const accordion = document.getElementsByClassName("accordion")[0];

accordion.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  e.stopPropagation();
  /* Toggle between adding and removing the "active" class,
  to highlight the button that controls the panel */
  this.classList.toggle("active");

  /* Toggle between hiding and showing the active panel */
  const panel = this.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
    document.querySelector("html").style.height = "320px";
    this.innerHTML = `Advanced Settings &#9654;`;
  } else {
    panel.style.display = "block";
    this.innerHTML = `Advanced Settings &#9660;`;
  }
});
