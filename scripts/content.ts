const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text?.matchAll(wordMatchRegExp) || "hello";
  // matchAll returns an iterator, convert to array to get word count
  console.log(words);
  const wordCount = [words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1") as Element;
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode as Element;

  (date ?? heading)?.insertAdjacentElement("afterend", badge)
}
