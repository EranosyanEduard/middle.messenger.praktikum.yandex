import button from "../button"
import {TOptions} from "~/src/components/button/models"

function submitButton(props: Omit<TOptions["props"], "type">) {
    return button({
        meths: {
            onClick: () => {},
        },
        props: {
            type: "submit",
            ...props,
        },
    })
}

export default submitButton
