export enum EValidators {
    MATCH = "match",
    MAX_LENGTH = "maxLength",
    MIN_LENGTH = "minLength",
    REQUIRED = "required",
}

export type TValidator = <A>(arg: A) => (val: string) => boolean | never

export type TPredicate = ReturnType<TValidator>

export type TValidators = Map<EValidators, TValidator>

export interface IValidator extends Record<EValidators, TValidator> {}
