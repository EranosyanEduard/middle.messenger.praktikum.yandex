import {
    HttpClient,
    IHttpClient,
    THttpClientMethod,
    THttpClientOptions,
} from "~/src/core/http-client"
import {v} from "~/src/utils"

import {IApiClient, TResponse} from "../models"

abstract class ApiClient implements IApiClient {
    protected readonly httpClient: IHttpClient

    protected constructor(options: THttpClientOptions) {
        this.httpClient = new HttpClient(options)
    }

    get delete() {
        return null
    }

    get read() {
        return null
    }

    get update() {
        return null
    }

    get create() {
        return null
    }

    protected async send<R extends Record<string, unknown>>(
        send: () => ReturnType<THttpClientMethod>,
    ): Promise<TResponse<R>> {
        try {
            const {responseText, status, statusText} = await send()
            const data = JSON.parse(responseText)

            if (status.toString().startsWith("2") || status === 304) {
                return {
                    data: data as R,
                    status: {
                        code: status,
                        text: statusText,
                    },
                }
            }
            throw new Error(v.obj(data) && v.str(data.reason) ? data.reason : "")
        } catch (e) {
            let msg = "Неизвестная причина ошибки"
            if (e instanceof Error && e.message.length > 0) {
                msg = e.message
            }
            return Promise.reject(msg)
        }
    }
}

export default ApiClient
