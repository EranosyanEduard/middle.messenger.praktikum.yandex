import {EventBus} from "~/src/core/event-bus"
import {Template} from "~/src/core/template-engine"
import {EChars, TRecord} from "~/src/models/common"
import UnsupportedOperationException from "./UnsupportedOperationException"
import {
    EActions,
    EDataAttrs,
    EEmitActions,
    EPropActions,
    IComponent,
    TDidUpdateHookArgs,
    TOptions,
    TTemplateContext,
} from "../models"

abstract class Component<P extends TRecord> implements IComponent<P> {
    private static readonly TemplateCons = Template

    private readonly element = document.createElement("template")

    private readonly eventBus = new EventBus()

    private readonly proxyProps: P

    protected constructor(private readonly options: TOptions<P>) {
        this.proxyProps = Component.consProxyProps(options.props ?? ({} as P))
        this.useEventBus()
        this.eventBus.emit(EActions.WillMount)
    }

    get content(): DocumentFragment {
        return this.element.content
    }

    set props(props: Partial<P>) {
        /**
         * @description
         * Список допустимых props-ов. Props является допустимым в случае, если:
         * 1. присутствовал в объекте опций при создании экземпляра компонента;
         * 2. типы значений текущего и нового props-ов совпадают;
         * 3. предыдущие пункты выполнены, тогда при типе значений object всегда возвращается true,
         * а при примитивных типах происходит сравнение значений (текущее знач !== новое знач);
         */
        const allowedProps = Object.entries(props).filter((prop) => {
            const [key, val] = prop
            const doCheck = key in this.proxyProps && typeof this.proxyProps[key] == typeof val
            return doCheck ? typeof val == "object" || this.proxyProps[key] !== val : false
        })

        if (allowedProps.length > 0) {
            const oldProps = {...this.proxyProps}
            this.eventBus.emit(EActions.WillUpdate)
            allowedProps.forEach(([key, val]) => {
                const castedProxyProps = this.proxyProps as TRecord
                castedProxyProps[key] = val
            })
            this.eventBus.emit<TDidUpdateHookArgs<P>>(EActions.DidUpdate, {
                args: {
                    newProps: this.proxyProps,
                    oldProps,
                },
            })
            this.eventBus.emit(EActions.Render)
        }
    }

    /**
     * Проксировать объект с props-ами компонента.
     * @param props props-ы компонента.
     * @private
     */
    private static consProxyProps<P extends TRecord>(props: P): P {
        return new Proxy(props, {
            deleteProperty(): never {
                throw new UnsupportedOperationException(
                    EPropActions.Del,
                    "не допускается удаление props-ов",
                )
            },
            set(target: P, key: string, val: unknown): boolean | never {
                if (key in target) {
                    const castedTarget = target as TRecord
                    castedTarget[key] = val
                    return true
                }
                throw new UnsupportedOperationException(
                    EPropActions.Set,
                    "не допускается установка новых props-ов",
                )
            },
        })
    }

    didMount() {}

    didUpdate(newProps: Partial<P>, oldProps: P) {}

    dispatchComponentDidMount() {
        this.eventBus.emit(EActions.DidMount)
    }

    dispatchComponentDidUpdate() {
        this.eventBus.emit<TDidUpdateHookArgs<P>>(EActions.DidUpdate, {
            args: {
                newProps: {},
                oldProps: this.proxyProps,
            },
        })
    }

    dispatchComponentWillUpdate() {
        this.eventBus.emit(EActions.WillUpdate)
    }

    willMount() {}

    willUpdate() {}

    private _didMount() {
        this.didMount()
    }

    private _didUpdate(props: TDidUpdateHookArgs<P>) {
        this.didUpdate(props.newProps, props.oldProps)
        this.useComponents(() => (_, comp) => comp.dispatchComponentDidUpdate())
    }

