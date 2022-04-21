type TKey = "create" | "read" | "update" | "delete"

export type TCallableFunctions = Record<string, CallableFunction>

export interface IApiClient extends Record<TKey, TCallableFunctions | null> {}

export type TResponse<D extends Record<string, unknown>> = {
    data: D
    status: {code: number; text: string}
}
