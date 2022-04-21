import {Router} from "~/src/core/router/"
import routes from "./config"
import {TRouteNameKey} from "./models"
import {routeNames} from "./utils"

function startRouter() {
    Router.invoke({
        beforeEach({findRoute, next, route}) {
            if (route != null) {
                next(route)
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
