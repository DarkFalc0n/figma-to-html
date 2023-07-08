export const handleCss = async (
    node: TextNode | RectangleNode | EllipseNode
): Promise<any> => {
    const cssString = await node.getCSSAsync()
    return cssString
}
