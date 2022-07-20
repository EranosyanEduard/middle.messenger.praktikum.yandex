const {mergeWithRules} = require("webpack-merge")

const configCommon = require("./webpack.common.config")
const configDev = require("./webpack.dev.config")
const configProd = require("./webpack.prod.config")

const htmlTemplatePath = "./src/public/index.html"

module.exports = (env, args) => {
    const {mode} = args
    const merge = mergeWithRules({
        module: {
            rules: {
                test: "match",
                use: "prepend",
            },
        },
    })

    switch (mode) {
        case "development":
            return merge(configCommon, configDev(htmlTemplatePath))
        case "production":
            return merge(configCommon, configProd(htmlTemplatePath))
        default:
            throw new Error(`Конфигурация webpack ${mode} не найдена`)
    }
}
