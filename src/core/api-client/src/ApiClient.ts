import {
    HttpClient,
    IHttpClient,
    THttpClientMethod,
    THttpClientOptions,
} from "~/src/core/http-client"
import {is} from "~/src/utils"
import {TRecord} from "~/src/models/common"
import {IApiClient, TCallableFunctions, TErrorResponse, TResponse} from "../models"

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

    protected async send<R extends TRecord | TRecord[] = never>(
        send: () => ReturnType<THttpClientMethod>,
    ): Promise<TResponse<R>> {
        function createErrorPayload(payload: TErrorResponse) {
            return JSON.stringify(payload)
        }

        const ERROR_KEY = "reason"

        try {
            const {responseText, status: statusCode, statusText} = await send()
            const status = {
                code: statusCode,
                text: statusText,
            }

            let data: R | {[ERROR_KEY]: string} | object
            try {
                data = JSON.parse(responseText)
            } catch (e) {
                data = {}
            }

            if (statusCode.toString().startsWith("2") || statusCode === 304) {
                return {
                    data: data as R,
                    isOK: true,
                    status,
                }
            }

            let error = "Неизвестная причина ошибки"
            if (is.obj(data) && Reflect.has(data, ERROR_KEY)) {
                const reason = Reflect.get(data, ERROR_KEY)
                if (is.str(reason)) {
                    error = reason
                }
            }

            throw new Error(
                createErrorPayload({
                    data: {error},
                    isOK: false,
                    status,
                }),
            )
        } catch (e) {
            if (e instanceof Error && e.message.includes("isOK")) {
                return Promise.reject(e.message)
            }
            return Promise.reject(
                createErrorPayload({
                    data: {error: ""},
                    isOK: false,
                    status: {
                        code: NaN,
                        text: "",
                    },
                }),
            )
        }
    }
}

export default ApiClient
