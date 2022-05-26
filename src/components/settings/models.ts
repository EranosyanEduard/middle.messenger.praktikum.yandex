import {ViewOpts} from "~/src/core/view"

type TProps = Record<"cardClassName" | "footClassName" | "nameClassName", string>

type TViewNames = "bodySection" | "footSection"

export type TOptions = Required<Pick<ViewOpts<TProps, never, never, TViewNames>, "props" | "views">>
