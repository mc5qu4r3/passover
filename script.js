const db = "https://mc5qu4r3.github.io/passover/db/";

function checkItem() {

    var barcodeValue = document.getElementById("barcodeValue").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            document.getElementById("itemData").innerText = xmlHttp.responseText;
    }
    xmlHttp.open("GET", `${db}/${barcodeValue}`, true); // true for asynchronous 
    xmlHttp.send(null);   
}