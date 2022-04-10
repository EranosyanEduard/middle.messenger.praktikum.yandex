import Template from "./Template"

class Compiler {
    /**
     * Скомпилировать исходный код шаблона разметки.
     * @param {string} source исходный код шаблона разметки.
     * @param {object | null} context контекст, использующийся при "компиляции" source.
     */
    static compile(source, context = null) {
        return new Template(source, context).compile()
    }
}

export default Compiler
