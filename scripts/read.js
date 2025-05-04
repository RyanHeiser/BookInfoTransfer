var infoArr = ["default_description", "default_ean", "default_pricing"];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("read.js listener");
    if (message.copy) {
        getInfo();
    }
});

function getInfo() {
    console.log("The getInfo() function is being called.");
    const title = document.getElementById("pd-title").textContent;
    let cover = "sc";
    const productDetails = document.getElementsByClassName("productDetailElements");
    if (productDetails.item(3).textContent.toLowerCase().includes(hardcover)) {
        cover = "hc";
    }
    const author = document.getElementsByClassName("doContributorSearch").item(0).textContent;
    infoArr[0] = title + " " + cover + " | " + author;
    infoArr[1] = productDetails.item(0).textContent;
    infoArr[2] = productDetails.item(2).textContent;
    console.log("info gathered");
    send({
        info: infoArr
    });
}

async function send(message) {
    const response = await chrome.runtime.sendMessage(message);
    // Optional: do something with response
}