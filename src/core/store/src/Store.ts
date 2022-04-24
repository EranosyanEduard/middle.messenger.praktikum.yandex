import {EActions, IStore, TOptions, TState} from "../models"
import {EventBus} from "~/src/core/event-bus"
import {ObjMeths, v} from "~/src/utils"

abstract class Store<S extends TState> implements IStore<S> {
    private readonly $state: S

    private readonly eventBus = new EventBus()

    private watcherCount = 0

    protected constructor(
        state: S,
        private readonly options: Readonly<TOptions> = {
            isPersist: false,
            name: "app_state",
        },
    ) {
        if (options.isPersist) {
            const parsedStore = Store.copy.get(options.name, state)
            if (v.obj(parsedStore)) {
                this.$state = parsedStore as S
                return
            }
        }
        this.$state = state
    }

    /**
     * @description
     * Интерфейс чтения/записи копии хранилища, т.е. экземпляра класса Store.
     * Копия хранилища будет храниться в localStorage в случае, если при
     * создании экземпляра класса Store объект опций содержит isPersist: true.
     * @private
     */
    private static get copy() {
        return {
            get: (storeName: string, state: TState): TState | null => {
                const item = localStorage.getItem(storeName)
                if (v.str(item)) {
                    try {
                        const parsedState = JSON.parse(item as string)
                        if (v.obj(parsedState) && ObjMeths.isEqual(state, parsedState, true)) {
                            return parsedState
                        }
                    } catch (e) {
                        return null
                    }
                }
                return null
            },
            set: (storeName: string, state: TState) => {
                localStorage.setItem(storeName, JSON.stringify(state))
            },
        }
    }

    get state() {
        return {
            get: <K extends keyof S>(key: K): Readonly<S[K]> => this.$state[key],
            set: <K extends keyof S>(key: K, val: S[K]) => {
                if (this.$state[key] !== val) {
                    this.$state[key] = val
                    if (this.watcherCount > 0) {
                        this.eventBus.emit(EActions.DidUpdate)
                    }
                    if (this.options.isPersist) {
                        Store.copy.set(this.options.name, this.$state)
                    }
                }
            },
        }
    }

    watch(cb: CallableFunction) {
        this.eventBus.on(EActions.DidUpdate, cb)
        this.watcherCount += 1
    }
}

export default Store
