import {IView, ViewOpts} from "~/src/core/view"
import {EValidators} from "~/src/utils"

export type TAllowedRuleArgument = number | undefined | RegExp

type TCommonRule<T extends EValidators, A extends TAllowedRuleArgument> = {
    type: T
    arg: A
    getError: (arg: string) => string
}

export type TValidationRule =
    | TCommonRule<EValidators.MATCH, RegExp>
    | TCommonRule<EValidators.MAX_LENGTH, number>
    | TCommonRule<EValidators.MIN_LENGTH, number>
    | TCommonRule<EValidators.REQUIRED, undefined>

export type TProps = {
    rules: TValidationRule[]
} & Record<"headClassName" | "id" | "label" | "name" | "type" | "value", string>

export type TContext = Omit<
    IView<TProps & {error: string; inputClassName: string}, never>,
    "dispatchDidMount" | "element" | "show"
>

export type TOptions = Required<Pick<ViewOpts<TProps>, "props">>

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
