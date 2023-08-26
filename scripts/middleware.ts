import "../popup/popup.css";
const form = document.querySelector("form");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const timeout = parseInt(formData.get("timeout") as string);
  const water = parseInt(formData.get("water") as string);
  const walk = parseInt(formData.get("walk") as string);

  chrome.runtime.sendMessage({ timeout, water, walk });
});
