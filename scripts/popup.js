let copyButton = document.getElementById("copyButton");
let infoText = document.getElementById("infoText");

copyButton.addEventListener('click', () => {
    send({
        copy: true
    });
});

async function send(message) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, message);
    infoText.textContent = response;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    infoText.textContent = message.info;
    // Optional: sendResponse({message: "goodbye"});
});

/**************************************************************************
Functions to inject content.js script
***************************************************************************/
async function getCurrentTab() {
    let queryOptions = { active: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};

function injectContentScript(tab) {
    const { id, url } = tab;
    chrome.scripting.executeScript(
        {
            target: { tabId: id, allFrames: true },
            files: ['scripts/read.js']
        }
    );
};

getCurrentTab().then((tab) => {
    injectContentScript(tab);
});