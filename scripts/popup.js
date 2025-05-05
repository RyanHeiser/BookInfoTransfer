let transferButton = document.getElementById("transferButton");
// let pasteButton = document.getElementById("pasteButton");
let infoText = document.getElementById("infoText");

var infoArr = ["default_description", "default_ean", "default_pricing", "default_publisher"];

// resets storage when popup is opened
// prevents info from staying stored if write.js doesn't receive the storage change and clear it, causing the storage change listener to never fire
window.onload = function() {
  chrome.storage.sync.clear();
}

// listens for the copy button to be clicked
transferButton.addEventListener('click', () => {
  (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true}); // get the current tab
      if (tab != undefined) {
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "copy"}); // send a message to read.js to copy information
        if (response != undefined) {
          console.log(response);
          infoArr = response;  // sets the infoArr to the response received
          await loadVendors(); // setup the vendors hashmap
          infoArr[3] = await getVendor(infoArr[3]); // get the vendor using the publisher as the key
          console.log(infoArr[3]);
          // saves the info to storage
          await chrome.storage.sync.set({info: infoArr}, function() {
            console.log("info saved to storage");
          });
          infoText.textContent = "transfered info";
        } else {
          console.log("could not extract data");
        }
      } else {
        console.log("no valid active tabs in last focused window");
        infoText.textContent = "no valid active tabs in last focused window";
      }
    })().catch((err) => {
      console.log("transfer must be initiated from a book webpage on the ipage site\n" + err);
      infoText.textContent = "transfer must be initiated from a book webpage on the ipage site";
    });
});


