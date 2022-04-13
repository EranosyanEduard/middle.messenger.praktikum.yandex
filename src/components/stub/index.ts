import {Component} from "~/src/core/component"

class Stub extends Component<never> {
    constructor() {
        super({
            template: '<div class="d_none"></div>',
        })
    }
}

export default Stub
