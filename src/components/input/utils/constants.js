const classNamesForHorizontalField = {
    container: "field_cols_pair",
    head: "d_flex",
    label: "field__label_style_heading m_y_auto",
}

const fields = (() => {
    const fieldKeys = {
        currentPassword: "currentPassword",
        email: "email",
        login: "login",
        firstName: "firstName",
        newPasswordFirst: "newPasswordFirst",
        newPasswordSecond: "newPasswordSecond",
        nickName: "nickName",
        phone: "phone",
        secondName: "secondName",
    }

    const fieldListProto = [
        {
            label: "Пароль",
            key: fieldKeys.currentPassword,
            type: "password",
        },
        {
            label: "Электронная почта",
            key: fieldKeys.email,
            type: "email",
        },
        {
            label: "Логин",
            key: fieldKeys.login,
            type: "text",
        },
        {
            label: "Имя",
            key: fieldKeys.firstName,
            type: "text",
        },
        {
            label: "Новый пароль",
            key: fieldKeys.newPasswordFirst,
            type: "password",
        },
        {
            label: "Повторите новый пароль",
            key: fieldKeys.newPasswordSecond,
            type: "password",
        },
        {
            label: "Имя в чате",
            key: fieldKeys.nickName,
            type: "text",
        },
        {
            label: "Телефон",
            key: fieldKeys.phone,
            type: "tel",
        },
        {
            label: "Фамилия",
            key: fieldKeys.secondName,
            type: "text",
        },
    ]

    const fieldList = fieldListProto.reduce((acc, field) => {
        const { key, ...others } = field
        const uniqueName = `${key}Field`

        return { ...acc, [key]: { ...others, error: "", id: uniqueName, name: uniqueName } }
    }, {})

    return { fieldKeys, fieldList }
})()

export default { classNamesForHorizontalField, ...fields }
