import {Router} from "~/src/core/router/"
import routes from "./config"
import store from "~/src/stores"
import {TRouteNameKey} from "./models"
import {routeNames} from "./utils"

function startRouter() {
    Router.invoke({
        beforeEach({findRoute, next, route}) {
            if (route != null) {
                if (route.with.auth() && !store.auth.state.get("isAuth")) {
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
