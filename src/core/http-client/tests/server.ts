import bodyParser from "body-parser"
import express from "express"

const server = express()
const router = express.Router()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(router)

router.delete("/del", (_req, res) => {
    res.send("OK")
})

router.get("/get", (req, res) => {
    res.send(req.url)
})

router.post("/post", (req, res) => {
    res.send(req.body)
})

router.put("/put", (_, res) => {
    res.status(201).send("OK")
})

server.listen(3000, () => {
    console.warn("Сервер запущен на 3000")
})
