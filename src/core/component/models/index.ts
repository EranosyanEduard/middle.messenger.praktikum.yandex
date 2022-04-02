import {TRecord} from "~/src/models/common"

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
    didUpdate(newProps: P, oldProps: P): void

    /**
     * @description
     * Публичный интерфейс для запуска события "компонент был смонтирован".
     */
    dispatchComponentDidMount(): void

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

export type TDidUpdateHookArgs<V> = {newProps: V; oldProps: V}

export type TOptions<C, P extends TRecord> = {template: string} & Partial<{
    components: TRecord<C>
    emits: TRecord<(event: Event) => void>
    props: P
}>
