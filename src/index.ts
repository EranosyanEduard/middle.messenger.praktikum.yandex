import "dotenv/config"
import express from "express"
import path from "path"

const {PORT = 3000} = process.env

const app = express()
const dirname = path.resolve()
const pathToDirWithEntryPoint = path.join(dirname, "dist")

app.use(express.static(pathToDirWithEntryPoint))

app.all("*", (_, res) => {
    res.sendFile(`${pathToDirWithEntryPoint}/index.html`)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
