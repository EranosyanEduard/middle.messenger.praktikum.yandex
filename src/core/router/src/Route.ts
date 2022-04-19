import {IComp, renderDOM} from "~/src/core/component"
import {StrMeths} from "~/src/utils"
import {EChars, TRecord} from "~/src/models/common"
import {sanitizeSlashRange} from "../utils"
import {IRoute, TRouteConfig, TRouteParams, TRouterConfig} from "../models"

class Route implements IRoute {
    /**
     * @description
     * Экземпляр класса Component, соответствующий маршруту.
     * @private
     */
    private component: IComp<TRecord> | null = null

    /**
     * @description
     * Флаг, указывающий на наличие компонента в DOM-дереве.
     * @private
     */
    private didMountComponent = false

    /**
     * Создать экземпляр класса Route.
     * @param routeConfig конфигурация маршрута.
     * @param routerConfig конфигурация маршрутизатора, необходимая маршруту.
     */
    constructor(
        private readonly routeConfig: Readonly<TRouteConfig>,
        private readonly routerConfig: Readonly<Pick<TRouterConfig, "rootSelector">>,
    ) {}

    get isCurrent(): boolean {
        return this.component?.show ?? false
    }

    set isCurrent(val: boolean) {
        this.component ??= new this.routeConfig.component()
        this.component.show = val
        if (!this.didMountComponent) {
            renderDOM(this.routerConfig.rootSelector, this.component)
            this.didMountComponent = true
        }
    }

    get with() {
        /**
         * Разобрать путь маршрута на отдельные части.
         * @example
         * const path = '/foo/bar/baz/';
         * const parsedPath = parsePath(path);
         * console.log(parsedPath); // ['foo', 'bar', 'baz']
         *
         * @param path путь маршрута.
         */
        const parsePath = (path: string) => StrMeths.trim(path, EChars.Slash).split(EChars.Slash)
        const {name, path, requiresAuth} = this.routeConfig

        const compareByName = (routeName: string) => routeName === name.toString()
        const compareByPath = (routePath: string) => {
            const pathA = parsePath(path)
            const pathB = parsePath(sanitizeSlashRange(routePath))
            if (pathA.length === pathB.length) {
                return pathA.every((it, i) => it === pathB[i] || it.startsWith(EChars.Colon))
            }
            return false
        }

        return {
            auth: () => requiresAuth,
            name: compareByName,
            path: compareByPath,
        }
    }

    getPath(params: TRouteParams | null): string {
        const {path} = this.routeConfig
        if (params != null) {
            return path.replace(
                /:([\w-]+)/g,
                (match: string, param: string) => params[param]?.toString() ?? match,
            )
        }
        return path
    }
}

export default Route
