import {assert} from "chai"
import {XMLHttpRequest} from "xmlhttprequest-ts"
import HttpClient from "../src/HttpClient"

describe("Тест экземпляра класса HttpClient", () => {
    /*
     * Перед тестированием необходимо запустить скрипт 'npm run before_test',
     * который запустит локальный сервер на 3000 порту, использующийся тестами
     * в качестве API.
     */

    // Подменить оригинальное значение XMLHttpRequest, чтобы обеспечить
    // возможность тестирования.
    Object.defineProperty(global, "XMLHttpRequest", {
        value: XMLHttpRequest,
    })

    const httpClient = new HttpClient({
        headers: {"content-type": "application/json"},
        timeout: 5,
        url: "http://localhost:3000",
        withCredentials: false,
    })

    describe("Тест интерфейса delete", () => {
        it("Ответ на DELETE-запрос", (done) => {
            httpClient.delete("/del").then((xhr) => {
                assert.equal(xhr.responseText, "OK")
                done()
            })
        })
    })

    describe("Тест интерфейса get", () => {
        it("URL GET-запроса без параметров запроса", (done) => {
            httpClient.get("/get").then((xhr) => {
                assert.equal(xhr.responseText, "/get")
                done()
            })
        })

        it("URL GET-запроса с параметрами запроса", (done) => {
            const body = {
                name: "eduard",
                age: 30,
            }

            httpClient.get("/get", {body}).then((xhr) => {
                assert.equal(xhr.responseText, "/get?name=eduard&age=30")
                done()
            })
        })
    })

    describe("Тест интерфейса post", () => {
        it("Тело POST-запроса без тела", (done) => {
            httpClient.post("/post").then((xhr) => {
                assert.deepEqual(JSON.parse(xhr.responseText), {})
                done()
            })
        })

        it("Тело POST-запроса с телом", (done) => {
            const body = {
                name: "eduard",
                age: 30,
            }

            httpClient.post("/post", {body}).then((xhr) => {
                assert.deepEqual(JSON.parse(xhr.responseText), body)
                done()
            })
        })
    })

    describe("Тест интерфейса put", () => {
        it("Код статуса PUT-запроса", (done) => {
            httpClient.put("/put").then((xhr) => {
                assert.equal(xhr.status, 201)
                done()
            })
        })
    })
})
