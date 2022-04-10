import { inputComp } from "../../../../components"
import inputHelpers from "../../../../components/input/utils"
import listHelpers from "../../../../components/list/utils"
import formHelpers from "../../../../components/form/utils"

const listProto = listHelpers.methods.createComp(inputComp, "field", { useSeparator: false })

const { currentPassword, email, firstName, login, newPasswordFirst, secondName } =
    inputHelpers.constants.fieldKeys

const legendAndSubmitBtnText = "Зарегистрироваться"

export default formHelpers.methods.createComp(listProto, {
    anchor: {
        className: "",
        ref: "../sign-in/index.html",
        text: "Войти?",
    },
    classNames: formHelpers.constants.classNamesForSignForm,
    inputKeyList: [email, login, firstName, secondName, currentPassword, newPasswordFirst],
    legend: legendAndSubmitBtnText,
    submitBtnText: legendAndSubmitBtnText,
})
