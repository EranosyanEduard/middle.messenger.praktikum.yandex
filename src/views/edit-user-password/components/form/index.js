import inputHelpers from "../../../../components/input/utils"
import listHelpers from "../../../../components/list/utils"
import formHelpers from "../../../../components/form/utils"

const inputProto = inputHelpers.methods.setClassNames(
    inputHelpers.constants.classNamesForHorizontalField,
)

const listProto = listHelpers.methods.createComp(inputProto, "field")

const { currentPassword, newPasswordFirst, newPasswordSecond } = inputHelpers.constants.fieldKeys

export default formHelpers.methods.createComp(listProto, {
    classNames: formHelpers.constants.classNamesForEditDataForm,
    inputKeyList: [currentPassword, newPasswordFirst, newPasswordSecond],
    notBackground: true,
    notHead: true,
    submitBtnText: "Сохранить",
})
