import {
    HttpClient,
    IHttpClient,
    THttpClientMethod,
    THttpClientOptions,
} from "~/src/core/http-client"
import {v} from "~/src/utils"
import {IApiClient, TCallableFunctions, TResponse} from "../models"

abstract class ApiClient implements IApiClient {
    protected readonly httpClient: IHttpClient

    protected constructor(options: THttpClientOptions) {
        this.httpClient = new HttpClient(options)
    }

    get delete(): TCallableFunctions | null {
        return null
    }

    get read(): TCallableFunctions | null {
        return null
    }

    get update(): TCallableFunctions | null {
        return null
    }

    get create(): TCallableFunctions | null {
        return null
    }

    protected async send<R extends Record<string, unknown> = never>(
        send: () => ReturnType<THttpClientMethod>,
    ): Promise<TResponse<R>> {
        try {
            const {responseText, status, statusText} = await send()

            let data: R | {reason: string} | object
            try {
                data = JSON.parse(responseText)
            } catch (e) {
                data = {}
            }

            if (status.toString().startsWith("2") || status === 304) {
                return {
                    data: data as R,
                    status: {
                        code: status,
                        text: statusText,
                    },
                }
            }

            let error = ""
            if (v.obj(data) && "reason" in data && v.str(data.reason)) {
                error = data.reason as string
            }
            throw new Error(error)
        } catch (e) {
            let reason = "Неизвестная причина ошибки"
            if (e instanceof Error && v.not.empty.str(e.message)) {
                reason = e.message
            }
            return Promise.reject(reason)
        }
    }
}

export default ApiClient
