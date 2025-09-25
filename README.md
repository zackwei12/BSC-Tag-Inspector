BSC Tag Inspector

BSC Tag Inspector is a Chrome extension that scans webpage for BSC category tags (e.g. bsc:80000200,80222001) and instantly translates them into their human-readable names using a built-in database.



Key files:

manifest.json – extension metadata and permissions

popup.html – user interface

popup.js – popup logic and translation handling

content.js – scans the DOM for BSC tags

database.js – BSC tag → name mapping


Installation

Download the ZIP file and extract it to a folder on your computer.

In Chrome, navigate to chrome://extensions.

Enable Developer mode (toggle in the top right).

Click Load unpacked and select the extracted project folder.

The BSC Tag Translator icon will appear in your Chrome toolbar.
