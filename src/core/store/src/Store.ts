import {EActions, IStore, TOptions, TState} from "../models"
import {EventBus} from "~/src/core/event-bus"
import {is, ObjMeths} from "~/src/utils"
import {TRecord} from "~/src/models/common"

abstract class Store<S extends TState> implements IStore<S> {
    /**
     * @description
     * Интерфейс чтения/записи копии хранилища, т.е. экземпляра класса Store.
     * Копия хранилища будет храниться в localStorage в случае, если при
     * создании экземпляра класса Store объект опций содержит isPersist: true.
     * @private
     */
    private static readonly copy = {
        get: (storeName: string, state: TState): TState | null => {
            const item = localStorage.getItem(storeName)
            if (is.str(item)) {
                try {
                    const parsedState = JSON.parse(item) as TRecord
                    if (is.obj(parsedState) && ObjMeths.isEqual(state, parsedState, true)) {
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

    private readonly $state: S

    private readonly eventBus = new EventBus()

    private watcherCount = 0

    readonly state = {
        get: <K extends keyof S>(key: K): Readonly<S[K]> => this.$state[key],
        set: <K extends keyof S>(key: K, val: S[K]) => {
            const oldVal = this.$state[key]

            if (oldVal !== val) {
                if (is.objButNotArr(oldVal) && is.objButNotArr(val)) {
                    const diffKeys = ObjMeths.diffKeys(oldVal as TRecord, val as TRecord)

                    diffKeys.forEach(({key: diffKey, objId}) => {
                        if (objId === 0) {
                            Reflect.set(val, diffKey, oldVal[diffKey])
                        } else {
                            Reflect.deleteProperty(val, diffKey)
                        }
                    })
                }

                this.$state[key] = val
                if (this.watcherCount > 0) {
                    this.eventBus.emit(EActions.DID_UPDATE, {args: {key}})
                }
                if (this.options.isPersist) {
                    Store.copy.set(this.options.name, this.$state)
                }
            }
        },
    }

    protected constructor(
        state: S,
        private readonly options: Readonly<TOptions> = {
            isPersist: false,
            name: "app_state",
        },
    ) {
        if (options.isPersist) {
            const parsedStore = Store.copy.get(options.name, state)
            if (!is.null(parsedStore)) {
                this.$state = parsedStore as S
                return
            }
        }
        this.$state = state
    }

    watch<K extends keyof S>(cb: (args: {key: K}) => void) {
        return {
            off: () => {
                this.eventBus.off(EActions.DID_UPDATE, cb)
                this.watcherCount -= 1
            },
            on: () => {
                this.eventBus.on(EActions.DID_UPDATE, cb)
                this.watcherCount += 1
            },
        }
    }
}

export default Store
