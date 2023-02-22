const db = "https://mc5qu4r3.github.io/passover/db/";

function checkItem(barcode) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            document.getElementById("itemData").innerText = xmlHttp.responseText;
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);   
}