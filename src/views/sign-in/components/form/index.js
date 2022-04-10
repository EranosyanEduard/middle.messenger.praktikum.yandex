import { inputComp } from "../../../../components"
import inputHelpers from "../../../../components/input/utils"
import listHelpers from "../../../../components/list/utils"
import formHelpers from "../../../../components/form/utils"

const listProto = listHelpers.methods.createComp(inputComp, "field", { useSeparator: false })

const { login, currentPassword } = inputHelpers.constants.fieldKeys

const legendAndSubmitBtnText = "Войти"

export default formHelpers.methods.createComp(listProto, {
    actionType: "sign-in",
    anchor: {
        className: "",
        ref: "../sign-up/index.html",
        text: "Нет аккаунта?",
    },
    classNames: formHelpers.constants.classNamesForSignForm,
    inputKeyList: [login, currentPassword],
    legend: legendAndSubmitBtnText,
    submitBtnText: legendAndSubmitBtnText,
})
