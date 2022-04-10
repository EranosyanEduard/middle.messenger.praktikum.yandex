import Compiler from "../../../../plugins/template-engine/Compiler"
import TEMPLATE from "./template"
import listHelpers from "../../../../components/list/utils"

const listProto = listHelpers.methods.createComp(TEMPLATE, "userDnaItem", {
    itemClassName: "list__item_cols_pair",
})

const userDnaItems = {
    $data: {
        items: [
            {
                term: "Почта",
                def: "user-email@here.ok",
            },
            {
                term: "Логин",
                def: "Мой логин",
            },
            {
                term: "Имя",
                def: "Мое имя",
            },
            {
                term: "Фамилия",
                def: "Моя фамилия",
            },
            {
                term: "Имя в чате",
                def: "Мое имя в чате",
            },
            {
                term: "Телефон",
                def: "+7(123)456-78-90",
            },
        ],
    },
}

export default Compiler.compile(listProto, userDnaItems)
