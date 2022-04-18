import {v} from "~/src/utils"
import {EValidators, IValidator, TPredicate, TValidator, TValidators} from "../models"

class Validator implements IValidator {
    private readonly validators: TValidators = this.createValidators()

    match<RegExp>(arg: RegExp): TPredicate {
        return this.getValidator(EValidators.Match)(arg)
    }

    maxLength<Number>(arg: Number): TPredicate {
        return this.getValidator(EValidators.MaxLength)(arg)
    }

    minLength<Number>(arg: Number): TPredicate {
        return this.getValidator(EValidators.MinLength)(arg)
    }

    required(): TPredicate {
        return this.getValidator(EValidators.Required)(undefined)
    }

    /**
     * Создать словарь, содержащий валидаторы. В качестве ключей используется
     * названия типов валидаторов.
     * @private
     */
    private createValidators(): TValidators {
        function checkOrError(cond: boolean, doCb: () => boolean, err: string): boolean | never {
            if (cond) {
                return doCb()
            }
            throw new Error(err)
        }

        function getValidator(type: EValidators): TValidator {
            return function addArgumentToValidator<A>(arg: A): TPredicate {
                function getError(messageEnd: string) {
                    return `Аргумент ${arg} не является ${messageEnd}`
                }

                return (val: string) => {
                    switch (type) {
                        case EValidators.Match:
                            return checkOrError(
                                v.re(arg),
                                () => {
                                    const re = arg as unknown as RegExp
                                    return re.test(val)
                                },
                                getError("регулярным выражением"),
                            )
                        case EValidators.MaxLength:
                            return checkOrError(
                                v.int(arg),
                                () => {
                                    const int = arg as unknown as number
                                    return val.length <= int
                                },
                                getError("целым числом"),
                            )
                        case EValidators.MinLength:
                            return checkOrError(
                                v.int(arg),
                                () => {
                                    const int = arg as unknown as number
                                    return val.length >= int
                                },
                                getError("целым числом"),
                            )
                        case EValidators.Required:
                            return val.length > 0
                        default:
                            throw new Error("Неожиданная ошибка при валидации")
                    }
                }
            }
        }

        return new Map(Object.values(EValidators).map((type) => [type, getValidator(type)]))
    }

    /**
     * Извлечь определенный валидатор из словаря, используя аргумент [type] в
     * качестве ключа.
     * @param type тип валидатора.
     */
    private getValidator(type: EValidators) {
        return this.validators.get(type) as TValidator
    }
}

export default new Validator()
