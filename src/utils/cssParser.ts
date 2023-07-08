export const cssParser = (cssObj: Object): string => {
    let cssString = ''
    for (const [key, value] of Object.entries(cssObj)) {
        cssString += `.${key} {\n`
        for (const [key, val] of Object.entries(value)) {
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
