import {ViewOpts} from "~/src/core/view"

type TProps = Record<"asideClassName" | "mainClassName", string>

type TViewNames = "asideSection" | "mainSection" | "optionalSection"

export type TOptions = Required<Pick<ViewOpts<TProps, never, never, TViewNames>, "props" | "views">>
