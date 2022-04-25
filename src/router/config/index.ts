import {
    AppErrorPage,
    HomePage,
    NotFoundPage,
    PasswordSettingsPage,
    SettingsPage,
    SignInPage,
    SignUpPage,
    UserSettingsPage,
} from "~/src/views"
import {TRouteConfig} from "~/src/core/router"
import {routeNames} from "../utils"

const routeConfigList: TRouteConfig[] = [
    {
        component: SignInPage,
        name: routeNames.signIn,
        path: "/",
        requiresAuth: false,
    },
    {
        component: SignUpPage,
        name: routeNames.signUp,
        path: "/sign-up/",
        requiresAuth: false,
    },
    {
        component: HomePage,
        name: routeNames.messenger,
        path: "/messenger/",
        requiresAuth: true,
    },
    {
        component: SettingsPage,
        name: routeNames.settings,
        path: "/settings/",
        requiresAuth: true,
    },
    {
        component: UserSettingsPage,
        name: routeNames.userBioSettings,
        path: "/settings/bio/",
        requiresAuth: true,
    },
    {
        component: PasswordSettingsPage,
        name: routeNames.userPasswordSettings,
        path: "/settings/password/",
        requiresAuth: true,
    },
    {
        component: AppErrorPage,
        name: routeNames.error,
        path: "/500/",
        requiresAuth: false,
    },
    {
        component: NotFoundPage,
        name: routeNames.unknown,
        path: "/404/",
        requiresAuth: false,
    },
]

export default routeConfigList
