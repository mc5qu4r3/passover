const db = "https://mc5qu4r3.github.io/passover/db";

function setItemData(itemJSON) {

    document.getElementById("itemName").innerText = itemJSON.hebrewName;
    document.getElementById("itemBarcode").innerText = itemJSON.barcode;
    document.getElementById("itemInfo").innerText = itemJSON.info;
}

function checkItem() {

    var barcodeValue = document.getElementById("barcodeValue").value;

    fetch(`${db}/${barcodeValue}.json`, {
        method: 'GET',
        headers: {'Accept': 'application/json',},
    })
    .then(response => response.json())
    .then(jsonData => setItemData(jsonData));
}