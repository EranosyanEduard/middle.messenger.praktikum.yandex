export type Obj<V = any> = Record<string, V>

export const enum ELifeEvents {
    DID_MOUNT = "DID_MOUNT",
}

/**
 * @description Публичный интерфейс представления.
 */
export interface IView<Props extends Obj, SlotNames extends string> {
    /**
     * @description DOM-элемент.
     */
    element: HTMLElement | never
    /**
     * @description Свойства представления.
     */
    props: Props
    /**
     * @description Свойство для управления видимостью представления.
     */
    show: boolean
    /**
     * @description Слоты представления, т.е. элементы, позволяющие управлять
     * собственным контентом.
     */
    slots: Record<SlotNames, IView<Obj, string> | IView<Obj, string>[]>

    /**
     * @description Вызвать метод жизненного цикла didMount.
     */
    dispatchDidMount(): void
}

/**
 * @description Тип, описывающий привязку, т.е. абстракцию "реактивного"
 * значения.
 */
export type Binding = {
    elem: Element
    key: string
    type: "attribute" | "method" | "slot" | "textContent"
}

type MethCtx<O extends Obj> = Required<Omit<O, "didMount" | "name" | "template" | "views">>

export type SomeView = IView<Obj, string>

/**
 * @description Тип, описывающий свойства slots и views объекта опций.
 */
export type Views<K extends string> = Record<K, SomeView | SomeView[]>

/**
 * @description Опции, необходимые для создания экземпляра представления, где
 * P - Props,
 * M - MethNames,
 * S - SlotNames,
 * C - ViewNames.
 */
export type ViewOptions<
    P extends Obj = never,
    M extends string = never,
    S extends string = never,
    V extends string = never,
> = {
    name: string
    template: string
    didMount?: (this: MethCtx<ViewOptions<P, M, S, V>>) => void
    meths?: Record<M, Function> & ThisType<MethCtx<ViewOptions<P, M, S, V>>>
    props?: P
    slots?: Views<S>
    views?: Views<V>
}
