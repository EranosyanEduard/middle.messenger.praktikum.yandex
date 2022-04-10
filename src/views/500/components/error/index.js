import Compiler from "../../../../plugins/template-engine/Compiler"
import { errorComp } from "../../../../components"

export default Compiler.compile(errorComp, {
    $data: {
        error: {
            className: "m_all_auto",
            code: 500,
            msg: "Внутренняя ошибка сервера",
        },
    },
})
