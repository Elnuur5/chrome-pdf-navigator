import { renderPDF } 
from "./modules/pdfRenderer.js";


import { 
prepareSentences,
enableKeyboardNavigation
}
from "./modules/sentenceNavigator.js";



const fileInput =
document.getElementById("fileInput");


const container =
document.getElementById("pdf-container");



// включаем TAB один раз
enableKeyboardNavigation();



fileInput.addEventListener(
"change",
async function(event){


    const file =
    event.target.files[0];


    if(!file)
        return;



    const data =
    await file.arrayBuffer();



    await renderPDF(
        data,
        container
    );



    prepareSentences(
        container
    );


});