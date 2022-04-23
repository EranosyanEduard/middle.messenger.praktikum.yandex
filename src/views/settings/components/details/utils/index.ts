import Item from "../item"
import {TProps} from "../item/models"

const bemBlock = "list"

const staticItemList: Omit<TProps, "bemBlock" | "user">[] = [
    {
        id: "email",
        term: "Почта",
    },
    {
        id: "login",
        term: "Логин",
    },
    {
        id: "first_name",
        term: "Имя",
    },
    {
        id: "second_name",
        term: "Фамилия",
    },
    {
        id: "display_name",
        term: "Имя в чате",
    },
    {
        id: "phone",
        term: "Телефон",
    },
]

const items = staticItemList.map((it) => {
    const props = {
        ...it,
        bemBlock,
    }
    return new Item({props})
})

export {bemBlock, items}
