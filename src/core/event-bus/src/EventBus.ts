import {TRecord} from "~/src/models/common"
import {is} from "~/src/utils"
import {IEventBus, TEmitterOptions, TEventName} from "../models"

class EventBus implements IEventBus {
    private readonly listeners = new Map<TEventName, CallableFunction[]>()

    emit<A extends TRecord>(eventName: TEventName, options: TEmitterOptions<A> = {}): void | never {
        this.doWork(eventName, (listenerList) => {
            const {args = null, listener = null} = options
            const callListener = !is.null(args)
                ? (cb: CallableFunction) => cb(args)
                : (cb: CallableFunction) => cb()

            if (is.fun(listener)) {
                const sameListenerList = listenerList.filter((it) => it === listener)
                if (sameListenerList.length > 0) {
                    sameListenerList.forEach(callListener)
                } else {
                    const msg = `listener не соответствует событию ${eventName}`
                    throw new Error(msg)
                }
            } else {
                listenerList.forEach(callListener)
            }
        })
    }

    off(eventName: TEventName, listener: CallableFunction): void | never {
        this.doWork(eventName, (listenerList) => {
            this.listeners.set(
                eventName,
                listenerList.filter((it) => it !== listener),
            )
        })
    }

    on<L extends CallableFunction>(eventName: TEventName, listener: L): L {
        this.doWork(eventName, (listenerList) => listenerList.push(listener), true)
        return listener
    }

    /**
     * Абстракция, позволяющая реализовать методы, указанные в интерфейсе
     * IEventBus.
     * @param eventName название события.
     * @param cb функция, реализующая операцию, которую должен выполнить
     * публичный метод.
     * @param mustSetEvent флаг, указывающий на необходимость добавления события
     * в this.listeners, если оно отсутствует.
     * @private
     */
    private doWork(
        eventName: TEventName,
        cb: (listenerList: CallableFunction[]) => void,
        mustSetEvent = false,
    ): void | never {
        if (!this.listeners.has(eventName)) {
            if (mustSetEvent) {
                this.listeners.set(eventName, [])
            } else {
                throw new Error(`событие ${eventName} не зарегистрировано`)
            }
        }
        const listenerList = this.listeners.get(eventName) as CallableFunction[]
        cb(listenerList)
    }
}

export default EventBus
