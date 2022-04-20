type TKey = "create" | "read" | "update" | "delete"

type TVal = Record<string, CallableFunction>

export interface IApiClient extends Record<TKey, TVal | null> {}

export type TResponse<D extends Record<string, unknown>> = {
    data: D
    status: {code: number; text: string}
}
