import {TProps, TUserProp} from "../item/models"

const itemList: Array<Pick<TProps, "term"> & {id: keyof TUserProp}> = [
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

export {itemList}
