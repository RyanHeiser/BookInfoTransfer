const Vendors = new Map();

async function loadVendors() {
    console.log("vendors loaded");
    const res = await fetch("../vendors.csv");
    let text = await res.text();
    while (text.length > 0) {
        let publisher = text.substring(0, text.indexOf(",")).trim().toLowerCase();
        text = text.substring(text.indexOf(",") + 1, text.length);
        let vendor =  text.substring(0, text.indexOf(",")).trim();
        Vendors.set(publisher, vendor);
        try {
            text = text.substring(text.indexOf("\n") + 1, text.length);
        } catch (err) {
            break;
        }
    }
    return "vendors loaded";
}

async function getVendor(publisher) {
    return Vendors.get(publisher.toLowerCase());
}