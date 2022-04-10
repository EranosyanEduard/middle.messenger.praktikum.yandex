import {TRecord} from "~/src/models/common"

export const enum EHttpMethods {
    Delete = "DELETE",
    Get = "GET",
    Post = "POST",
    Put = "PUT",
}

export type TOptions = Partial<{headers: TRecord<string>; timeout: number; url: string}>

export type TReqOptions = Omit<TOptions, "url"> & Partial<{body: TRecord}>

export type TReqDetails = {baseOptions: TOptions; method: EHttpMethods; reqOptions: TReqOptions; url: string}

export type TUrlDetails = Record<"base" | "entryPoint" | "queryParams", string>

type THttpClientMethodName = "delete" | "get" | "post" | "put"

type THttpClientMethod = (url: string, options: TReqOptions) => Promise<XMLHttpRequest>

export interface IHttpClient extends Record<THttpClientMethodName, THttpClientMethod> {}