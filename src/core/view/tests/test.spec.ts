import {assert} from "chai"
import {before} from "mocha"
import View from "../src/View"

describe("Тест экземпляра класса View", () => {
    describe("Тест интерфейса element", () => {
        const view = View.new({
            name: "TestView",
            template: `
                <div class="app">
                    <header class="app__section head"></header>
                    <main class="app__section body"></main>
                    <footer class="app__section foot"></footer>
                </div>
            `,
        })

        it("Недопустимый template представления - ошибка", () => {
            assert.throw(() => {
                // eslint-disable-next-line
                View.new({
                    name: "ErrorView",
                    template: "",
                }).element
            })
        })

        describe("Тест корневого элемента", () => {
            it("Корневой элемент - html-элемент", () => {
                assert.instanceOf(view.element, HTMLElement)
            })
            it("Тег элемента - div", () => {
                assert.equal(view.element.tagName.toLowerCase(), "div")
            })
            it("Класс элемента - 'app'", () => {
                assert.equal(view.element.className, "app")
            })
            it("Количество дочерних элементов - 3", () => {
                assert.equal(view.element.childElementCount, 3)
            })
        })

        describe("Тест дочернего элемента header", () => {
            it("Тег элемента - header", () => {
                assert.equal(view.element.children.item(0)?.tagName.toLowerCase(), "header")
            })
            it("Класс элемента - 'app__section head'", () => {
                assert.equal(view.element.children.item(0)?.className, "app__section head")
            })
        })

        describe("Тест дочернего элемента main", () => {
            it("Тег элемента - main", () => {
                assert.equal(view.element.children.item(1)?.tagName.toLowerCase(), "main")
            })
            it("Класс элемента - 'app__section body'", () => {
                assert.equal(view.element.children.item(1)?.className, "app__section body")
            })
        })

        describe("Тест дочернего элемента footer", () => {
            it("Тег элемента - footer", () => {
                assert.equal(view.element.children.item(2)?.tagName.toLowerCase(), "footer")
            })
            it("Класс элемента - 'app__section foot'", () => {
                assert.equal(view.element.children.item(2)?.className, "app__section foot")
            })
        })
    })

    describe("Тест интерфейса show", () => {
        const view = View.new({
            name: "TestView",
            template: "<div></div>",
        })

        it("Свойство show - true", () => {
            view.show = true
            assert.notEqual(view.element.style.display, "none")
        })
        it("Свойство show - false", () => {
            view.show = false
            assert.equal(view.element.style.display, "none")
        })
    })

    describe("Тест интерфейса props", () => {
        const view = View.new({
            name: "TestView",
            template: '<div :class="userClassName" :text="user.id"></div>',
            props: {
                userClassName: "user",
                user: {id: 0},
            },
        })

        it("Свойство props соответствует исходному значению", () => {
            assert.deepEqual(view.props, {
                userClassName: "user",
                user: {id: 0},
            })
        })

        describe("Тест props-а userClassName (примитив)", () => {
            it("Атрибут :class удален", () => {
                assert.isNull(view.element.getAttribute(":class"))
            })
            it("Атрибут class использует props", () => {
                assert.equal(view.element.className, "user")
            })
            it("Мутация props-а - реактивность", () => {
                view.props.userClassName = "super-user"
                assert.equal(view.element.className, "super-user")
                view.props.userClassName = "user"
            })
        })

        describe("Тест props-а user (объект)", () => {
            it("Атрибут :text удален", () => {
                assert.isNull(view.element.getAttribute(":text"))
            })
            it("Свойство textContent использует props", () => {
                assert.equal(view.element.textContent, "0")
            })
            it("Мутация props-а - реактивность", () => {
                view.props.user = {id: 1}
                assert.equal(view.element.textContent, "1")
                view.props.user = {id: 0}
            })
            it("Мутация свойства props-а - нет реактивности", () => {
                view.props.user.id = 1
                assert.equal(view.element.textContent, "0")
                view.props.user = {id: 0}
            })
        })
    })

    describe("Тест интерфейса slots", () => {
        const view = View.new({
            name: "TestView",
            template: '<ul #aria-label="items"></ul>',
            slots: {
                items: View.new({
                    name: "StubView",
                    template: '<li class="stub-item"></li>',
                }),
            },
        })

        describe("Тест исходного состояния представления", () => {
            it("Атрибут корневого элемента aria-label - items", () => {
                assert.equal(view.element.getAttribute("aria-label"), "items")
            })
            it("Количество дочерних элементов - 1", () => {
                assert.equal(view.element.childElementCount, 1)
            })
            it("Тег дочернего элемента - li", () => {
                assert.equal(view.element.firstElementChild?.tagName.toLowerCase(), "li")
            })
            it("Класс дочернего элемента - 'stub-item'", () => {
                assert.equal(view.element.firstElementChild?.className, "stub-item")
            })
        })

        describe("Тест измененного состояния представления", () => {
            before(() => {
                view.slots.items = [1, 2, 3, 4, 5].map((n) =>
                    View.new({
                        name: "Item",
                        template: `<li class="item-${n}">${n}</li>`,
                    }),
                )
            })

            it("Количество дочерних элементов - 5", () => {
                assert.equal(view.element.childElementCount, 5)
            })
            it("Разметка представления", () => {
                const replaceAllSpaces = (s: string) => s.replace(/\s+/g, "")

                const innerHTML = `
                    <li class="item-1">1</li>
                    <li class="item-2">2</li>
                    <li class="item-3">3</li>
                    <li class="item-4">4</li>
                    <li class="item-5">5</li>
                `

                assert.equal(replaceAllSpaces(view.element.innerHTML), replaceAllSpaces(innerHTML))
            })

            after(() => {
                view.slots.items = View.new({
                    name: "StubView",
                    template: '<li class="stub-item"></li>',
                })
            })
        })
    })

    describe("Тест интерфейса views", () => {
        const view = View.new({
            name: "TestView",
            template: "<div><ChildView></ChildView></div>",
            views: {
                childView: View.new({
                    name: "ChildView",
                    template: '<div class="child-view"><div',
                }),
            },
        })

        it("Количество дочерних элементов - 1", () => {
            assert.equal(view.element.childElementCount, 1)
        })
        it("Тег дочернего элемента - div", () => {
            assert.equal(view.element.firstElementChild?.tagName.toLowerCase(), "div")
        })
        it("Класс дочернего элемента - 'child-view'", () => {
            assert.equal(view.element.firstElementChild?.className, "child-view")
        })
        it("Нет тега дочернего элемента в шаблоне - ошибка", () => {
            assert.throw(() => {
                View.new({
                    name: "ErrorView",
                    template: "<div></div>",
                    views: {
                        childView: View.new({
                            name: "ChildView",
                            template: '<div class="child-view"></div>',
                        }),
                    },
                })
            })
        })
    })

    describe("Тест опции didMount", () => {
        const view = View.new({
            name: "TestView",
            template: '<div :text="user.name"></div',
            async didMount() {
                this.props.user = await this.meths.fetchUser()
            },
            meths: {
                fetchUser: () => Promise.resolve({name: "userName"}),
            },
            props: {
                user: {name: ""},
            },
        })
        view.dispatchDidMount()

        it("Мутация props-а user в didMount()", () => {
            assert.deepEqual(view.props.user, {name: "userName"})
        })
        it("Текст элемента - userName", () => {
            assert.equal(view.element.textContent, "userName")
        })
    })

    describe("Тест опции meths", () => {
        let count = 0
        const view = View.new({
            name: "ButtonView",
            template: '<button @click="doSomething">click me!</button>',
            meths: {
                add() {
                    count += 1
                },
                doSomething() {
                    this.meths.add()
                },
            },
        })

        it("Атрибут @click удален", () => {
            assert.isNull(view.element.getAttribute("@click"))
        })
        it("Событие click установлено", () => {
            view.element.click()
            assert.equal(count, 1)
            count = 0
        })
    })

    describe("Тест слияния атрибутов, имеющих идентичные имена", () => {
        const view = View.new({
            name: "TestView",
            template: '<div :class="className" class="app"></div>',
            props: {
                className: "app_name_messenger",
            },
        })

        it("Исходный класс элемента - 'app app_name_messenger'", () => {
            assert.equal(view.element.className, "app app_name_messenger")
        })
        it("Класс элемента, при мутации props-а className", () => {
            view.props.className = "app_name_super-app"
            assert.equal(view.element.className, "app app_name_super-app")
            view.props.className = "app_name_messenger"
        })
        it("Класс элемента, при мутации props-а className в пустую строку", () => {
            view.props.className = ""
            assert.equal(view.element.className, "app")
            view.props.className = "app_name_messenger"
        })
    })
})
