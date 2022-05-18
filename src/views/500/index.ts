import {appLayout} from "~/src/layouts"
import {error} from "~/src/components"
import store, {TExceptionState, useState} from "~/src/stores"

function appErrorView() {
    return appLayout({
        views: {
            bodySection: useState<TExceptionState>(store.exception, ["error"])(
                error({
                    props: {
                        className: "m_xy_auto",
                        error: {
                            code: NaN,
                            text: "",
                        },
                    },
                }),
            ),
        },
    })
}

export default appErrorView
