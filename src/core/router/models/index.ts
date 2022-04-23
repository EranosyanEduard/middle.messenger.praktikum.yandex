import {IComp} from "~/src/core/component"
import {TRecord} from "~/src/models/common"

export const enum ERouterErrors {
    RequiredConfig = "Конструктор класса Router ожидает аргумент - объект конфигурации",
    UniqueRouteName = "Значение свойства name должно быть уникальным для каждого маршрута",
    UniqueRoutePath = "Значение свойства path должно быть уникальным для каждого маршрута",
}

export type TRouteConfig = {
    component: {new (): IComp<TRecord>}
    name: number | string
    path: string
    requiresAuth: boolean
}

export type TRouteParams = TRecord<number | string>

type TRequiredRouteOptions = {name: TRouteConfig["name"]} | {path: TRouteConfig["path"]}

export type TRouteOptions = TRequiredRouteOptions & Partial<{params: TRouteParams}>

export type TRouterConfig = {
    beforeEach?: (navDetails: {
        findRoute: (options: TRouteOptions) => IRoute | null
        next: (route: IRoute) => void
        options: TRouteOptions
        route: IRoute | null
    }) => void
    rootSelector: string
    routes: TRouteConfig[]
} & ThisType<IRouter>

export interface IRoute {
    /**
     * @description
     * Интерфейс (геттер/сеттер) для управления состоянием маршрута, а следовательно
     * отображением компонента.
     */
    isCurrent: boolean

    /**
     * @description
     * Интерфейс (геттер) для идентификации маршрута по имени или пути.
     */
    with: Record<"name" | "path", (arg: string) => boolean> & {auth: () => boolean}

    /**
     * @description
     * Интерфейс для извлечения адреса маршрута.
     * @param params
     */
    getPath(params: TRouteParams | null): string
}

export interface IRouter {
    /**
     * @description
     * Интерфейс для перехода к предыдущему маршруту.
     */
    back(): void

    /**
     * @description
     * Интерфейс для перехода к следующему маршруту.
     */
    forward(): void

    /**
     * @description
     * Интерфейс для перехода к маршруту, на основании его имени/пути и параметров.
     * @param options имя или путь, а также параметры маршрута.
     * при навигации.
     */
    go(options: TRouteOptions): void
}
