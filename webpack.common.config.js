const path = require("path")

module.exports = {
    entry: "./src/public/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
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
                use: ["css-loader", "sass-loader"],
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
}
