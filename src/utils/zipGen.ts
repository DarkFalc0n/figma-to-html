import JSZip from 'jszip'

export const zipGenerator = async (html: string, css: string) => {
    const zip = new JSZip()
    zip.file('index.html', html)
    zip.file('styles.css', css)
    const content = await zip.generateAsync({ type: 'base64' })
    const dataURL = 'data:application/octet-stream;base64,' + content
    return dataURL
}
