const tagRegex = /\b(\d{8}(,\d{8})+)\b/;
const pageContent = document.body.innerHTML;
const match = pageContent.match(tagRegex);
if (match && match[0]) {
  chrome.runtime.sendMessage({ bscTagsFound: match[0] });
}