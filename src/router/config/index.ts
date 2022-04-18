import {
    AppErrorPage,
    HomePage,
    NotFoundPage,
    SettingsPage,
    SetUserBioPage,
    SetUserPasswordPage,
    SignInPage,
    SignUpPage,
} from "~/src/views"
import {TRouteConfig} from "~/src/core/router"
import {ERouteNames} from "../models"

const routeConfigList: TRouteConfig[] = [
    {
        component: SignInPage,
        name: ERouteNames.SignIn,
        path: "sign-in",
        requiresAuth: false,
    },
    {
        component: SignUpPage,
        name: ERouteNames.SignUp,
        path: "sign-up",
        requiresAuth: false,
    },
    {
        component: HomePage,
        name: ERouteNames.Home,
        path: "",
        requiresAuth: true,
    },
    {
        component: SettingsPage,
        name: ERouteNames.Settings,
        path: "settings",
        requiresAuth: true,
    },
    {
        component: SetUserBioPage,
        name: ERouteNames.SetUserBio,
        path: "settings/set-user-bio",
        requiresAuth: true,
    },
    {
        component: SetUserPasswordPage,
        name: ERouteNames.SetUserPassword,
        path: "settings/set-user-password",
        requiresAuth: true,
    },
    {
        component: AppErrorPage,
        name: ERouteNames.Error,
        path: "500",
        requiresAuth: false,
    },
    {
        component: NotFoundPage,
        name: ERouteNames.Unknown,
        path: "404",
        requiresAuth: false,
    },
]

export default routeConfigList
