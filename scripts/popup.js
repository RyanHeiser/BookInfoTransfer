let copyButton = document.getElementById("copyButton");
let infoText = document.getElementById("infoText");

copyButton.addEventListener('click', () => {
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        // do something with response here, not outside the function
        console.log(response);
        infoText.textContent = response;
      })();
});

