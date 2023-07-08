import { Traversal } from './utils/nodeTraversal'
import { generateHTML } from './utils/htmlGenerator'
import { zipGenerator } from './utils/zipGen'
// import { downloadHandler } from './utils/downloadHandler'
import fileSaver from 'file-saver'

figma.skipInvisibleInstanceChildren = true
var cssObject = { css: '' }

const runPlugin = async () => {
    try {
        const selection = figma.currentPage.selection[0]
        if (selection.type === 'FRAME') {
            const frame = selection as FrameNode
            const html = Traversal(frame, '', cssObject)
            const zip = await zipGenerator(html, cssObject.css)
            console.log(html)
            console.log(cssObject.css)
            console.log(zip)
            // figma.showUI(`<script>window.location.href = "${zip}";</script>`)
            figma.showUI(__html__)
            figma.ui.postMessage(zip)
            // figma.ui.postMessage('zip ready')
        } else {
            figma.closePlugin('Please select a valid frame')
        }
    } catch (error) {
        figma.closePlugin(error + '')
    }
}
runPlugin()
