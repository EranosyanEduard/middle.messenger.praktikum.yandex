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

export interface IComponent<P extends TRecord> {
    /**
     * @description
     * Компонент как узел DOM-дерева.
     */
    content: DocumentFragment

    /**
     * @description
     * Интерфейс (сеттер) для обновления props-ов.
     */
    props: Partial<P>

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
     * Публичный интерфейс для запуска события "компонент был смонтирован".
     */
    dispatchComponentDidMount(): void

    /**
     * @description
     * Публичный интерфейс для запуска события "компонент был обновлен".
     */
    dispatchComponentDidUpdate(): void

    /**
     * @description
     * Публичный интерфейс для запуска события "компонент будет обновлен".
     */
    dispatchComponentWillUpdate(): void

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
export type TComponentOptions<P, C extends string = string> = {
    components: Record<C, IComponent<TRecord>>
    emits: TRecord<EventListener>
    props: P
}

export type TOptions<P extends TRecord> = {template: string} & Partial<TComponentOptions<P>>

type TTemplateContextKey = EContextKeys.Components | EContextKeys.Data | EContextKeys.Options

export type TTemplateContext = Pick<TContext<Template>, TTemplateContextKey>
