export enum EFieldKeys {
    Email = "email",
    Login = "login",
    FirstName = "firstName",
    NewPasswordFirst = "newPasswordFirst",
    NewPasswordSecond = "newPasswordSecond",
    NickName = "nickName",
    Password = "password",
    Phone = "phone",
    SecondName = "secondName",
}

export type TField = {
    error: string
    id: string
    label: string
    name: string
    type: string
}

export type TAbstractField = {label: string; key: EFieldKeys; type: string}
