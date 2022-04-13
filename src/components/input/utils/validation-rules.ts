import {EChars} from "~/src/models/common"
import {EValidators} from "~/src/utils"
import {TRuleKey, TValidationRule} from "../models"

const validationErrorMessages = {
    email: "Значение не соответствует формату электронной почты",
    firstAndSecondName: "Значение не соответствует формату имени: YourName, ВашеИмя, Your-Name, Ваше-Имя",
    login: "Логин должен начинаться с английской буквы и может содержать символы: 0-9, a-z, _, -",
    maxLength: `Максимальное количество символов: ${EChars.Dash}`,
    minLength: `Минимальное количество символов: ${EChars.Dash}`,
    hasCapitalizedLetter: "Значение ввода должно содержать хотя бы одну заглавную букву",
    hasDigit: "Значение ввода должно содержать хотя бы одну цифру",
    hasNotSpace: "Значение ввода не может содержать пробельные символы",
    phone: "Номер телефона может начинаться с + и должен содержать только цифры",
    required: "Поле обязательно для заполнения",
}

const validationPatterns = {
    alphabetDigitsDashAndLowerDash: /^[a-z][\w-]+$/i,
    capitalizedEnglishOnRussianWordWithDash: (() => {
        const [enPattern, ruPattern] = ["a-z", "а-яё"].map((charRange) => {
            const charRanges = [charRange.toLowerCase(), charRange.toUpperCase()]
            const head = charRanges[1]
            const tail = charRanges.join(EChars.Empty)
            return `[${head}]([${tail}${EChars.Dash}]+[${tail}])?`
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
        type: EValidators.Match,
    },
    firstAndSecondName: {
        arg: validationPatterns.capitalizedEnglishOnRussianWordWithDash,
        getError: () => validationErrorMessages.firstAndSecondName,
        type: EValidators.Match,
    },
    hasCapitalizedLetter: {
        arg: validationPatterns.hasCapitalizedEnglishLetter,
        getError: () => validationErrorMessages.hasCapitalizedLetter,
        type: EValidators.Match,
    },
    hasDigit: {
        arg: validationPatterns.hasDigit,
        getError: () => validationErrorMessages.hasDigit,
        type: EValidators.Match,
    },
    hasNotSpace: {
        arg: validationPatterns.hasNotSpace,
        getError: () => validationErrorMessages.hasNotSpace,
        type: EValidators.Match,
    },
    login: {
        arg: validationPatterns.alphabetDigitsDashAndLowerDash,
        getError: () => validationErrorMessages.login,
        type: EValidators.Match,
    },
    loginMaxLength: {
        arg: 20,
        getError: (arg) => validationErrorMessages.maxLength.replace(EChars.Dash, arg),
        type: EValidators.MaxLength,
    },
    loginMinLength: {
        arg: 3,
        getError: (arg) => validationErrorMessages.minLength.replace(EChars.Dash, arg),
        type: EValidators.MinLength,
    },
    passwordMaxLength: {
        arg: 40,
        getError: (arg) => validationErrorMessages.maxLength.replace(EChars.Dash, arg),
        type: EValidators.MaxLength,
    },
    passwordMinLength: {
        arg: 8,
        getError: (arg) => validationErrorMessages.minLength.replace(EChars.Dash, arg),
        type: EValidators.MinLength,
    },
    phone: {
        arg: validationPatterns.positiveInteger,
        getError: () => validationErrorMessages.phone,
        type: EValidators.Match,
    },
    phoneMaxLength: {
        arg: 15,
        getError: (arg) => validationErrorMessages.maxLength.replace(EChars.Dash, arg),
        type: EValidators.MaxLength,
    },
    phoneMinLength: {
        arg: 10,
        getError: (arg) => validationErrorMessages.minLength.replace(EChars.Dash, arg),
        type: EValidators.MinLength,
    },
    required: {
        arg: undefined,
        getError: () => validationErrorMessages.required,
        type: EValidators.Required,
    },
}

export default rules
