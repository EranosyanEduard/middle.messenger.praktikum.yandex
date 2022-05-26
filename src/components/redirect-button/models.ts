import {IRouter} from "~/src/core/router"
import {TRouteNameKey} from "~/src/router"

export type TProps<M extends keyof IRouter> = {
    className?: string
    routeName: M extends "go" ? TRouteNameKey : undefined
    routerMethod: M
    text: string
}
