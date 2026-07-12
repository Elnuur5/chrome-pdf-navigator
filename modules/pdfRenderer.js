import * as pdfjsLib 
from "../libs/pdf.mjs";


import { createTextLayer }
from "./textLayer.js";



pdfjsLib.GlobalWorkerOptions.workerSrc =
"../libs/pdf.worker.mjs";





export async function renderPDF(
data,
container
){


container.innerHTML="";



const pdf =
await pdfjsLib
.getDocument({
data:data
})
.promise;



for(
let pageNumber=1;
pageNumber<=pdf.numPages;
pageNumber++
){



const page =
await pdf.getPage(pageNumber);



const viewport =
page.getViewport({
scale:1.5
});



const pageDiv =
document.createElement("div");


pageDiv.className="page";





const canvas =
document.createElement("canvas");


const context =
canvas.getContext("2d");



canvas.width =
viewport.width;


canvas.height =
viewport.height;



pageDiv.appendChild(canvas);





// слой подсветки

const highlightLayer =
document.createElement("div");


highlightLayer.className =
"highlightLayer";


pageDiv.appendChild(
highlightLayer
);





container.appendChild(
pageDiv
);





await page.render({

canvasContext:context,

viewport:viewport

}).promise;





await createTextLayer(

page,

viewport,

pageDiv

);



}


}