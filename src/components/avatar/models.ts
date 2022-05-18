import {ViewOpts} from "~/src/core/view"
import {input} from "~/src/components"

type TProps = Record<"avatarClassName" | "imgClassName" | "mainClassName", string>

export type TOptions = Required<Pick<ViewOpts<TProps>, "props">> & {
    props: {
        imgSrc: {avatar: string}
        withoutPopup: boolean
    }
    meths: {onSubmit: (field: ReturnType<typeof input>) => Promise<boolean>}
}
