import {is} from "~/src/utils"
import {joinURL} from "../utils"
import {
    EHttpMethods,
    IHttpClient,
    THttpClientMethod,
    TOptions,
    TReqDetails,
    TReqOptions,
} from "../models"

class HttpClient implements IHttpClient {
    /**
     * @description
     * Значение таймаута запроса по умолчанию (в секундах). Используется в
     * случае отсутствия пользовательского значения.
     * @private
     */
    private static fallbackTimeout = 5

    /**
     * Создать экземпляр класса HttpClient.
     * @param baseOptions объект опций, которые должны применяться к любому
     * запросу.
     */
    constructor(private readonly baseOptions: TOptions) {}

    /**
     * Отправить запрос к удаленному источнику данных.
     * @param reqDetails объект, который содержит подробности запроса.
     * @private
     */
    private static sendRequest(reqDetails: TReqDetails): ReturnType<THttpClientMethod> {
        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const {baseOptions, method, reqOptions, url} = reqDetails
            const {body: reqBody = null} = reqOptions

            // Подготовить URL-адрес запроса.
            let queryParams = ""
            if (method === EHttpMethods.GET && is.obj(reqBody)) {
                queryParams = Object.entries(reqBody)
                    .map((it) => it.join("="))
                    .join("&")
            }
            const joinedURL = joinURL({
                base: baseOptions.url || "",
                entryPoint: url,
                queryParams,
            })
            if (is.empty.str(joinedURL)) {
                reject(new URIError(`URL не может быть пустой строкой: "${joinedURL}"`))
            }

            const req = new XMLHttpRequest()
            req.open(method, joinedURL)
            req.withCredentials = !!baseOptions.withCredentials

            // Подготовить заголовки запроса.
            const {headers: baseHeaders = {}} = baseOptions
            const {headers: reqHeaders = {}} = reqOptions
            Object.entries({...baseHeaders, ...reqHeaders}).forEach(([key, val]) => {
                if (!is.empty.str(val)) {
                    req.setRequestHeader(key, val)
                }
            })

            const timeout = reqOptions.timeout || baseOptions.timeout || HttpClient.fallbackTimeout
            req.timeout = timeout * 1000

            req.onload = () => resolve(req)
            req.onerror = reject
            req.ontimeout = reject

            if (method === EHttpMethods.GET || is.null(reqBody)) {
                req.send()
            } else {
                req.send(reqBody instanceof FormData ? reqBody : JSON.stringify(reqBody))
            }
        })
    }

    delete(url = "", options: TReqOptions = {}): Promise<XMLHttpRequest> {
        return HttpClient.sendRequest({
            baseOptions: this.baseOptions,
            method: EHttpMethods.DELETE,
            reqOptions: options,
            url,
        })
    }

    get(url = "", options: TReqOptions = {}): Promise<XMLHttpRequest> {
        return HttpClient.sendRequest({
            baseOptions: this.baseOptions,
            method: EHttpMethods.GET,
            reqOptions: options,
            url,
        })
    }

    post(url = "", options: TReqOptions = {}): Promise<XMLHttpRequest> {
        return HttpClient.sendRequest({
            baseOptions: this.baseOptions,
            method: EHttpMethods.POST,
            reqOptions: options,
            url,
        })
    }

    put(url = "", options: TReqOptions = {}): Promise<XMLHttpRequest> {
        return HttpClient.sendRequest({
            baseOptions: this.baseOptions,
            method: EHttpMethods.PUT,
            reqOptions: options,
            url,
        })
    }
}

export default HttpClient
