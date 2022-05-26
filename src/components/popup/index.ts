import {View, ViewOpts} from "~/src/core/view"
import button from "../button"

function popup(opts: Required<Pick<ViewOpts<never, never, never, "bodySection">, "views">>) {
    const view = View.new({
        name: "Popup",
        template: `
            <div class="popup">
                <div class="popup__content">
                    <div class="popup__head"><CloseButton></CloseButton></div>
                    <div class="popup__body"><BodySection></BodySection></div>
                </div>
            </div>
        `,
        props: {
            store: new Map<string, unknown>(),
        },
        views: {
            closeButton: button({
                meths: {
                    onClick() {
                        view.show = false
                    },
                },
                props: {
                    className: "button_bg-color_none button_icon button_icon_close",
                    text: "",
                    type: "button",
                },
            }),
            ...opts.views,
        },
    })

    document.addEventListener("keydown", (evt) => {
        if (view.show && evt.key.toLowerCase() === "escape") {
            view.show = false
        }
    })

    view.show = false
    return view
}

export default popup
