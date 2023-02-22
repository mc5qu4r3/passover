const db = "https://mc5qu4r3.github.io/passover/db/";

function checkItem(barcode) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `${db}\barcode`);
    xmlHttp.send(`null`)
    document.getElementById("itemData").innerText = xmlHttp.responseText;
}