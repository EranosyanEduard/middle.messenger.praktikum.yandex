import {
    appErrorView,
    homeView,
    notFoundView,
    passwordSettingsView,
    settingsView,
    signInView,
    signUpView,
    userSettingsView,
} from "~/src/views"
import {TRouteConfig} from "~/src/core/router"
import {routeNames} from "../utils"

const routeConfigList: TRouteConfig[] = [
    {
        component: signInView,
        name: routeNames.signIn,
        path: "/",
        requiresAuth: false,
    },
    {
        component: signUpView,
        name: routeNames.signUp,
        path: "/sign-up/",
        requiresAuth: false,
    },
    {
        component: homeView,
        name: routeNames.messenger,
        path: "/messenger/",
        requiresAuth: true,
    },
    {
        component: settingsView,
        name: routeNames.settings,
        path: "/settings/",
        requiresAuth: true,
    },
    {
        component: userSettingsView,
        name: routeNames.userBioSettings,
        path: "/settings/bio/",
        requiresAuth: true,
    },
    {
        component: passwordSettingsView,
        name: routeNames.userPasswordSettings,
        path: "/settings/password/",
        requiresAuth: true,
    },
    {
        component: appErrorView,
        name: routeNames.error,
        path: "/500/",
        requiresAuth: false,
    },
    {
        component: notFoundView,
        name: routeNames.unknown,
        path: "/404/",
        requiresAuth: false,
    },
]

export default routeConfigList
