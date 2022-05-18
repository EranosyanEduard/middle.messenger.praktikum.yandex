import {EventBus} from "~/src/core/event-bus"
import {is, ObjMeths} from "~/src/utils"
import {Binding, ELifeEvents, IView, Obj, SomeView, ViewOptions as ViewOpts, Views} from "../models"
import {ViewError} from "../utils"

class View<
    Props extends Obj,
    MethNames extends string,
    SlotNames extends string,
    ViewNames extends string,
> implements IView<Props, SlotNames>
{
    readonly props: Props

    readonly slots: Views<SlotNames>

    private readonly meths: Record<MethNames, Function>

    /**
     * @description Хранилище привязок, найденных в шаблоне представления.
     */
    private readonly bindings = {
        meths: new Map<MethNames, Binding[]>(),
        props: new Map<keyof Props, Binding[]>(),
        slots: new Map<SlotNames, Binding[]>(),
    }

    private readonly elem: HTMLElement | null

    private readonly eventBus = new EventBus()

    protected constructor(private readonly opts: ViewOpts<Props, MethNames, SlotNames, ViewNames>) {
        const {
            meths = {} as Record<MethNames, Function>,
            props = {} as Props,
            slots = {} as Views<SlotNames>,
            template,
            views,
        } = opts

        this.meths = meths

        this.props = new Proxy(props, {
            deleteProperty() {
                throw new ViewError("удаление - недопустимая операция")
            },
            set: <K extends string>(target: Props, propKey: K, value: Props[K]) => {
                if (Reflect.has(target, propKey)) {
                    this.setupProps({[propKey]: value} as any)
                    return Reflect.set(target, propKey, value)
                }
                return false
            },
        })

        this.slots = new Proxy(slots, {
            deleteProperty() {
                throw new ViewError("удаление - недопустимая операция")
            },
            set: <K extends string>(
                target: Views<SlotNames>,
                propKey: K,
                value: SomeView | SomeView[],
            ) => {
                if (Reflect.has(target, propKey)) {
                    this.setupSlots({[propKey]: value} as any)
                    return Reflect.set(target, propKey, value)
                }
                return false
            },
        })

        const elemWrapper = document.createElement("div")
        elemWrapper.innerHTML = template
        this.elem = elemWrapper.firstElementChild as HTMLElement | null
        this.findBindings(elemWrapper)

        // Использовать методы.
        if (Object.keys(meths).length > 0) {
            Object.entries<Function>(meths).forEach(([methID, meth]) => {
                const boundedMeth = meth.bind({
                    meths,
                    props: this.props,
                    slots: this.slots,
                })
                const bindingList = this.bindings.meths.get(methID as MethNames)
                meths[methID as MethNames] = boundedMeth
                bindingList?.forEach((binding) => {
                    binding.elem.addEventListener(binding.key, boundedMeth)
                })
            })
        }

        // Использовать пропсы.
        if (Object.keys(props).length > 0) {
            this.setupProps(props)
        }

        // Использовать слоты.
        if (Object.keys(slots).length > 0) {
            this.setupSlots(slots)
        }

        // Использовать представления.
        if (views) {
            Object.entries<SomeView | SomeView[]>(views).forEach(([viewID, view]) => {
                const viewStub = elemWrapper.querySelector(viewID.toLowerCase())
                if (!viewStub) {
                    throw new ViewError(`не удалось найти view с селектором ${viewID}`)
                }
                if (Array.isArray(view)) {
                    viewStub.replaceWith(...view.map((it) => it.element))
                } else {
                    viewStub.replaceWith(view.element)
                }
            })
        }

        // Зарегистрировать события жизненного цикла.
        this.useEvents()
    }

    get element(): HTMLElement | never {
        if (!this.elem) {
            throw new ViewError(`ошибка при создании представления ${this.opts.name}`)
        }
        return this.elem
    }

    get show() {
        return this.element.style.display !== "none"
    }

    set show(show: boolean) {
        this.element.style.display = show ? "" : "none"
    }

    /**
     * Фабрика экземпляров класса View.
     * @param options опции представления.
     * @returns
     */
    static new<
        Props extends Obj = never,
        MethNames extends string = never,
        SlotNames extends string = never,
        ViewNames extends string = never,
    >(options: ViewOpts<Props, MethNames, SlotNames, ViewNames>): IView<Props, SlotNames> {
        return new View(options)
    }

    dispatchDidMount() {
        this.useViews(([_, view]) => {
            if (Array.isArray(view)) {
                view.forEach((it) => it.dispatchDidMount())
            } else {
                view.dispatchDidMount()
            }
        })
        this.eventBus.emit(ELifeEvents.DID_MOUNT)
    }

    private _didMount() {
        if (this.opts.didMount) {
            this.opts.didMount.bind({
                meths: this.meths,
                props: this.props,
                slots: this.slots,
            })()
        }
    }

    private findBindings(elemWrapper: Element) {
        const {bindings} = this

        /**
         * Добавить в словарь привязок [bindingWith] значение, полученное
         * из [xBinding].
         * @param bindingKey ключ определенного словаря с привязками.
         * @param bindingName идентификатор привязки.
         * @param binding привязка.
         */
        const setBinding = (
            bindingKey: keyof typeof bindings,
            bindingName: string,
            binding: Binding,
        ) => {
            const bindingByKey = bindings[bindingKey]
            if (bindingByKey.has(bindingName as any)) {
                bindingByKey.get(bindingName as any)?.push(binding)
            } else {
                bindingByKey.set(bindingName as any, [binding])
            }
        }

        const Tokens = {
            ATTR: ":",
            METH: "@",
            SLOT: "#",
        }
        const ATTR_AND_METH_RE = new RegExp(`^[${Tokens.ATTR}${Tokens.METH}${Tokens.SLOT}]`)

        /**
         * Проверить DOM-элемент на наличие привязок.
         * @param element DOM-элемент.
         */
        const forEachElement = (element: Element) => {
            const attrList = element.getAttributeNames()
            const bindedAttrList = attrList.filter((attr) => ATTR_AND_METH_RE.test(attr))

            bindedAttrList.forEach((attrWithToken) => {
                const attrName = attrWithToken.substring(1)
                const bindingName = element.getAttribute(attrWithToken) as string

                switch (attrWithToken[0]) {
                    case Tokens.ATTR:
                        setBinding("props", bindingName, {
                            elem: element,
                            key: attrName,
                            type: attrName === "text" ? "textContent" : "attribute",
                        })
                        break
                    case Tokens.METH:
                        setBinding("meths", bindingName, {
                            elem: element,
                            key: attrName,
                            type: "method",
                        })
                        break
                    case Tokens.SLOT:
                        setBinding("slots", bindingName, {
                            elem: element,
                            key: attrName,
                            type: "slot",
                        })
                        break
                    default:
                        throw new ViewError("Неожиданная ошибка")
                }

                element.removeAttribute(attrWithToken)
            })
        }

        const go = (elements: HTMLCollection) => {
            Array.prototype.forEach.call(elements, (element: Element) => {
                forEachElement(element)
                if (element.children.length > 0) {
                    go(element.children)
                }
            })
        }

        go(elemWrapper.children)
    }

    private setup<K extends "props" | "slots">(
        bindingsKey: K,
        cb: (bindingList: Binding[], propKey: K extends "props" ? keyof Props : SlotNames) => void,
    ) {
        this.bindings[bindingsKey].forEach(cb as any)
    }

    private setupProps(props: Partial<Props>) {
        this.setup("props", (bindingList, propKey) => {
            const val = ObjMeths.getValOrElse(props, propKey as string, () => undefined)
            if (!is.undef(val)) {
                const stringifyVal = `${val}`
                bindingList.forEach(({elem, key, type}) => {
                    switch (type) {
                        case "attribute": {
                            if (key === "class") {
                                const setClass = (className: string, action: "add" | "remove") => {
                                    if (!is.empty.str(className)) {
                                        className.split(" ").forEach((it) => {
                                            elem.classList[action](it)
                                        })
                                    }
                                }
                                setClass(this.props[propKey], "remove")
                                setClass(stringifyVal, "add")
                            } else {
                                const attrVal = elem.getAttribute(key) ?? ""
                                elem.setAttribute(key, `${attrVal}${stringifyVal}`)
                            }
                            break
                        }
                        case "textContent":
                            elem.textContent = stringifyVal
                            break
                        default:
                            throw new ViewError("Неожиданная ошибка")
                    }
                })
            }
        })
    }

    private setupSlots(slots: Partial<Views<SlotNames>>) {
        this.setup("slots", (bindingList, propKey) => {
            const slot = slots[propKey]
            if (slot) {
                bindingList.forEach(({elem, key}) => {
                    if (!elem.hasAttribute(key)) {
                        elem.setAttribute(key, propKey)
                    }
                    if (Array.isArray(slot)) {
                        elem.replaceChildren(...slot.map((s) => s.element))
                        slot.map((s) => s.dispatchDidMount())
                    } else {
                        elem.replaceChildren(slot.element)
                        slot.dispatchDidMount()
                    }
                })
            }
        })
    }

    /**
     * Зарегистрировать события, соответствующие жизненному циклу компонента.
     * @private
     */
    private useEvents() {
        const events = [
            {
                action: ELifeEvents.DID_MOUNT,
                listener: this._didMount,
            },
        ]
        events.forEach((evt) => this.eventBus.on(evt.action, evt.listener.bind(this)))
    }

    /**
     * Применить функцию [cb] к каждому представлению, переданному в объекте опций.
     * @param cb  обработчик представления.
     * @private
     */
    private useViews(cb: ([viewID, view]: [string, SomeView | SomeView[]]) => void) {
        const {slots, views} = this.opts

        function go(anyViews: typeof slots | typeof views) {
            if (anyViews) {
                Object.entries<SomeView | SomeView[]>(anyViews).forEach(cb)
            }
        }

        go(slots)
        go(views)
    }
}

export default View
