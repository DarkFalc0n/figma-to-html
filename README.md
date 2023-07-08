# figma-to-html

![](https://img.shields.io/badge/typescript-yellow?logo=typescript&style=for-the-badge)
![](https://img.shields.io/badge/figma_plugin-pink?logo=figma&style=for-the-badge)
![](https://img.shields.io/badge/webpack-white?logo=webpack&style=for-the-badge)


One click UI plugin for figma to download a given frame as a zipped file containing the index.html and styles.css. To use, make sure you select a frame in figma and then start the plugin from the right-click menu. In the UI that pops up, use the 'Download' button to download the zip.

---
### This plugin is at a developmental stage and only supports RectangleNode, EllipseNode and TextNode for now.
Other features of the plugin include:
- Async css generation
- Modular structure using webpack
- Recursive traversal of node structure in Figma Design file
- In-memory zip file generation

  
Future goals for this project:
- Support for raster graphics and vectors
- Support for shared instances and other types of nodes
- Complete support for TextNodes with mixed properties (TextNodes that have different properties across characters)
- Responsive UI codegen

## Usage
Select and start the plugin to start codegen. <br>
<img src="https://github.com/DarkFalc0n/figma-to-html/assets/59203815/c5f6aed1-693a-4c57-a302-15a84033670b" width=500><br>

Download the zip and extract for the HTML and CSS files.<br>
<img src="https://github.com/DarkFalc0n/figma-to-html/assets/59203815/661ef03e-ae66-4618-910c-6bf3fda9ed29" width=500><br>


