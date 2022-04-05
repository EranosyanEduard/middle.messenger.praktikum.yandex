import {TComponentOptions} from "~/src/core/component"

type TPropKey = "bemBlock" | "contentClassName" | "formClassName" | "headClassName" | "legend"

export type TProps = Record<TPropKey, string>

type TComponentKey = "body" | "redirectRef" | "submitBtn"

type TEmitterKey = "onSubmit"

export type TOptions = Pick<TComponentOptions<TProps, TComponentKey, TEmitterKey>, "components" | "emits" | "props">
