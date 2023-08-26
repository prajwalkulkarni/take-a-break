import "./content.css";
if (
  window.location.href.startsWith("http") ||
  window.location.href.startsWith("https")
) {
  // const body = document.querySelector('body');
  const div = document.createElement("div");
  div.className = "takeABreak__container";
  const h1 = document.createElement("h1");
  h1.className = "takeABreak__title";

  let timer = 10000;
  const h3 = document.createElement("h3");
  h3.textContent = `You can continue in ${timer} seconds`;

  div.appendChild(h1);
  div.appendChild(h3);

  const countdown = setInterval(() => {
    timer -= 1000;
    h3.innerHTML = `You can continue in ${timer} seconds`;
  }, 1000);

  document.body.appendChild(div);

  const timeoutId = setTimeout(() => {
    div.remove();
    clearTimeout(timeoutId);
    clearTimeout(countdown);
    timer = 10000;
  }, 10000);
}
