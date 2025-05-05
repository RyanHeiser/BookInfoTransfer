let copyButton = document.getElementById("copyButton");
let pasteButton = document.getElementById("pasteButton");
let infoText = document.getElementById("infoText");

var infoArr = ["default_description", "default_ean", "default_pricing"];

// listens for the copy button to be clicked
copyButton.addEventListener('click', () => {
  (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true}); // get the current tab
      const response = await chrome.tabs.sendMessage(tab.id, {greeting: "copy"}); // send a message to read.js to copy information
      console.log(response);
      infoArr = response;  // sets the infoArr to the response received
      // saves the info to local storage
      await chrome.storage.local.set({info: response}, function() {
        console.log("info saved to storage");
      });
      // chrome.storage.local.get("info", function(obj) {
      //   console.log("got: " + obj.info);
      // })
      console.log(chrome.storage.local);
      infoText.textContent = "copied info"; // temp
    })();
});

// listens for the paste button to be clicked
pasteButton.addEventListener('click', () => {
  (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true}); // get the current tab
      const response = await chrome.tabs.sendMessage(tab.id, {greeting: "paste"}); // send a message to write.js to paste information
      infoText.textContent = "pasted info";
      //console.log(response);
    })();
});
