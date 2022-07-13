const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const isProductionMode = (npmScriptName) => {
    switch (npmScriptName.toLowerCase()) {
        case "build":
            return true
        case "start":
            return false
        default:
            throw new Error("Неожиданное имя npm-скрипта")
    }
}

const LAUNCHED_NPM_SCRIPT = process.env.npm_lifecycle_event
const IS_PROD_MODE = isProductionMode(LAUNCHED_NPM_SCRIPT)

const getHtmlWebpackPluginConfig = () => {
    if (IS_PROD_MODE) {
        return {
            title: "Мессенджер",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                useShortDoctype: true,
            },
        }
    }

    return {title: "Режим разработки"}
}

const OUTPUT_DIR = "dist"

module.exports = {
    mode: IS_PROD_MODE ? "production" : "development",
    entry: "./src/public/index.ts",
    devServer: {
        static: `${OUTPUT_DIR}`,
    },
    stats: {
        errorDetails: true,
    },
    output: {
        path: path.resolve(__dirname, OUTPUT_DIR),
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
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
            ...getHtmlWebpackPluginConfig(),
        }),
        new MiniCssExtractPlugin(),
    ],
}
