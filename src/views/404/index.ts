import {appLayout} from "~/src/layouts"
import {error} from "~/src/components"

function notFoundView() {
    return appLayout({
        views: {
            bodySection: error({
                props: {
                    className: "m_xy_auto",
                    error: {
                        code: 404,
                        text: "Страница не найдена",
                    },
                },
            }),
        },
    })
}

export default notFoundView
