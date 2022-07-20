const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {merge} = require("webpack-merge")
const path = require("path")

const devConfig = require("./webpack.dev.config")
const prodConfig = require("./webpack.prod.config")

const htmlTemplatePath = "./src/public/index.html"
const commonConfig = {
    entry: "./src/public/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.bundle.js",
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./"),
        },
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {configFile: path.resolve(__dirname, "tsconfig.json")},
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: "/.(woff2?|eot|[ot]tf)$/",
                type: "asset/resource",
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
}

module.exports = (env, {mode}) => {
    switch (mode) {
        case "development":
            return merge(commonConfig, devConfig(htmlTemplatePath))
        case "production":
            return merge(commonConfig, prodConfig(htmlTemplatePath))
        default:
            throw new Error(`Конфигурация webpack ${mode} не найдена`)
    }
}
