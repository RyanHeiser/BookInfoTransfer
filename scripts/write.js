var infoArr = ["default_description", "default_ean", "default_pricing"];

chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("change");
    chrome.storage.sync.get("info", function(obj) {
        console.log("got: " + obj.info);
        infoArr = obj.info;
        pasteInfo();
    })
});

  function pasteInfo() {
    console.log("pasting");
    const description = document.getElementById("view_description");
    description.value = infoArr[0];
    const ean = document.getElementById("view_ean");
    ean.value = infoArr[1];
    const price = document.getElementById("view_price_default");
    price.value = infoArr[2];
    const inv = document.getElementById("view_function__reorder_lvl");
    inv.value = "1";
  }