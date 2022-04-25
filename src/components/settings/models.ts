import {TUser} from "~/src/api-clients"

type TPropKey = "bemBlock" | "cardClassName" | "footClassName" | "nameClassName"

export type TComponentKey = "body" | "foot"

export type TProps = Record<TPropKey, string> & {user: Pick<TUser, "display_name">}
