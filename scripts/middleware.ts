import "../popup/popup.css";
import { validateInput } from "./utils";
const form = document.querySelector("form");
const timeoutInput = document.querySelector("#timeout");
const waterInput = document.querySelector("#water");
const walkInput = document.querySelector("#walk");

const timeoutLabel = document.querySelector("#timeoutLabel");
const waterLabel = document.querySelector("#waterLabel");
const walkLabel = document.querySelector("#walkLabel");
const notifications = document.querySelector("#notifications");

chrome.storage.local.get(
  ["timeout", "water", "walk", "showNotifications"],
  (items) => {
    const { timeout, water, walk } = items;
    console.log(timeout, timeout?.toString());

    timeoutInput?.setAttribute("value", timeout?.toString() ?? "20");
    waterInput?.setAttribute("value", water?.toString() ?? "120");
    walkInput?.setAttribute("value", walk?.toString() ?? "45");

    timeoutLabel!.textContent = `Look away from screen - ${
      timeout ?? "20"
    } minutes`;
    waterLabel!.textContent = `Drink water - ${water ?? "120"} minutes`;
    walkLabel!.textContent = `Stretch/Stroll - ${walk ?? "45"} minutes`;

    (notifications as HTMLInputElement).checked = items.showNotifications;
  }
);

timeoutInput?.addEventListener("input", (e) => {
  //Update the label with the current slider value
  const label = document.querySelector("#timeoutLabel");
  label!.textContent = `Look away from screen - ${
    (e.target as HTMLInputElement).value
  } minutes`;
});

waterInput?.addEventListener("input", (e) => {
  //Update the label with the current slider value
  const label = document.querySelector("#waterLabel");
  label!.textContent = `Drink water - ${
    (e.target as HTMLInputElement).value
  } minutes`;
});

walkInput?.addEventListener("input", (e) => {
  //Update the label with the current slider value
  const label = document.querySelector("#walkLabel");
  label!.textContent = `Stretch/Stroll - ${
    (e.target as HTMLInputElement).value
  } minutes`;
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const formData = new FormData(form);

  const timeout = parseInt(formData.get("timeout") as string);
  const water = parseInt(formData.get("water") as string);
  const walk = parseInt(formData.get("walk") as string);
  const showNotifications = formData.get("notifications") === "on";

  const submitButton = document.querySelector("button");

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

    setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("takeAbreak__validate");
        submitButton.disabled = false;
      }
    }, 2350);

    chrome.runtime.sendMessage({ timeout, water, walk, showNotifications });
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

    setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("takeAbreak__invalidate");
        submitButton.disabled = false;
      }
    }, 2350);
  }
});
