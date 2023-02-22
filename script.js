const db = "https://mc5qu4r3.github.io/passover/db";

function setItemData(itemJSON) {

    document.getElementById("itemName").innerText = itemJSON.hebrewName;
    document.getElementById("itemBarcode").innerText = itemJSON.barcode;
    document.getElementById("itemInfo").innerText = itemJSON.info;

    resultHeaderClasses = "w3-panel ";
    resultCardClasses = "w3-card-2 w3-margin ";

    var isKosher = false;

    itemJSON.info.forEach(addInfo => {
        if (addInfo.includes("כשר לפסח")) {

            isKosher = true;
            resultHeaderClasses += "w3-green"
            resultCardClasses += "w3-light-green"
            document.getElementById("resultHeader").innerText = "כשר לפסח";
        }
    });

    if ( isKosher === false ) {
        resultHeaderClasses += "w3-red";
        resultCardClasses += "w3-pale-red";
        document.getElementById("resultHeader").innerText = "אינו כשר לפסח";
    }

    document.getElementById("resultCard").className = resultCardClasses;
    document.getElementById("resultHeader").className = resultHeaderClasses;
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