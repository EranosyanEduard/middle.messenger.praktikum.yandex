import {ViewOpts} from "~/src/core/view"
import {TExceptionState} from "~/src/stores"

type TProps = Record<"className", string> & TExceptionState

export type TOptions = Required<Pick<ViewOpts<TProps>, "props">>
