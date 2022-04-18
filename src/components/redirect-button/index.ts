import {IRouter} from "~/src/core/router"
import {ERouteNames, router} from "~/src/router"
import Button from "../button"
import {TProps} from "./models"

class RedirectButton<M extends keyof IRouter> extends Button {
    constructor(props: TProps<M>) {
        const {routeName, routerMethod, text} = props
        super({
            emits: {
                onClick() {
                    switch (routerMethod) {
                        case "back":
                            router.instance.back()
                            return
                        case "forward":
                            router.instance.forward()
                            return
                        case "go":
                            router.instance.go({name: routeName as ERouteNames})
                            return
                        default:
                            throw new Error("Недопустимый интерфейс router-а для навигации")
                    }
                },
            },
            props: {
                bemBlock: "button",
                className: "&_text",
                text,
                type: "button",
            },
        })
    }
}

export default RedirectButton
