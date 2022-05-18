import {View} from "~/src/core/view"
import store, {TUserState, useState} from "~/src/stores"
import {TOptions, TUserProp} from "./models"

function item(opts: TOptions) {
    return useState<TUserState>(store.user, ["user"])(
        View.new({
            name: "Item",
            template: `
                <li class="list__item list__item_jc_space-between details">
                    <span :text="term" class="details__term"></span>
                    <span :text="def" class="details__def"></span>
                </li>
            `,
            props: {
                user: <TUserProp>{},
                ...opts.props,
            },
        }),
    )
}

export default item
