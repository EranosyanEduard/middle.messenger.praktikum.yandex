import {ViewOpts} from "~/src/core/view"

type TProps = Record<"formClassName" | "legend", string>

type TViewNames = "bodySection" | "redirectButton" | "submitButton"

export type TOptions = Required<
    Pick<ViewOpts<TProps, "onSubmit", never, TViewNames>, "meths" | "props" | "views">
>
