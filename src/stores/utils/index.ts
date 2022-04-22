import {IStore, TState} from "~/src/core/store"
import {ObjMeths, v} from "~/src/utils"
import {IComp} from "~/src/core/component"

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

    return function extendComponent<
        C extends {new (...args: any[]): IComp<Record<string, unknown>>},
    >(Component: C): C {
        return class ExtendedComponent extends Component {
            constructor(...options: any[]) {
                const [opts = null] = options
                if (v.obj(opts)) {
                    const {props = null, ...otherOpts} = opts
                    if (v.obj(props)) {
                        const ref = {state: getStates()}
                        const propsAndState = {...props, ...ref.state}

                        super({props: propsAndState, ...otherOpts})

                        store.watch(() => {
                            const newState = getStates()
                            if (!ObjMeths.isEqual(ref.state, newState)) {
                                ref.state = newState
                                this.props = newState
                            }
                        })
                    }
                }
            }
        }
    }
}

export {useState}
