import {TComponentOpts} from "~/src/core/component"
import {EValidators} from "~/src/utils"

type TPropKey =
    | "bemBlock"
    | "error"
    | "fieldWrapperClassName"
    | "headClassName"
    | "id"
    | "label"
    | "labelClassName"
    | "name"
    | "type"
    | "value"

export type TAllowedRuleArgument = number | undefined | RegExp

type TCommonRule<T extends EValidators, A extends TAllowedRuleArgument> = {
    type: T
    arg: A
    getError: (arg: string) => string
}

export type TValidationRule =
    | TCommonRule<EValidators.Match, RegExp>
    | TCommonRule<EValidators.MaxLength, number>
    | TCommonRule<EValidators.MinLength, number>
    | TCommonRule<EValidators.Required, undefined>

export type TProps = Record<TPropKey, string> & {
    inputClassName: "" | "&__input_error"
    rules: TValidationRule[]
}

export type TEmitterKey = "onBlur" | "onFocus"

export type TOptions = Pick<TComponentOpts<TProps>, "props">

export type TRuleKey =
    | "email"
    | "firstAndSecondName"
    | "hasCapitalizedLetter"
    | "hasDigit"
    | "hasNotSpace"
    | "login"
    | "loginMaxLength"
    | "loginMinLength"
    | "passwordMaxLength"
    | "passwordMinLength"
    | "phone"
    | "phoneMaxLength"
    | "phoneMinLength"
    | "required"
