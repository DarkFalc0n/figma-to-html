import { Traversal } from './utils/nodeTraversal'
import { generateHTML } from './utils/htmlGenerator'
import { zipGenerator } from './utils/zipGen'
import { cssParser } from './utils/cssParser'
import fileSaver from 'file-saver'

interface cssObjVal {
    codegen: Promise<any>
    type: string
    x: number
    y: number
}

figma.skipInvisibleInstanceChildren = true
var cssObject: { [key: string]: cssObjVal } = {}
// var cssParsingObject: any = {}
var fulfilledCss: { [key: string]: cssObjVal } = {}

const runPlugin = async () => {
    try {
        const selection = figma.currentPage.selection[0]
        if (selection.type === 'FRAME') {
            const frame = selection as FrameNode
            const html = generateHTML(Traversal(frame, '', cssObject))
            // console.log(html)
            // console.log(cssObject)
            await Promise.all(
                Object.values(cssObject).map((cssObjVal) => {
                    return cssObjVal['codegen']
                })
            ).then((css) => {
                var cssParsingObject = Object.keys(cssObject)
                css.forEach((element, key) => {
                    // console.log(key, JSON.stringify(element))
                    var cssObjectValue: cssObjVal = {
                        codegen: element,
                        type: cssObject[cssParsingObject[key]]['type'],
                        x: cssObject[cssParsingObject[key]]['x'],
                        y: cssObject[cssParsingObject[key]]['y'],
                    }
                    fulfilledCss[cssParsingObject[key]] = cssObjectValue
                })
            })
            // console.log(fulfilledCss)
            const css = cssParser(fulfilledCss)
            console.log(css)
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
