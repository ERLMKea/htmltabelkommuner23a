import {fetchAnyUrl, restDelete} from "./modulejson.js";
console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const urlKommuneKode = "http://localhost:8080/kommune"

const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    row.id = kommune.navn

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode
    cell.style.width = "15%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn
    cell.style.width = "20%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href
    cell.style.width = "15%"

    if ((kommune.hrefPhoto.length) < 2) {
        cell = row.insertCell(cellCount++)
        cell.innerHTML = kommune.hrefPhoto
        cell.style.width = "15%"
    } else {
        cell = row.insertCell(cellCount++)
        let img = document.createElement("img")
        img.setAttribute("src", kommune.hrefPhoto)
        img.setAttribute("alt", "hej")
        img.setAttribute("width", 150)
        img.setAttribute("height", 150)
        cell.appendChild(img)
    }

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.kode
    cell.style.width = "15%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn
    cell.style.width = "20%"

    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    pbDelete.className = "btn1";
    cell.appendChild(pbDelete);

    pbDelete.onclick = function() {
        document.getElementById(kommune.navn).remove();
        deleteKommune(kommune);
    }
}

async function deleteKommune(kommune) {
    try {
        const url = urlKommuneKode + "/" + kommune.kode
        const resp = await restDelete(url)
        const body = await resp.text();
        alert(body)
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
}

let kommuner = []
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommune);
    kommuner.forEach(createTable);
}

pbCreateKommuneTable.addEventListener("click", fetchKommuner);

