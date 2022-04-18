import {IRouter} from "~/src/core/router"
import {ERouteNames} from "~/src/router"

export type TProps<M extends keyof IRouter> = {
    routeName: M extends "go" ? ERouteNames : undefined
    routerMethod: M
    text: string
}
