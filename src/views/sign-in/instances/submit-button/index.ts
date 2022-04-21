import {Button} from "~/src/components"

export default new Button({
    emits: {
        onClick: () => {},
    },
    props: {
        bemBlock: "button",
        className: "",
        text: "Войти",
        type: "submit",
    },
})
