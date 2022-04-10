import inputHelpers from "../../../../components/input/utils"
import listHelpers from "../../../../components/list/utils"
import formHelpers from "../../../../components/form/utils"

const inputProto = inputHelpers.methods.setClassNames(
    inputHelpers.constants.classNamesForHorizontalField,
)

const listProto = listHelpers.methods.createComp(inputProto, "field")

const { email, firstName, login, nickName, phone, secondName } = inputHelpers.constants.fieldKeys

export default formHelpers.methods.createComp(listProto, {
    classNames: formHelpers.constants.classNamesForEditDataForm,
    inputKeyList: [email, login, firstName, secondName, nickName, phone],
    notBackground: true,
    notHead: true,
    submitBtnText: "Сохранить",
})
