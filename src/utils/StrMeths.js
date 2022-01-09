class StrMeths {
    /**
     * Получить пустую строку.
     * @returns {string}
     */
    static get emptyStr() {
        return ""
    }

    /**
     * Получить строку, содержащую единственный пробел.
     * @returns {string}
     */
    static get spaceChar() {
        return " "
    }

    /**
     * Заменить подстроку, соответствующую регулярному выражению, созданному с помощью аргументов
     * функции (pattern, flags, after, before), в строке.
     * @param {string} str строка, в которой необходимо произвести замену подстроки.
     * @param {string} pattern основной шаблон регулярного выражения.
     * @param {string} alt значение, на которое будет заменена найденная подстрока.
     * @param {string} flags флаги регулярного выражения.
     * @param {string} after шаблон регулярного выражения, который находится перед pattern.
     * @param {string} before шаблон регулярного выражения, который находится после pattern.
     * @returns {string}
     */
    static replacePattern(str, pattern, alt, flags = "", after = "", before = "") {
        const afterTarget = `(?<=${after})`
        const beforeTarget = `(?=${before})`
        const re = new RegExp(`${afterTarget}${pattern}${beforeTarget}`, flags)

        return str.replace(re, alt)
    }

    /**
     * Заменить пробельные символы в строке.
     * @param {string} str строка, в которой необходимо заменить пробельные символы.
     * @param {string} alt значение, на которое будут заменены пробельные символы.
     * @returns {string}
     */
    static replaceSpaces(str, alt = "") {
        return this.replacePattern(str, "\\s+", alt, "g")
    }
}

export default StrMeths
