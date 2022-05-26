import {ArrMeths, is} from "~/src/utils"
import Route from "./Route"
import {sanitizeSlashRange} from "../utils"
import {ERouterErrors, IRoute, IRouter, TRouteConfig, TRouteOptions, TRouterConfig} from "../models"

class Router implements IRouter {
    /**
     * @description
     * Единственный экземпляр класса Router.
     * @private
     */
    private static instance: IRouter

    /**
     * @description
     * Навигационный хук, который позволяет непосредственно управлять каждым
     * переходом по маршруту.
     * @private
     */
    private readonly beforeEach: Required<TRouterConfig>["beforeEach"] | null

    /**
     * @description
     * Экземпляр класса Route, представляющий текущий маршрут.
     * @private
     */
    private currentRoute: IRoute | null = null

    /**
     * @description
     * Список экземпляров класса Route, каждый из которых представляет маршрут,
     * доступный для перехода.
     * @private
     */
    private readonly routes: IRoute[]

    /**
     * Создать экземпляр класса Router.
     * @param config конфигурация router-а.
     * @private
     */
    private constructor(config: Readonly<TRouterConfig>) {
        const {routes} = config
        const hasUniqueRouteNames = ArrMeths.isSet(routes.map((it) => it.name))
        const hasUniqueRoutePaths = ArrMeths.isSet(routes.map((it) => it.path))

        if (!hasUniqueRouteNames) {
            throw new Error(ERouterErrors.UNIQUE_ROUTE_NAME)
        }
        if (!hasUniqueRoutePaths) {
            throw new Error(ERouterErrors.UNIQUE_ROUTE_PATH)
        }

        this.beforeEach = config.beforeEach?.bind(this) ?? null
        this.routes = routes.map((it) => {
            const {path, ...others} = it
            return new Route({path: sanitizeSlashRange(path), ...others}, config)
        })
        this.on()
    }

    /**
     * Создать единственный экземпляр класса Router или получить ссылку на
     * него, если он уже создан.
     * @param config конфигурация router-а.
     */
    static invoke(config?: TRouterConfig): IRouter {
        if (!Router.instance) {
            if (is.obj(config)) {
                Router.instance = new Router(config)
            } else {
                throw new Error(ERouterErrors.REQUIRED_CONFIG)
            }
        }
        return Router.instance
    }

    /**
     * @description
     * Интерфейс для поиска маршрута на основании его имени/пути и параметров.
     * @param routes список экземпляров класса Route.
     * @param options имя или путь, а также параметры маршрута.
     */
    private static findRoute(routes: IRoute[], options: TRouteOptions): IRoute | null {
        let comparatorKey: Exclude<keyof IRoute["with"], "auth">
        let routeId: TRouteConfig["name"] | TRouteConfig["path"] | undefined

        if ("name" in options) {
            comparatorKey = "name"
            routeId = options.name
        } else {
            comparatorKey = "path"
            routeId = options.path
        }

        if (!is.undef(routeId)) {
            const route = routes.find((it) => it.with[comparatorKey](`${routeId}`))
            if (!is.undef(route)) {
                return route
            }
        }
        return null
    }

    back() {
        window.history.back()
    }

    forward() {
        window.history.forward()
    }

    go(options: TRouteOptions) {
        this.to(options, (route) => {
            window.history.pushState(
                {routeOptions: options},
                "",
                route.getPath(options.params ?? null),
            )
        })
    }

    /**
     * Запустить router.
     * @private
     */
    private on() {
        window.addEventListener("popstate", () => {
            const state = window.history.state ?? {}
            const useState = !is.undef(state.name) || !is.undef(state.path)
            this.to(useState ? state : {path: window.location.pathname})
        })
        this.to({path: window.location.pathname})
    }

    /**
     * Обработать попытку перехода по маршруту, подробности о котором указаны
     * в объекте опций [options].
     * @param options подробности маршрута.
     * @param cb функция, позволяющая выполнить действие (побочный эффект) при
     * переходе по маршруту.
     * @private
     */
    private to(options: TRouteOptions, cb: (route: IRoute) => void = () => {}) {
        const findRoute = (opts: TRouteOptions) => Router.findRoute(this.routes, opts)

        const next = (route: IRoute) => {
            if (this.currentRoute != null) {
                this.currentRoute.isCurrent = false
            }
            route.isCurrent = true
            this.currentRoute = route
            cb(route)
        }

        const route = findRoute(options)

        if (!is.null(this.beforeEach)) {
            this.beforeEach({
                findRoute,
                next,
                options,
                route,
            })
        } else if (!is.null(route)) {
            next(route)
        }
    }
}

export default Router
