export const enum EActions {
    DID_UPDATE = "didUpdate",
}

export type TOptions = {
    isPersist: boolean
    name: string
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
     * Интерфейс, позволяющий "подписаться" на событие обновления данных или
     * отписаться от него.
     * @param cb функция, вызываемая при наступлении целевого события.
     */
    watch<K extends keyof S>(
        cb: (args: {key: K}) => void,
    ): {
        off(): void
        on(): void
    }
}
