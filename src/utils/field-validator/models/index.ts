export enum EValidators {
    Match = "match",
    MaxLength = "maxLength",
    MinLength = "minLength",
    Required = "required",
}

export type TValidator = <A>(arg: A) => (val: string) => boolean | never

export interface IValidator extends Record<EValidators, TValidator> {}
