import {EActions, IStore, TState} from "../models"
import {EventBus} from "~/src/core/event-bus"

abstract class Store<S extends TState> implements IStore<S> {
    private readonly eventBus = new EventBus()

    private watcherCount = 0

    protected constructor(private readonly $state: S) {}

    get state() {
        return {
            get: <K extends keyof S>(key: K): Readonly<S[K]> => this.$state[key],
            set: <K extends keyof S>(key: K, val: S[K]) => {
                if (this.$state[key] !== val) {
                    this.$state[key] = val
                    if (this.watcherCount > 0) {
                        this.eventBus.emit(EActions.DidUpdate)
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
