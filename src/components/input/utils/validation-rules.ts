import {EChars} from "~/src/models/common"
import {EValidators} from "~/src/utils"
import {TRuleKey, TValidationRule} from "../models"

const validationErrorMessages = {
    email: "Значение не соответствует формату электронной почты",
    firstAndSecondName:
        "Значение не соответствует формату имени: YourName, ВашеИмя, Your-Name, Ваше-Имя",
    login: "Логин должен начинаться с английской буквы и может содержать символы: 0-9, a-z, _, -",
    maxLength: `Максимальное количество символов: ${EChars.DASH}`,
    minLength: `Минимальное количество символов: ${EChars.DASH}`,
    hasCapitalizedLetter: "Значение ввода должно содержать хотя бы одну заглавную букву",
    hasDigit: "Значение ввода должно содержать хотя бы одну цифру",
    hasNotSpace: "Значение ввода не может содержать пробельные символы",
    phone: "Номер телефона может начинаться с + и должен содержать только цифры",
    required: "Поле обязательно для заполнения",
}

const xValidationErrorMessages = {
    passwordNotMatch: "Значения паролей не совпадают",
}

const validationPatterns = {
    alphabetDigitsDashAndLowerDash: /^[a-z][\w-]+$/i,
    capitalizedEnglishOnRussianWordWithDash: (() => {
        const [enPattern, ruPattern] = ["a-z", "а-яё"].map((charRange) => {
            const charRanges = [charRange.toLowerCase(), charRange.toUpperCase()]
            const head = charRanges[1]
            const tail = charRanges.join(EChars.EMPTY)
            return `[${head}]([${tail}${EChars.DASH}]+[${tail}])?`
        })
        return new RegExp(`^(${enPattern}|${ruPattern})$`)
    })(),
    email: /^[a-z][\w-]+[a-z\d]@[a-z]+\.[a-z]+$/i,
    hasCapitalizedEnglishLetter: /[A-Z]/,
    hasDigit: /\d/,
    hasNotSpace: /^\S+$/,
    positiveInteger: /^\+?\d+$/,
}

/**
 * @description
 * Словарь, содержащий набор правил валидации полей ввода.
 * Ключи словаря явно указывают на поле ввода.
 */
const rules: Record<TRuleKey, TValidationRule> = {
    email: {
        arg: validationPatterns.email,
        getError: () => validationErrorMessages.email,
        type: EValidators.MATCH,
    },
    firstAndSecondName: {
        arg: validationPatterns.capitalizedEnglishOnRussianWordWithDash,
        getError: () => validationErrorMessages.firstAndSecondName,
        type: EValidators.MATCH,
    },
    hasCapitalizedLetter: {
        arg: validationPatterns.hasCapitalizedEnglishLetter,
        getError: () => validationErrorMessages.hasCapitalizedLetter,
        type: EValidators.MATCH,
    },
    hasDigit: {
        arg: validationPatterns.hasDigit,
        getError: () => validationErrorMessages.hasDigit,
        type: EValidators.MATCH,
    },
    hasNotSpace: {
        arg: validationPatterns.hasNotSpace,
        getError: () => validationErrorMessages.hasNotSpace,
        type: EValidators.MATCH,
    },
    login: {
        arg: validationPatterns.alphabetDigitsDashAndLowerDash,
        getError: () => validationErrorMessages.login,
        type: EValidators.MATCH,
    },
    loginMaxLength: {
        arg: 20,
        getError: (arg) => validationErrorMessages.maxLength.replace(EChars.DASH, arg),
        type: EValidators.MAX_LENGTH,
    },
    loginMinLength: {
        arg: 3,
        getError: (arg) => validationErrorMessages.minLength.replace(EChars.DASH, arg),
        type: EValidators.MIN_LENGTH,
    },
    passwordMaxLength: {
        arg: 40,
        getError: (arg) => validationErrorMessages.maxLength.replace(EChars.DASH, arg),
        type: EValidators.MAX_LENGTH,
    },
    passwordMinLength: {
        arg: 8,
        getError: (arg) => validationErrorMessages.minLength.replace(EChars.DASH, arg),
        type: EValidators.MIN_LENGTH,
    },
    phone: {
        arg: validationPatterns.positiveInteger,
        getError: () => validationErrorMessages.phone,
        type: EValidators.MATCH,
    },
    phoneMaxLength: {
        arg: 15,
        getError: (arg) => validationErrorMessages.maxLength.replace(EChars.DASH, arg),
        type: EValidators.MAX_LENGTH,
    },
    phoneMinLength: {
        arg: 10,
        getError: (arg) => validationErrorMessages.minLength.replace(EChars.DASH, arg),
        type: EValidators.MIN_LENGTH,
    },
    required: {
        arg: undefined,
        getError: () => validationErrorMessages.required,
        type: EValidators.REQUIRED,
    },
}

export default rules

export {xValidationErrorMessages}
