import {Router} from "~/src/core/router/"
import routes from "./config"
import store from "~/src/stores"
import {is} from "~/src/utils"
import {TRouteNameKey} from "./models"
import {routeNames} from "./utils"

function startRouter() {
    Router.invoke({
        beforeEach({findRoute, next, route}) {
            if (!is.null(route)) {
                const isAuth = store.auth.state.get("isAuth")

                /*
                 * если пользователь авторизован, а маршрут - "/":
                 *   перенаправить на страницу с чатами
                 *   стоп
                 * если пользователь не авторизован, а маршрут требует ее:
                 *   перенаправить на страницу авторизации
                 *   стоп
                 * иначе:
                 *   перенаправить по выбранному маршруту
                 */
                if (route.with.name(routeNames.signIn.toString()) && isAuth) {
                    const homeRoute = findRoute({name: routeNames.messenger})
                    next(homeRoute as NonNullable<typeof homeRoute>)
                } else if (route.with.auth() && !isAuth) {
                    const signInRoute = findRoute({name: routeNames.signIn})
                    next(signInRoute as NonNullable<typeof signInRoute>)
                } else {
                    next(route)
                }
            } else {
                const unknownRoute = findRoute({name: routeNames.unknown})
                next(unknownRoute as NonNullable<typeof unknownRoute>)
            }
        },
        rootSelector: ".app",
        routes,
    })
}

const router = {
    get instance() {
        return Router.invoke()
    },
}

export {router, startRouter, routeNames, TRouteNameKey}
