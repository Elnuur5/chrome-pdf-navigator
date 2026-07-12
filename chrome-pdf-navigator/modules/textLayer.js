import * as pdfjsLib 
from "../libs/pdf.mjs";




export async function createTextLayer(
page,
viewport,
pageDiv
){


const textContent =
await page.getTextContent();



const textLayerDiv =
document.createElement("div");



textLayerDiv.className =
"textLayer";



pageDiv.appendChild(
textLayerDiv
);




const textLayer =
new pdfjsLib.TextLayer({

textContentSource:textContent,

container:textLayerDiv,

viewport:viewport

});



await textLayer.render();


}