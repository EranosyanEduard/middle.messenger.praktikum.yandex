import appLayoutCons from "../../layouts/app"
import {errorCons} from "../../components"

const viewTemp = appLayoutCons.instance.addContext({
    data: {
        className: "d_flex",
    },
    slots: {
        body: errorCons.instance
            .addContext({
                data: {
                    className: "m_xy_auto",
                    code: 404,
                    msg: "Страница не найдена",
                },
            })
            .compile(),
    },
})

export default viewTemp.compile()
