import {IRouter} from "~/src/core/router"
import {routeNames, router, TRouteNameKey} from "~/src/router"
import button from "../button"
import {TProps} from "./models"

function redirectButton<M extends keyof IRouter>(props: TProps<M>) {
    const {className = "button_text", routeName, routerMethod, text} = props

    return button({
        meths: {
            onClick() {
                switch (routerMethod) {
                    case "back":
                        router.instance.back()
                        return
                    case "forward":
                        router.instance.forward()
                        return
                    case "go":
                        router.instance.go({name: routeNames[routeName as TRouteNameKey]})
                        return
                    default:
                        throw new Error("Недопустимый интерфейс router-а для навигации")
                }
            },
        },
        props: {
            className,
            text,
            type: "button",
        },
    })
}

export default redirectButton