    private _render(): void | never {
        const {template} = this.options

        if (template.length === 0) {
            throw new Error("Пустая строка не может быть значением свойства template")
        }

        this.useEmits(EEmitActions.Del)
        // Подменить теги компонентов примитивной разметкой, содержащей ключ такого компонента.
        const componentStubs: TRecord<Template> = {}
        this.useComponents((attr) => (key) => {
            componentStubs[key] = new Component.TemplateCons(`<div ${attr}></div>`, null)
        })
        // Подготовить объект контекста, использующийся при создании экземпляра шаблона.
        const {bemBlock, ...data} = this.proxyProps
        const templateContext: TTemplateContext = {
            data,
            components: componentStubs,
        }
        if (typeof bemBlock == "string" && bemBlock.length > 0) {
            templateContext.options = {bemBlock}
        }
        // Скомпилировать и добавить экземпляр шаблона в качестве контента элемента.
        this.element.innerHTML = new Component.TemplateCons(template, templateContext).compile()
        // Подменить примитивную разметку компонентами. Соответствие между разметкой и компонентом
        // определяется на основании равенства ключа в объекте options.components значению атрибута
        // EDataAttrs.CompKey.
        this.useComponents((attr) => (_, val) => {
            const stubList = this.element.content.querySelectorAll(`[${attr}]`)
            stubList.forEach((it) => it.replaceWith(val.content))
        })
        this.useEmits(EEmitActions.Add)
    }

    private _willMount() {
        this.willMount()
        this.eventBus.emit(EActions.Render)
    }

    private _willUpdate() {
        this.willUpdate()
        this.useComponents(() => (_, comp) => comp.dispatchComponentWillUpdate())
    }

    /**
     * Использовать компоненты, переданные при создании экземпляра класса Component в объекте опций.
     * @param cb функция обработчик свойств и значений, соответствующих им, ссылки на которые
     * хранятся в объекте this.options.components.
     * @private
     */
    private useComponents(
        cb: (compId: string) => (key: string, comp: IComponent<TRecord>) => void,
    ) {
        const {components = null} = this.options
        if (components != null) {
            Object.entries(components).forEach(([key, comp]) => {
                cb(`${EDataAttrs.CompKey}="${key}"`)(key, comp)
            })
        }
    }

    /**
     * Использовать методы html-элемента addEventListener или removeEventListener для добавления или
     * удаления обработчиков событий соответственно. Выбор действия (добавить/удалить) определяется
     * на основании значения параметра [action].
     * @param action название действия.
     * @private
     */
    private useEmits(action: EEmitActions) {
        const {emits = null} = this.options
        if (emits != null) {
            const isNotEmptyStr = (arg: string) => arg.length > 0
            const setListener = (function getListenerSetter() {
                switch (action) {
                    case EEmitActions.Add:
                        return (el: Element, eventName: string, listener: EventListener) => {
                            el.addEventListener(eventName, listener)
                        }
                    case EEmitActions.Del:
                        return (el: Element, eventName: string, listener: EventListener) => {
                            el.removeEventListener(eventName, listener)
                        }
                    default:
                        return () => {
                            throw new Error(`недопустимое действие ${action} в методе useEmits`)
                        }
                }
            })()

            this.element.content.querySelectorAll(`[${EDataAttrs.On}]`).forEach((it) => {
                const eventAndListener = it.getAttribute(EDataAttrs.On) as string
                const [eventName = "", listenerKey = ""] = eventAndListener.split(EChars.Colon)
                const listener = emits[listenerKey]
                if (isNotEmptyStr(eventName) && isNotEmptyStr(listenerKey) && listener) {
                    setListener(it, eventName, listener)
                }
            })
        }
    }

    /**
     * Зарегистрировать события, соответствующие жизненному циклу компонента.
     * @private
     */
    private useEventBus() {
        const events = [
            {
                action: EActions.DidMount,
                listener: this._didMount,
            },
            {
                action: EActions.DidUpdate,
                listener: this._didUpdate,
            },
            {
                action: EActions.Render,
                listener: this._render,
            },
            {
                action: EActions.WillMount,
                listener: this._willMount,
            },
            {
                action: EActions.WillUpdate,
                listener: this._willUpdate,
            },
        ]
        events.forEach((it) => this.eventBus.on(it.action, it.listener.bind(this)))
    }
}

export default Component
