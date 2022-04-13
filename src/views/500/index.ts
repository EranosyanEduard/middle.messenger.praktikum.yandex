import {AppLayout} from "~/src/layouts"
import {Error} from "~/src/components"

class AppErrorPage extends AppLayout {
    constructor() {
        super({
            components: {
                body: new Error({
                    props: {
                        bemBlock: "error",
                        className: "m_xy_auto",
                        code: "500",
                        msg: "Мы уже устраняем проблему!",
                    },
                }),
            },
        })
    }
}

export default AppErrorPage
