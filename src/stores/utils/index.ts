import {IStore, TState} from "~/src/core/store"
import {Component, TOptions} from "~/src/core/component"
import {ObjMeths} from "~/src/utils"

/**
 * Получить значения из хранилища данных [store], руководствуясь списком ключей
 * [keyList].
 * @param store хранилище данных.
 * @param keyList список допустимых ключей хранилища.
 */
function mapStates<S extends TState, K extends keyof S>(store: IStore<S>, keyList: K[]) {
    return keyList.reduce((acc, it) => {
        acc[it] = store.state.get(it)
        return acc
    }, {} as Record<K, Readonly<S[K]>>)
}

/**
 * Добавить значения из хранилища [store] в props-ы компонента [Target].
 * @param store хранилище данных.
 * @param keyList список допустимых ключей хранилища, значения которых должны
 * быть добавлены в props-ы компонента.
 */
function useState<S extends TState>(store: IStore<S>, keyList: Array<keyof S>) {
    const getStates = () => mapStates(store, keyList)
    return function decorateComponent<
        P extends ReturnType<typeof getStates>,
        C extends string = never,
        E extends string = never,
    >(Target: typeof Component) {
        return class extends Target<P, C, E> {
            constructor(options: TOptions<Omit<P, keyof S>, C, E>) {
                const {props = {}, ...otherOptions} = options
                const ref = {state: getStates()}
                const propsAndState = {...props, ...ref.state} as P

                super({props: propsAndState, ...otherOptions})

                store.watch(() => {
                    const newState = getStates()
                    if (!ObjMeths.isEqual(ref.state, newState)) {
                        ref.state = newState
                        this.props = newState as Partial<P>
                    }
                })
            }
        }
    }
}

export {useState}
