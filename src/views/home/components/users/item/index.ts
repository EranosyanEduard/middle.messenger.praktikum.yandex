import {View, ViewOpts} from "~/src/core/view"
import {TUser} from "~/src/api-clients"
import {is} from "~/src/utils"

function user(opts: Required<Pick<ViewOpts<{user: Omit<TUser, "password">}>, "props">>) {
    return View.new({
        name: "User",
        template: `
            <li :class="className" @click="onClick" class="list__item user">
                <ul class="user__details">
                    <li class="user__item user__item_key_login">
                        @<span :text="user.login"></span>
                    </li>
                    <li class="user__item">
                        <span :text="user.first_name"></span>
                        <span :text="user.second_name"></span>
                    </li>
                </ul>
            </li>
        `,
        meths: {
            onClick() {
                this.props.isActive = !this.props.isActive
                this.props.className = is.empty.str(this.props.className)
                    ? "user__details_active"
                    : ""
            },
        },
        props: {
            className: "",
            isActive: false,
            ...opts.props,
        },
    })
}

export default user
