import { Traversal } from './utils/nodeTraversal'
import { generateHTML } from './utils/htmlGenerator'
import { zipGenerator } from './utils/zipGen'
import { cssParser } from './utils/cssParser'
import fileSaver from 'file-saver'

figma.skipInvisibleInstanceChildren = true
var cssObject: any = {}
var fulfilledCss: any = {}

const runPlugin = async () => {
    try {
        const selection = figma.currentPage.selection[0]
        if (selection.type === 'FRAME') {
            const frame = selection as FrameNode
            const html = generateHTML(Traversal(frame, '', cssObject))
            console.log(html)
            await Promise.all(Object.values(cssObject)).then((css) => {
                cssObject = Object.keys(cssObject)
                css.forEach((element, key) => {
                    console.log(key, JSON.stringify(element))
                    fulfilledCss[cssObject[key]] = element
                })
            })
            console.log(fulfilledCss)
            const css = cssParser(fulfilledCss)
            const zip = await zipGenerator(html, css)
            figma.showUI(__html__, { themeColors: true })
            figma.ui.postMessage(zip)
        } else {
            figma.closePlugin('Please select a valid frame')
        }
    } catch (error) {
        figma.closePlugin(error + '')
    }
}
runPlugin()
