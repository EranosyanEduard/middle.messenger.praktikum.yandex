import {IRouter} from "~/src/core/router"
import {routeNames, router, TRouteNameKey} from "~/src/router"
import {is} from "~/src/utils"
import button from "../button"
import {TProps} from "./models"

function redirectButton<M extends keyof IRouter>(props: TProps<M>, beforeRedirectCb?: Function) {
    const {className = "button_text", routeName, routerMethod, text} = props

    const protectedBeforeRedirectCb = () => {
        if (is.fun(beforeRedirectCb)) {
            beforeRedirectCb()
        }
    }

    return button({
        meths: {
            onClick() {
                switch (routerMethod) {
                    case "back":
                        protectedBeforeRedirectCb()
                        router.instance.back()
                        return
                    case "forward":
                        protectedBeforeRedirectCb()
                        router.instance.forward()
                        return
                    case "go":
                        protectedBeforeRedirectCb()
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
