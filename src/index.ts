import express from "express"
import path from "path"

const app = express()
const dirname = path.resolve()

app.use(express.static(path.join(dirname, "dist")))

app.listen(3000, () => {
    console.log("Сервер запущен")
})
