import { handleCss } from './cssHandler'

interface cssObjectVal {
    codegen: Promise<any>
    type: string
    x: number
    y: number
}

export const Traversal = (
    node: FrameNode | GroupNode,
    classPrefix: string,
    cssObject: {
        [classname: string]: cssObjectVal
    }
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
                const cssObjectValue: cssObjectVal = {
                    codegen: cssData,
                    type: child.type,
                    x: child.x,
                    y: child.y,
                }
                cssObject[className] = cssObjectValue
                console.log(className, child.type)
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
