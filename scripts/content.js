import "./content.css";
import { Alarms } from "./constants";
import lottie from "lottie-web";
import {
  getBreakDurationStringInMinutesAndSeconds,
  getMessageAndIntervalAndAnimation,
  getTaskName,
} from "./utils.js";

//Since the content script here is not a module, we're using a callback to operate on the data we get from storage.
chrome.storage.local.get(
  [Alarms.ScreenBreak, Alarms.Walk, Alarms.Water],
  (items) => {
    try {
      const taskName = getTaskName(items);
      const {
        message: task,
        breaktime: interval,
        animation,
      } = getMessageAndIntervalAndAnimation(taskName);

      if (
        window.location.href.startsWith("http") ||
        window.location.href.startsWith("https")
      ) {
        const checkIfTakeABreakContainerExists = document.querySelector(
          ".takeABreak__container"
        );

        if (checkIfTakeABreakContainerExists) {
          const h2 = document.querySelector(".takeABreak__task");
          h2?.textContent && (h2.textContent = task);
          const lottieContainer = document.querySelector("takeABreak__lottie");
          lottie.loadAnimation({
            container: lottieContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animation,
          });
          const h3 = document.querySelector(".takeABreak__timer");
          const timer = interval;
          h3 &&
            (h3.textContent = `You can continue in ${getBreakDurationStringInMinutesAndSeconds(
              timer
            )}`);
        } else {
          const div = document.createElement("div");
          div.className = "takeABreak__container";
          let audio = document.createElement("audio");
          audio.src = chrome.runtime.getURL("assets/audio/breakover.mp3"); // audio file stored in the extension
          audio.id = "chrome-extension-audio";
          audio.controls = false;

          // Append the audio element to the body of the webpage
          document.body.appendChild(audio);

          // Optionally, play the audio programmatically

          const lottieContainer = document.createElement("div");
          lottieContainer.className = "takeABreak__lottie";
          lottie.loadAnimation({
            container: lottieContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animation,
          });

          const h1 = document.createElement("h1");
          h1.className = "takeABreak__title";
          h1.textContent = "Take a break";

          const h2 = document.createElement("h2");
          h2.className = "takeABreak__task";
          h2.textContent = task;
          let timer = interval;
          const h3 = document.createElement("h3");
          h3.textContent = `You can continue in ${timer / 1000} seconds`;
          h3.className = "takeABreak__timer";

          const button = document.createElement("button");
          button.className = "takeABreak__dismiss";
          button.textContent = "Dismiss";
          button.addEventListener("click", () => {
            div.remove();
            clearTimeout(timeoutId);
            clearTimeout(countdown);
            timer = interval;
          });

          div.appendChild(lottieContainer);
          div.appendChild(h1);
          div.appendChild(h2);
          div.appendChild(h3);
          div.appendChild(button);

          const countdown = setInterval(() => {
            timer -= 1000;
            if (timer === 6000) {
              audio.play();
            }
            h3.innerHTML = `You can continue in ${getBreakDurationStringInMinutesAndSeconds(
              timer
            )}`;
          }, 1000);

          document.body.appendChild(div);

          const timeoutId = setTimeout(() => {
            div.remove();
            clearTimeout(timeoutId);
            clearTimeout(countdown);
            timer = interval;
          }, interval);
        }

        chrome.storage.local.remove([
          Alarms.ScreenBreak,
          Alarms.Water,
          Alarms.Walk,
        ]);
      }
    } catch (e) {
      console.log(
        "Overlay reminders are not shown on empty new tabs and settings page"
      );
    }
  }
);
