import {TRecord} from "~/src/models/common"

export const enum EHttpMethods {
    DELETE = "DELETE",
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
}

export type TOptions = Partial<{
    headers: TRecord<string>
    timeout: number
    url: string
    withCredentials: boolean
}>

export type TReqOptions = Pick<TOptions, "headers" | "timeout"> & {body?: FormData | TRecord}

export type TReqDetails = {
    baseOptions: TOptions
    method: EHttpMethods
    reqOptions: TReqOptions
    url: string
}

export type TUrlDetails = Record<"base" | "entryPoint" | "queryParams", string>

type THttpClientMethodName = "delete" | "get" | "post" | "put"

export type THttpClientMethod = (url: string, options: TReqOptions) => Promise<XMLHttpRequest>

export interface IHttpClient extends Record<THttpClientMethodName, THttpClientMethod> {}
