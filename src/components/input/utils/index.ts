import {EFieldKeys, TAbstractField, TField} from "../../../models/field-comp"
import {TRecord} from "../../../models/common"

const abstractFieldList: TAbstractField[] = [
    {
        label: "Электронная почта",
        key: EFieldKeys.Email,
        type: "email",
    },
    {
        label: "Логин",
        key: EFieldKeys.Login,
        type: "text",
    },
    {
        label: "Имя",
        key: EFieldKeys.FirstName,
        type: "text",
    },
    {
        label: "Новый пароль",
        key: EFieldKeys.NewPasswordFirst,
        type: "password",
    },
    {
        label: "Повторите новый пароль",
        key: EFieldKeys.NewPasswordSecond,
        type: "password",
    },
    {
        label: "Имя в чате",
        key: EFieldKeys.NickName,
        type: "text",
    },
    {
        label: "Пароль",
        key: EFieldKeys.Password,
        type: "password",
    },
    {
        label: "Телефон",
        key: EFieldKeys.Phone,
        type: "tel",
    },
    {
        label: "Фамилия",
        key: EFieldKeys.SecondName,
        type: "text",
    },
]

const fields = abstractFieldList.reduce((acc, field) => {
    const {label, key, type} = field
    const name = `${key}Field`

    acc[key] = {
        error: "",
        id: name,
        label,
        name,
        type,
    }

    return acc
}, {} as TRecord<TField>)

/**
 * Руководствуясь значением keyList сформировать список объектов, представляющих поля ввода.
 * @param keyList список имен полей ввода.
 */
const getFieldListByKeys = (keyList: EFieldKeys[]): TField[] => keyList.reduce((acc, it) => {
    acc.push(fields[it])
    return acc
}, [] as TField[])

export {getFieldListByKeys}
