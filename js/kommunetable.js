import {fetchAnyUrl, restDelete, fetchRegioner} from "./modulejson.js";
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

    //Add image
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

    //Add region dropdown
    cell = row.insertCell(cellCount++)
    const dropdown = document.createElement('select');
    regmap.forEach(reg => {
        const element = document.createElement('option');
        element.textContent = reg.navn
        element.value = reg.kode
        element.region = reg
        dropdown.append(element);
    })
    cell.appendChild(dropdown)


    //cell = row.insertCell(cellCount++)
    //cell.innerHTML = kommune.region.kode
    //cell.style.width = "15%"

    //cell = row.insertCell(cellCount++)
    //cell.innerHTML = kommune.region.navn
    //cell.style.width = "20%"

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

function sortKommuner(kommuner) {
    //sortere efter først region kode, indenfor hver region efter navn
    return kommuner.sort((kom1, kom2) => {
        if (kom1.region.kode > kom2.region.kode) {
            return 1
        } else if (kom2.region.kode > kom1.region.kode) {
            return -1
        } else if (kom1.navn>kom2.navn) {
            return 1
        } else { return -1 }
    })
}


let kommuner = []
let regmap = new Map()

async function fetchKommuner() {
    regmap = await fetchRegioner()
    kommuner = await fetchAnyUrl(urlKommune);
    kommuner = sortKommuner(kommuner)
    kommuner.forEach(createTable);
}

pbCreateKommuneTable.addEventListener("click", fetchKommuner);

