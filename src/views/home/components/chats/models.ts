type TPropKey = "bemBlock"

type TChat = null

export type TProps = Record<TPropKey, string> & {chats: TChat[]}
