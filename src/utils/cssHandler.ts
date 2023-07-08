export const handleCss = async (
    node: TextNode | RectangleNode | EllipseNode
): Promise<string> => {
    const cssString = await node.getCSSAsync()
    console.log('ehlo' + JSON.stringify(cssString))
    return cssString.toString()
}
