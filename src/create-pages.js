import {copyFile, mkdir, readdir, stat, writeFile} from "fs/promises"
import path from "path"

try {
    const dirname = path.resolve()
    const pageDir = path.join(dirname, "pages")
    const htmlTemplateFile = path.join(pageDir, "template.html")

    const getJsFileContent = (fileName) => {
        const content = [
            `import view from "../../views/${fileName}"`,
            "",
            "document.body.innerHTML = view",
        ].join("\n")

        return `${content}\n`
    }

    try {
        await stat(pageDir)
    } catch (e) {
        await mkdir(pageDir)
    }

    const dirList = await readdir(path.join(dirname, "views"))
    const dirPromiseList = dirList.map((dir) => {
        const currentPageDir = path.join(pageDir, dir)
        return mkdir(currentPageDir)
    })

    await Promise.all(dirPromiseList)

    const filePromiseList = dirList.map((dir) => {
        const currentPageDir = path.join(pageDir, dir)
        const htmlFile = path.join(currentPageDir, "index.html")

        return [
            copyFile(htmlTemplateFile, htmlFile),
            writeFile(path.join(currentPageDir, "index.ts"), getJsFileContent(dir)),
        ]
    })

    await Promise.all(filePromiseList.flat())
} catch (e) {
    console.error(e)
}
