interface cssObject {
    css: string
}
import { handleCss } from './cssHandler'

export const Traversal = (
    node: FrameNode | GroupNode,
    classPrefix: string,
    cssObject: cssObject
): string => {
    return `<div class="${node.name.split(' ').join('_')}">\n${node.children
        .map((child) => {
            if (child.type === 'FRAME' || child.type === 'GROUP') {
                const subTraversal = Traversal(
                    child as FrameNode | GroupNode,
                    child.name,
                    cssObject
                )
                return subTraversal
            } else {
                const className: string =
                    classPrefix.split(' ').join('_') +
                    '_' +
                    child.name.split(' ').join('_')
                const cssData = handleCss(
                    child as TextNode | RectangleNode | EllipseNode
                )
                cssObject.css += `.${className} {\n${cssData}\n}\n`
                if (child.type == 'TEXT') {
                    return `<div class="${className}">${child.characters}</div>`
                } else {
                    return `<div class="${className}"></div>`
                }
            }
        })
        .join('\n')}
        </div>`
}
