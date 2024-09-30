import "../popup/popup.css";
import { encodeHTMLEntities, validateInput } from "./utils.js";
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

    timeoutInput?.setAttribute("value", timeout?.toString());
    waterInput?.setAttribute("value", water?.toString());
    walkInput?.setAttribute("value", walk?.toString());

    timeoutLabel.textContent = `Look away from screen - every ${timeout} minutes`;
    waterLabel.textContent = `Drink water - every ${water} minutes`;
    walkLabel.textContent = `Stretch/Stroll - every ${walk} minutes`;

    notifications.checked = items.showNotifications;
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

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const formData = new FormData(form);

  const timeout = parseInt(formData.get("timeout"));
  const water = parseInt(formData.get("water"));
  const walk = parseInt(formData.get("walk"));
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

    const submitButtonTimeout = setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("takeAbreak__validate");
        submitButton.disabled = false;
      }
      clearTimeout(submitButtonTimeout);
    }, 2350);

    chrome.runtime.sendMessage(
      { timeout, water, walk, showNotifications },
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

const accordion = document.getElementsByClassName("accordion");

accordion[0].addEventListener("click", function (e) {
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
    this.innerHTML = `Advanced Settings &#9654;`;
  } else {
    panel.style.display = "block";
    this.innerHTML = `Advanced Settings &#9660;`;
  }
});
