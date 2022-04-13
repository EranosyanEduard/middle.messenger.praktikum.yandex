export enum EValidators {
    Match = "match",
    MaxLength = "maxLength",
    MinLength = "minLength",
    Required = "required",
}

export type TValidator = <A>(arg: A) => (val: string) => boolean | never

export type TPredicate = ReturnType<TValidator>

export type TValidators = Map<EValidators, TValidator>

export interface IValidator extends Record<EValidators, TValidator> {}
