import {AppLayout} from "~/src/layouts"
import {Error} from "~/src/components"

class NotFoundPage extends AppLayout {
    constructor() {
        super({
            components: {
                body: new Error({
                    props: {
                        bemBlock: "error",
                        className: "m_xy_auto",
                        code: "404",
                        msg: "Страница не найдена",
                    },
                }),
            },
        })
    }
}

export default NotFoundPage
