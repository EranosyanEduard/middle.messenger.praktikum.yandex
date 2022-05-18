import {THttpClientOptions} from "~/src/core/http-client"

const API_CLIENT_TYPES = {
    auth: "auth",
    chat: "chats",
    user: "user",
}

const BASE_DOMAIN = "ya-praktikum.tech"

const BASE_URL_PATH = `https://${BASE_DOMAIN}/api/v2`

/**
 * Получить стандартные настройки api-клиента.
 * @param key ключ, указывающий тип api-клиента.
 */
function getBaseApiClientOpts(key: keyof typeof API_CLIENT_TYPES): THttpClientOptions {
    return {
        headers: {
            "content-type": "application/json",
        },
        url: `${BASE_URL_PATH}/${API_CLIENT_TYPES[key]}`,
        withCredentials: true,
    }
}

export {BASE_DOMAIN, BASE_URL_PATH, getBaseApiClientOpts}
