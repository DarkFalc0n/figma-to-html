export const generateHTML = (htmlData: string): string => {
    return `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>figma to html</title>
                        <link rel="stylesheet" href="style.css">
                    </head>
                    <body>
                        ${htmlData}
                    </body>
                </html>
            `
}
