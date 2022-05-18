import {ViewOpts} from "~/src/core/view"

type TProps = Record<"className" | "text" | "type", string>

export type TOptions = Required<Pick<ViewOpts<TProps, "onClick">, "meths" | "props">>
