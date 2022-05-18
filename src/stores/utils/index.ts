import {IStore, TState} from "~/src/core/store"
import {IView} from "~/src/core/view"
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
 * @param storeKeyList список допустимых ключей хранилища, значения которых должны
 * быть добавлены в props-ы компонента.
 * @param propKeyList список альтернативных ключей, которые должны использоваться
 * в props-ах компонента вместо оригинальных ключей хранилища. Соответствие
 * между ключами определяется на основании индексов.
 */
function useState<State extends TState>(
    store: IStore<State>,
    storeKeyList: Array<keyof State>,
    propKeyList: string[] = [],
) {
    const getStates = () => mapStates(store, storeKeyList)

    return function extendView<V extends IView<Record<string, any>, string>>(view: V): V {
        const ref = {state: getStates()}

        const updateProps = () => {
            storeKeyList.forEach((key, index) => {
                const propKey = propKeyList[index] ?? key
                if (Reflect.get(view.props, propKey) !== ref.state[key]) {
                    Reflect.set(view.props, propKey, ref.state[key])
                }
            })
        }

        updateProps()

        store
            .watch(() => {
                const newState = getStates()
                if (!ObjMeths.isEqual(ref.state, newState)) {
                    ref.state = newState
                    updateProps()
                }
            })
            .on()

        return view
    }
}

export {useState}
