import {TRecord} from "~/src/models/common"
import {Template} from "~/src/core/template-engine"
import {EContextKeys, TContext} from "~/src/core/template-engine/models"

export const enum EActions {
    DidMount = "didMount",
    DidUpdate = "didUpdate",
    Render = "render",
    WillMount = "willMount",
    WillUpdate = "willUpdate",
}

export const enum EDataAttrs {
    CompKey = "data-component-key",
    On = "data-on",
}

export const enum EEmitActions {
    Add = "add",
    Del = "delete",
}

export const enum EPropActions {
    Del = "deleteProperty",
    Set = "set",
}

export interface IComp<P extends TRecord> {
    /**
     * @description
     * Компонент как узел DOM-дерева.
     */
    content: Element

    /**
     * @description
     * Интерфейс (сеттер) для обновления props-ов.
     */
    props: Partial<P>

    /**
     * @description
     * Интерфейс (геттер/сеттер) для управления значением свойства display
     * html-элемента.
     */
    show: boolean

    /**
     * @description
     * Хук жизненного цикла: "компонент был смонтирован".
     */
    didMount(): void

    /**
     * @description
     * Хук жизненного цикла: "компонент был обновлен".
     * @param newProps props-ы после обновления.
     * @param oldProps props-ы до обновления.
     */
    didUpdate(newProps: Partial<P>, oldProps: P): void

    /**
     * @description
     * Интерфейс для запуска события "компонент был смонтирован".
     */
    dispatchComponentDidMount(): void

    /**
     * @description
     * Интерфейс для запуска события "компонент был обновлен".
     */
    dispatchComponentDidUpdate(): void

    /**
     * @description
     * Интерфейс для запуска события "компонент будет обновлен".
     */
    dispatchComponentWillUpdate(): void

    /**
     * @description
     * Интерфейс для извлечения значений определенных props-ов.
     * @param props наименования props-ов, значения которых необходимо извлечь.
     * @param fallbackCb функция, которая возвращает значение, если props c ключом [prop] не найден.
     */
    getProps<K extends keyof P | string, D>(props: K[], fallbackCb: (prop: K) => D): Array<P[K] | D>

    /**
     * @description
     * Хук жизненного цикла: "компонент будет смонтирован".
     */
    willMount(): void

    /**
     * @description
     * Хук жизненного цикла: "компонент будет обновлен".
     */
    willUpdate(): void
}

export type TDidUpdateHookArgs<P> = {newProps: Partial<P>; oldProps: P}

/**
 * @description
 * Тип, описывающий объект опций компонента - наследника абстрактного класса Component.
 */
export type TComponentOptions<
    P extends TRecord,
    C extends string = never,
    E extends string = never,
> = {
    components: Record<C, IComp<TRecord> | IComp<TRecord>[]>
    emits: Record<E | string, EventListener> & ThisType<IComp<P>>
    props: P
}

/**
 * @description
 * Тип, описывающий объект опций компонента - абстрактного класса Component.
 */
export type TOptions<P extends TRecord, C extends string, E extends string> = {
    template: string
} & Partial<TComponentOptions<P, C, E>>

type TTemplateContextKey = EContextKeys.Components | EContextKeys.Data | EContextKeys.Options

export type TTemplateContext = Pick<TContext<Template>, TTemplateContextKey>
