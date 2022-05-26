import {TRecord} from "~/src/models/common"

type TKey = "create" | "read" | "update" | "delete"

export type TCallableFunctions = Record<string, CallableFunction>

export interface IApiClient extends Record<TKey, TCallableFunctions | null> {}

export type TResponse<D extends TRecord | TRecord[]> = {
    data: D
    isOK: boolean
    status: {code: number; text: string}
}

export type TErrorResponse = TResponse<{error: string}>
