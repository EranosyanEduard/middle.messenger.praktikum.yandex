export const enum EActions {
    DidUpdate = "didUpdate",
}

export type TState = Record<string, unknown>

export interface IStore<S extends TState> {
    /**
     * @description
     * Интерфейс, предоставляющий методы для чтения/записи данных.
     */
    state: {
        get<K extends keyof S>(key: K): Readonly<S[K]>
        set<K extends keyof S>(key: K, val: S[K]): void
    }

    /**
     * @description
     * Интерфейс, позволяющий "подписаться" на событие обновления данных.
     * @param cb функция, вызываемая при наступлении целевого события.
     */
    watch(cb: CallableFunction): void
}
