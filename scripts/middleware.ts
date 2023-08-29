import "../popup/popup.css";
const form = document.querySelector("form");
const timeoutInput = document.querySelector("#timeout");
const waterInput = document.querySelector("#water");
const walkInput = document.querySelector("#walk");
chrome.storage.local.get(["timeout", "water", "walk"], (items) => {
  const { timeout, water, walk } = items;

  timeoutInput?.setAttribute("value", timeout?.toString() || "0");
  waterInput?.setAttribute("value", water?.toString() || "0");
  walkInput?.setAttribute("value", walk?.toString() || "0");
});

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

  chrome.runtime.sendMessage({ timeout, water, walk });
});
