import "../popup/popup.css";
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

    timeoutInput?.setAttribute("value", timeout?.toString() || "0");
    waterInput?.setAttribute("value", water?.toString() || "0");
    walkInput?.setAttribute("value", walk?.toString() || "0");

    timeoutLabel!.textContent = `Look away from screen - ${timeout} minutes`;
    waterLabel!.textContent = `Drink water - ${water} minutes`;
    walkLabel!.textContent = `Stretch/Stroll - ${walk} minutes`;

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
  label!.textContent = `Walk - ${(e.target as HTMLInputElement).value} minutes`;
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

  //Animate button on click
  submitButton?.classList.add("takeABreak__button--animate");

  //Remove animation class after 1 second
  const animationTimeout = setTimeout(() => {
    submitButton?.classList.remove("takeABreak__button--animate");
    submitButton?.classList.add("takeAbreak__validate");
    clearTimeout(animationTimeout);
  }, 2250);

  setTimeout(() => {
    submitButton?.classList.remove("takeAbreak__validate");
  }, 3350);

  chrome.runtime.sendMessage({ timeout, water, walk, showNotifications });
});
