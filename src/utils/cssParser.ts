export const cssParser = (cssObj: Object): string => {
    let cssString = ''
    for (const [key, value] of Object.entries(cssObj)) {
        cssString += `.${key} {\n`
        cssString += `\tleft: ${value['x']}px;\n`
        cssString += `\ttop: ${value['y']}px;\n`
        if (value['type'] === 'ELLIPSE') {
            cssString += `\tborder-radius: 50%;\n`
        }
        for (const [key, val] of Object.entries(value['codegen'])) {
            if (key === 'fill') {
                cssString += `\tbackground-color: ${val};\n`
                continue
            }
            cssString += `\t${key}: ${val};\n`
        }
        cssString += '\tposition: absolute;\n'
        cssString += '}\n'
    }
    return cssString
}
