import {EChars} from "~/src/models/common"

class StrMeths {
    /**
     * Привести первый символ строки str к верхнему регистру.
     * @param str исходная строка.
     */
    static capitalizeWord(str: string): string {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }

    /**
     * Преобразовать идентификатор, соответствующий стилю kebab-case, в
     * идентификатор, соответствующий стилю camelCase.
     * @param str исходная строка.
     */
    static convertKebabCaseToCamelCase(str: string): string {
        return str.split(EChars.DASH).reduce((acc, it) => `${acc}${this.capitalizeWord(it)}`)
    }

    /**
     * Заменить в строке str пробельные символы, соответствующую регулярному
     * выражению /\s+/g, на строку alt.
     * @param str исходная строка.
     * @param alt значение, которое используется в качестве альтернативы
     * пробельным символам.
     */
    static replaceSpaceChars(str: string, alt: string = EChars.SPACE): string {
        return str.replace(/\s+/g, alt)
    }

    /**
     * Преобразовать строковое представление даты в ISO-формате в "человеческий"
     * формат.
     * @param isoDate
     */
    static toHumanFormatDate(isoDate: string): string {
        return isoDate.slice(0, 10).split(EChars.DASH).reverse().join(EChars.DOT)
    }

    /**
     * Исключить символы, указанные в строке [charRange], из начала и конца строки [str].
     * @param str исходная строка.
     * @param charRange набор символов, которые необходимо исключить.
     */
    static trim(str: string, charRange: string = EChars.SPACE): string {
        if (/^ *$/.test(charRange)) {
            return str.trim()
        }
        const charRangePattern = `[${charRange}]+`
        return str.replace(
            new RegExp(`(^${charRangePattern}|${charRangePattern}$)`, "g"),
            EChars.EMPTY,
        )
    }
}

export default StrMeths
