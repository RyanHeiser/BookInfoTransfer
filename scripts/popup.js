let copyButton = document.getElementById("copyButton");
let pasteButton = document.getElementById("pasteButton");
let infoText = document.getElementById("infoText");

var infoArr = ["default_description", "default_ean", "default_pricing"];

copyButton.addEventListener('click', () => {
  (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      chrome.tabs.executeScript
      const response = await chrome.tabs.sendMessage(tab.id, {greeting: "copy"});
      console.log(response);
      infoArr = response;
      chrome.storage.local.set({"info": infoArr});
      infoText.textContent = infoArr;
    })();
});

pasteButton.addEventListener('click', () => {
  (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const response = await chrome.tabs.sendMessage(tab.id, {greeting: "paste"});
      //console.log(response);
    })();
});
