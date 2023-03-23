const db = "https://mc5qu4r3.github.io/passover/db/hametz";

function setItemData(itemJSON) {


    if ( itemJSON === undefined ) {
        document.getElementById("itemName").innerText = "";
        document.getElementById("itemBarcode").innerText = "";
    //    document.getElementById("itemInfo").innerText = "";
        document.getElementById("resultHeader").innerText = "מוצר לא נמצא במערכת";
        document.getElementById("resultCard").className = "w3-card-2 w3-margin w3-light-blue";
        document.getElementById("resultHeader").className = "w3-panel w3-cyan";

        return;
    } 

    document.getElementById("itemName").innerText = itemJSON.hebrewName;
    document.getElementById("itemBarcode").innerText = itemJSON.barcode;
    //document.getElementById("itemInfo").innerText = itemJSON.info.join(', ');

    resultHeaderClasses = "w3-panel ";
    resultCardClasses = "w3-card-2 w3-margin ";

    /*var isKosher = false;

    itemJSON.info.forEach(addInfo => {
        if (addInfo.includes("כשר לפסח")) {

            isKosher = true;
            resultHeaderClasses += "w3-green"
            resultCardClasses += "w3-pale-green"
            document.getElementById("resultHeader").innerText = "כשר לפסח";
        }
    });    

    if ( isKosher === false ) {
        resultHeaderClasses += "w3-red";
        resultCardClasses += "w3-pale-red";
        document.getElementById("resultHeader").innerText = "אינו כשר לפסח";
    }
    */

    resultHeaderClasses += !itemJSON.isHametz ? "w3-green" : "w3-red";
    resultCardClasses += !itemJSON.isHametz ? "w3-pale-green" : "w3-pale-red";
    document.getElementById("resultHeader").innerText = !itemJSON.isHametz ? "המוצר אינו מכיל חמץ" : "המוצר מכיל חמץ";

    document.getElementById("resultCard").className = resultCardClasses;
    document.getElementById("resultHeader").className = resultHeaderClasses;
}

function checkItem() {

    var barcodeValue = document.getElementById("barcodeValue").value;

    fetch(`${db}/${barcodeValue}.json`, {
        method: 'GET',
        headers: {'Accept': 'application/json',},
    })
    .then(response => response.json()).catch(setItemData(undefined))
    .then(jsonData => setItemData(jsonData))
}

/**
 * Since the 'resize' event occur many times, throttle it by
 * constructing new event to be triggered while keeping down number of 'resize' events.
 */
function setOptimizeResizeEvent() {

    var throttle = function (type, name, obj) {

        obj = obj || window;
        var running = false;

        var func = function() {

            if (running) { return; }

            running = true;
            requestAnimationFrame( function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
}

/**
 * Readjust the height of the content element to be the difference between the
 * height of the header and the footer.
 */
function setContentHeight() {

    var content = document.getElementById("content");
    if(document.body.clientHeight >= document.documentElement.clientHeight) return;

    var hh = document.getElementById("header").getBoundingClientRect().height;
    var fh = document.getElementById("footer").getBoundingClientRect().height;

    content.style.height = document.documentElement.clientHeight - (hh + fh) + "px";
}

/**
 * Initialize application for running.
 */
function init() {

    setContentHeight();
    setOptimizeResizeEvent();
    window.addEventListener("optimizedResize", setContentHeight);
}
