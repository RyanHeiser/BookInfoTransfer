
var infoArr = ["default_description", "default_ean", "default_pricing"];

console.log("injected write.js from Book Info Transfer");

// listens for changes to "info" in storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.info.newValue != undefined) {
        chrome.storage.sync.get("info", function(obj) {
            console.log("got: " + obj.info);
            infoArr = obj.info;
            pasteInfo();
        })
    }
});

  function pasteInfo() {
    // try {
      console.log("pasting");

      // enters description
      const description = document.getElementById("view_description");
      description.value = infoArr[0];

      // enters EAN
      const ean = document.getElementById("view_ean");
      ean.value = infoArr[1];

      // enters price
      const price = document.getElementById("view_price_default");
      price.value = infoArr[2];

      // gets the current date and enters the appropriate tag
      let tagValue = "b";
      const date = new Date(); 
      tagValue += monthToString(date.getMonth());
      tagValue += yearToString(date.getFullYear());
      let tag = document.getElementById("react-select-4-input");
      if (!tag) {
        tag = document.getElementById("react-select-7-input");
        console.log("check 7")
      }
      if (!tag) {
        tag = document.getElementById("react-select-10-input");
        console.log("check 10")
      }
      tag.focus();
      // enters the tag string into the input element
      if (!document.execCommand('insertText', false, tagValue)) {
          tag.value = value;
      }
      tag.dispatchEvent(ev); // dispatches a keydown event to simulate the enter key being pressed

      // sets the vendor
      if (!infoArr[3]) {
          infoArr[3] = "NO_VENDOR_FOUND";
      }
      let vendor = document.getElementById("react-select-3-input");
      if (!vendor) {
        vendor = document.getElementById("react-select-6-input");
        console.log("check 6")
      }
      if (!vendor) {
        tag = document.getElementById("react-select-9-input");
        console.log("check 9")
      }
      vendor.focus();
      // enters the vendor string into the input element
      if (!document.execCommand('insertText', false, infoArr[3])) {
          vendor.value = value;
      }
      vendor.dispatchEvent(ev); // dispatches a keydown event to simulate the enter key being pressed
      
      // sets inventory to 1
      let inv = document.getElementById("view_function__reorder_lvl");
      inv.value = "1";

      chrome.storage.sync.clear(); // clears storage so the same book info can be passed in and the onChanged listener will still fire
    // } catch (err) {
    //   console.log("Must be on the Inventory/New Item page to transfer information\n" + err + err.);
    // 
  }

  // converts a month integer (0-11) to a 3 character string
  function monthToString(month) {
    switch(month) {
        case 0: return "jan";
        case 1: return "feb";
        case 2: return "mar";
        case 3: return "apr";
        case 4: return "may";
        case 5: return "jun";
        case 6: return "jul";
        case 7: return "aug";
        case 8: return "sep";
        case 9: return "oct";
        case 10: return "nov";
        case 11: return "dec";
    }
  }

  // gets the last two digits of the year
  function yearToString(year) {
    return year.toString().slice(2,4);
  }

  // event to simulate enter key
  const ev = new KeyboardEvent('keydown', {altKey:false,
    bubbles: true,
    cancelBubble: false, 
    cancelable: true,
    charCode: 0,
    code: "Enter",
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: true,
    detail: 0,
    eventPhase: 0,
    isComposing: false,
    isTrusted: true,
    key: "Enter",
    keyCode: 13,
    location: 0,
    metaKey: false,
    repeat: false,
    returnValue: false,
    shiftKey: false,
    type: "keydown",
    which: 13});
