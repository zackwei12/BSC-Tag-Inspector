// --- How it Works ---
// 1. It finds the button and the results area in popup.html.
// 2. When the button is clicked, it runs the scanner (content.js) on the current webpage.
// 3. It listens for a message from the scanner.
// 4. When it receives the tags, it looks them up in the bscDatabase (from database.js) and displays the translations.

// Find the HTML elements we need to work with.
const translateButton = document.getElementById('translateBtn');
const resultsDiv = document.getElementById('results');

// Add a 'click' listener to the button.
translateButton.addEventListener('click', async () => {
  resultsDiv.textContent = 'Scanning page...';
  
  // Get the current active browser tab.
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Execute our scanner script on that tab.
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

// Listen for the message containing the tags from content.js.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.bscTagsFound) {
    const tags = message.bscTagsFound.split(',');
    let output = '';

    // Loop through each tag that was found.
    tags.forEach(tag => {
      const trimmedTag = tag.trim();
      // Look up the tag in our database.
      const translation = bscDatabase[trimmedTag];
      
      // Build the display text.
      if (translation) {
        output += `<b>${trimmedTag}</b>: ${translation}\n`;
      } else {
        output += `<b>${trimmedTag}</b>: Unknown Tag\n`;
      }
    });

    // Show the final results in the popup.
    resultsDiv.innerHTML = output;
  } else {
    // This runs if the content script finds no tags.
    resultsDiv.textContent = 'No BSC tags were found on this page.';
  }
});