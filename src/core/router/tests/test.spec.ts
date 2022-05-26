import {assert} from "chai"
import {JSDOM} from "jsdom"
import {View} from "~/src/core/view"
import Router from "../src/Router"

describe("Тест экземпляра класса Router", () => {
    /*
     * Подменить оригинальное значение window, чтобы обеспечить
     * возможность тестирования.
     */
    const jsDom = new JSDOM(
        `
            <html lang="en">
                <head>
                    <title>Test</title>
                </head>
                <body></body>
            </html>
        `,
        {url: "https://localhost:1234"},
    )

    Object.defineProperty(global, "window", {value: jsDom.window})

    function viewStubFactory() {
        return View.new({
            name: "StubView",
            template: "<div></div>",
        })
    }

    const router = Router.invoke({
        rootSelector: "body",
        routes: [
            {
                component: viewStubFactory,
                name: "home",
                path: "/",
                requiresAuth: false,
            },
            {
                component: viewStubFactory,
                name: "settings",
                path: "/settings",
                requiresAuth: false,
            },
            {
                component: viewStubFactory,
                name: "signIn",
                path: "/sign-in",
                requiresAuth: false,
            },
            {
                component: viewStubFactory,
                name: "chat",
                path: "/chats/:id",
                requiresAuth: false,
            },
        ],
    })

    describe("Тест интерфейса go", () => {
        before(() => {
            router.go({name: "signIn"})
            router.go({path: "settings"})
        })

        it("Длина истории навигации", () => {
            assert.equal(window.history.length, 3)
        })
        it("Состояние маршрута", () => {
            assert.deepEqual(window.history.state, {routeOptions: {path: "settings"}})
        })
        it("Маршрут с параметром", () => {
            router.go({
                name: "chat",
                params: {id: 5},
            })
            assert.equal(window.location.pathname, "/chats/5")
        })
    })

    describe("Тест интерфейса back", () => {
        before(() => {
            router.back()
        })

        it("Длина истории навигации", () => {
            assert.equal(window.history.length, 4)
        })
    })

    describe("Тест интерфейса forward", () => {
        before(() => {
            router.forward()
        })

        it("Длина истории навигации", () => {
            assert.equal(window.history.length, 4)
        })
        it.skip("Состояние маршрута", () => {
            assert.deepEqual(window.history.state, {
                routeOptions: {
                    name: "chat",
                    params: {id: 5},
                },
            })
        })
    })
})
