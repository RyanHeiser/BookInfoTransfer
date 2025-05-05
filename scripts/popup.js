let transferButton = document.getElementById("transferButton");
// let pasteButton = document.getElementById("pasteButton");
let infoText = document.getElementById("infoText");

var infoArr = ["default_description", "default_ean", "default_pricing"];

// listens for the copy button to be clicked
transferButton.addEventListener('click', () => {
  (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true}); // get the current tab
      const response = await chrome.tabs.sendMessage(tab.id, {greeting: "copy"}); // send a message to read.js to copy information
      console.log(response);
      infoArr = response;  // sets the infoArr to the response received
      // saves the info to storage
      await chrome.storage.sync.set({info: response}, function() {
        console.log("info saved to storage");
      });

      console.log(chrome.storage.sync);
      infoText.textContent = "copied info"; // temp
    })();
});
