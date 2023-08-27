import "./content.css";

chrome.storage.local.get(["breakAlarm", "walkAlarm", "waterAlarm"], (items) => {
  const [task, interval] = getMessageAndInterval(items.task);
  if (
    window.location.href.startsWith("http") ||
    window.location.href.startsWith("https")
  ) {
    // const body = document.querySelector('body');
    console.log(task, interval);
    const checkIfTakeABreakContainerExists = document.querySelector(
      ".takeABreak__container"
    );
    if (checkIfTakeABreakContainerExists) {
      const h2 = document.querySelector(".takeABreak__task");
      h2?.textContent && (h2.textContent = h2.textContent + task);
      const h3 = document.querySelector(".takeABreak__timer");
      const timer = interval;
      h3 && (h3.textContent = `You can continue in ${timer / 1000} seconds`);
    } else {
      const div = document.createElement("div");
      div.className = "takeABreak__container";
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

      div.appendChild(h1);
      div.appendChild(h2);
      div.appendChild(h3);
      div.appendChild(button);

      const countdown = setInterval(() => {
        timer -= 1000;
        h3.innerHTML = `You can continue in ${timer / 1000} seconds`;
      }, 1000);

      document.body.appendChild(div);

      const timeoutId = setTimeout(() => {
        div.remove();
        clearTimeout(timeoutId);
        clearTimeout(countdown);
        timer = interval;
      }, interval);
    }
  }
});

function getMessageAndInterval(alarmName: string): [string, number] {
  switch (alarmName) {
    case "breakAlarm":
      return ["To Look At Something 20 Feet Away For 20 Seconds", 20000];
    case "waterAlarm":
      return ["And Drink A Glass Of Water", 60000];
    case "walkAlarm":
      return ["To Stretch And Walk Around For 2 Minutes", 120000];
    default:
      return ["", 0];
  }
}
