

function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions)
    return response
}

const urlRegioner = "http://localhost:8080/regioner"

let regionMap = new Map()

async function fetchRegioner() {
    const regioner = await fetchAnyUrl(urlRegioner)
    regioner.forEach(region => regionMap.set(region.navn, region))
    return regionMap
}


export { fetchAnyUrl, restDelete, fetchRegioner}

