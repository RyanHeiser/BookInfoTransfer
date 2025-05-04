var infoArr = ["default_description", "default_ean", "default_pricing"];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting.length > 0) {
        //response = getInfo();
        console.log("test");
        chrome.storage.local.get(["info"]).then((result) => {
            console.log("Value currently is " + result.key);
            infoArr = result.key;
            pasteInfo();
          });
        
        sendResponse("hi");
      }
    }
  );

  function pasteInfo() {
    const description = document.getElementById("view_description");
    description.textContent = infoArr[0];
  }