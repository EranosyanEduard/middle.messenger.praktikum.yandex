import {TRouteNameKey} from "../models"

const routeNameList: TRouteNameKey[] = [
    "error",
    "messenger",
    "settings",
    "signIn",
    "signUp",
    "unknown",
    "userBioSettings",
    "userPasswordSettings",
]

const routeNames = routeNameList.reduce((acc, it, i) => {
    acc[it] = i
    return acc
}, {} as Record<TRouteNameKey, number>)

export {routeNames}
