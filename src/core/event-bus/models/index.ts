import {TRecord} from "~/src/models/common"

export type TEventName = string

export type TListener<A = unknown> = (...args: A[]) => unknown

export type TEmitterOptions<A extends TRecord> = Partial<{args: A; listener: TListener<A>}>

export interface IEventBus {
    /**
     * Спровоцировать вызов функций, соответствующих событию [eventName].
     * @param eventName название события.
     * @param options объект опций, позволяющий передать ссылку на функцию для вызова только
     * такой функции и аргументы для вызываемых функций.
     */
    emit<A extends TRecord>(eventName: TEventName, options: TEmitterOptions<A>): void | never

    /**
     * Исключить функцию [listener] из списка обработчиков события [eventName].
     * @param eventName название события.
     * @param listener обработчик события.
     */
    off(eventName: TEventName, listener: TListener): void | never

    /**
     * Добавить функцию [listener] в список обработчиков события [eventName].
     * @param eventName название события.
     * @param listener обработчик события.
     */
    on<L extends TListener>(eventName: TEventName, listener: L): L
}
