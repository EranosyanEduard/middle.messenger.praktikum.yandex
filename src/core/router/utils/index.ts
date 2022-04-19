import {EChars} from "~/src/models/common"

/**
 * Заменить последовательность slash-ей в строке [path] на один slash.
 * @param path
 * @returns
 */
function sanitizeSlashRange(path: string): string {
    return path.replace(/\/+/g, EChars.Slash)
}

export {sanitizeSlashRange}
