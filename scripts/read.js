var infoArr = ["default_description", "default_ean", "default_pricing"];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting === "copy") {
        response = copyInfo();
        sendResponse(response);
      }
    }
  );

function copyInfo() {
    console.log("The getInfo() function is being called.");
    const title = document.getElementById("pd-title").textContent;
    let cover = "sc";
    const productDetails = document.getElementsByClassName("productDetailElements");
    if (productDetails.item(3).textContent.toLowerCase().includes("hardcover")) {
        cover = "hc";
    }
    const author = document.getElementsByClassName("doContributorSearch").item(0).textContent;
    infoArr[0] = title + " " + cover + " | " + author;
    let EAN = productDetails.item(0).textContent;
    EAN = EAN.substring(EAN.indexOf("EAN:") + 4).trim();
    infoArr[1] = EAN;
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


