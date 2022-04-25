const apiClientTypes = {
    auth: "auth",
    user: "user",
}

const baseHeaders = {
    "content-type": "application/json",
}

const basePath = "https://ya-praktikum.tech/api/v2"

/**
 * "Склеить" основной URL c отдельной категорией конечных точек.
 * @param key
 * @returns
 */
const getPath = (key: keyof typeof apiClientTypes) => `${basePath}/${apiClientTypes[key]}`

export {baseHeaders, getPath}
