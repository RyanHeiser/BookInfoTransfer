var infoArr = ["default_description", "default_ean", "default_pricing"];

// listens for the copy message from popup.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting === "copy") {
        response = copyInfo();
        sendResponse(response);
      }
    }
  );

  // extracts the information from the site
function copyInfo() {
    const title = document.getElementById("pd-title").textContent; // gets the title of the book

    // assumes the the book is softcover then checks if it is listed as a hardcover
    let cover = "sc";
    const productDetails = document.getElementsByClassName("productDetailElements");
    if (productDetails.item(3).textContent.toLowerCase().includes("hardcover")) {
        cover = "hc";
    }

    const author = document.getElementsByClassName("doContributorSearch").item(0).textContent; // gets author
    infoArr[0] = title + " " + cover + " | " + author;  // concatenates the title, cover, and author and adds it to the info array

    // gets the string containing the EAN and then parses to add just the EAN to the array
    let EAN = productDetails.item(0).textContent;
    EAN = EAN.substring(EAN.indexOf("EAN:") + 4).trim();
    infoArr[1] = EAN;

    // parses the string containing price to just add the digits and decimal point
    let price = productDetails.item(2).textContent;
    let start = price.indexOf("$") + 1;
    let end = start;
    for (let i = start; i < price.length; i++) {
      if ((price.at(end + 1) >= '0' && price.at(end + 1) <= '9') || price.at(end + 1) === '.') {
        end++;
      }
    }
    infoArr[2] = price.substring(start, end + 1);

    console.log("info gathered");
    return infoArr;
}


