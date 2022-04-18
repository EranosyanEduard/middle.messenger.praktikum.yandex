import {v} from "~/src/utils"
import {TRecord} from "~/src/models/common"
import {TUrlDetails} from "../models"

/**
 * "Собрать" URL-адрес на основании его частей, переданных в аргументе
 * [urlDetails].
 * @param urlDetails объект, содержащий следующие части URL-адреса:
 * base - адрес сервера; entryPoint - конечная точка; queryString - параметры
 * запроса;
 */
function joinURL(urlDetails: TUrlDetails): string {
    // Создать копию объекта urlDetails, очистив значения объекта от "висячих"
    // слешов.
    const {base, entryPoint, queryParams} = Object.entries(urlDetails).reduce((acc, url) => {
        const [type, val] = url
        acc[type] = val.replace(/(^\/+|\/+$)/g, "")
        return acc
    }, {} as TRecord<string>) as TUrlDetails

    let joinedURL: string
    if (v.empty.str(base)) {
        joinedURL = entryPoint
    } else {
        joinedURL = `${base}/${entryPoint}`
    }
    if (v.not.empty.str(queryParams)) {
        joinedURL = `${joinedURL}?${queryParams}`
    }
    return joinedURL
}

export {joinURL}
