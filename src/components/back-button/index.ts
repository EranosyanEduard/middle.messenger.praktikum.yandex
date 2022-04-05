import Anchor from "../anchor"

class BackButton extends Anchor {
    constructor(ref: string) {
        super({
            props: {
                bemBlock: "anchor",
                className: "&_icon &_icon_arrow-back &_icon_xl m_xy_auto",
                ref,
                text: "",
            },
        })
    }
}

export default BackButton
