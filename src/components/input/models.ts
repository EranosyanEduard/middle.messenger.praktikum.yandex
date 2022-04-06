import {TComponentOptions} from "~/src/core/component"

type TPropKey =
    | "bemBlock"
    | "error"
    | "fieldWrapperClassName"
    | "headClassName"
    | "id"
    | "label"
    | "labelClassName"
    | "name"
    | "type"
    | "value"

export type TProps = Record<TPropKey, string>

export type TEmitterKey = "onInput" | "onBlur"

export type TOptions = Pick<TComponentOptions<TProps, never, TEmitterKey>, "emits" | "props">
