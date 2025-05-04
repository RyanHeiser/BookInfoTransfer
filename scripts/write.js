setTimeout(function() {
    var description = document.getElementById("view_description");
    console.log(description);
    if (description) {
        description.value = "test";
    }
}, 3000);


function write() {
    console.log("write");
    var description = document.getElementById("view_description");

    if (description) {
        description.value = "test";
    }
}