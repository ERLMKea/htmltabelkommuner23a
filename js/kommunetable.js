import {fetchAnyUrl} from "./modulejson.js";
console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

function createTable(kommune) {
    console.log(kommune);
}

let kommuner = []
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommune);
    kommuner.forEach(createTable);
}

pbCreateKommuneTable.addEventListener("click", fetchKommuner);

