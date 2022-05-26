import express from "express"
import path from "path"

const app = express()
const dirname = path.resolve()
const pathToDirWithEntryPoint = path.join(dirname, "dist")

app.use(express.static(pathToDirWithEntryPoint))

app.all("*", (_req, res) => {
    res.sendFile(`${pathToDirWithEntryPoint}/index.html`)
})

app.listen(3000, () => {
    console.log("Сервер запущен")
})
