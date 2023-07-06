const runPlugin = async () => {
    try {
        const selection = figma.currentPage.selection[0]
        if (selection.type === 'FRAME') {
            figma.closePlugin('Success')
        } else {
            figma.closePlugin('Please select a valid frame')
        }
    } catch (e) {
        figma.closePlugin('error')
    }
}
runPlugin()
