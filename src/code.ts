figma.skipInvisibleInstanceChildren = true
var css: string = ''

const handleCss = async (
    node: TextNode | RectangleNode | EllipseNode,
    className: string
): Promise<string> => {
    const cssString = await node.getCSSAsync()
    return cssString.toString()
}

const Traversal = (
    node: FrameNode | GroupNode,
    classPrefix: string
): string => {
    return `<div class="${node.name.split(' ').join('_')}">\n${node.children
        .map((child) => {
            if (child.type === 'FRAME' || child.type === 'GROUP') {
                const subTraversal = Traversal(
                    child as FrameNode | GroupNode,
                    child.name
                )
                return subTraversal
            } else {
                const className: string =
                    classPrefix.split(' ').join('_') +
                    '_' +
                    child.name.split(' ').join('_')
                if (child.type == 'TEXT') {
                    return `<div class="${className}">${child.characters}</div>`
                } else {
                    handleCss(
                        child as RectangleNode | EllipseNode,
                        className
                    ).then((res) => {
                        css += '\n' + res
                    })

                    return `<div class="${className}"></div>`
                }
            }
        })
        .join('\n')}
        </div>`
}

const runPlugin = async () => {
    try {
        const selection = figma.currentPage.selection[0]
        if (selection.type === 'FRAME') {
            const frame = selection as FrameNode
            const html = Traversal(frame, '')
            console.log(html)
            console.log(css)
            figma.closePlugin('Success')
        } else {
            figma.closePlugin('Please select a valid frame')
        }
    } catch (e) {
        figma.closePlugin('error')
    }
}
runPlugin()
