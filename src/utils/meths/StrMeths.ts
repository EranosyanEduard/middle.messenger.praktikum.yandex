import {EChars} from "~/src/models/common"

class StrMeths {
    /**
     * Привести первый символ строки str к верхнему регистру.
     * @param str исходная строка.
     * @returns
     */
    static capitalizeWord(str: string): string {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }

    /**
     * Преобразовать идентификатор, соответствующий стилю kebab-case, в
     * идентификатор, соответствующий стилю camelCase.
     * @param str исходная строка.
     * @returns
     */
    static convertKebabCaseToCamelCase(str: string): string {
        return str.split(EChars.Dash).reduce((acc, it) => `${acc}${this.capitalizeWord(it)}`)
    }

    /**
     * Заменить в строке str пробельные символы, соответствующую регулярному
     * выражению /\s+/g, на строку alt.
     * @param str исходная строка.
     * @param alt значение, которое используется в качестве альтернативы
     * пробельным символам.
     * @returns
     */
    static replaceSpaceChars(str: string, alt = EChars.Space): string {
        return str.replace(/\s+/g, alt)
    }
}

export default StrMeths
