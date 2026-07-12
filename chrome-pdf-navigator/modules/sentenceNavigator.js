let sentences = [];

let currentIndex = -1;



// Получение предложений из PDF
export function prepareSentences(container){


    sentences = [];

    currentIndex = -1;



    const spans =
        Array.from(
            container.querySelectorAll(
                ".textLayer span"
            )
        );



    let current = [];



    spans.forEach(span => {


        current.push(span);



        const text =
            span.textContent.trim();



        if(
            text.endsWith(".") ||
            text.endsWith("!") ||
            text.endsWith("?")
        ){

            sentences.push(current);

            current = [];

        }


    });



    if(current.length > 0){

        sentences.push(current);

    }



    console.log(
        "Количество предложений:",
        sentences.length
    );


}




// очистка старой подсветки
function clearHighlight(){


    document
    .querySelectorAll(
        ".sentence-highlight"
    )
    .forEach(element => {

        element.remove();

    });


}





// подсветка текущего предложения
function highlightSentence(){


    clearHighlight();



    const sentence =
        sentences[currentIndex];



    if(!sentence)
        return;




    sentence.forEach((span, index)=>{


        // прокрутка к активному тексту
        if(index === 0){

            span.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

        }




        const rect =
            span.getBoundingClientRect();



        const page =
            span.closest(".page");



        const pageRect =
            page.getBoundingClientRect();




        const highlight =
            document.createElement("div");



        highlight.className =
            "sentence-highlight";




        highlight.style.left =
            (rect.left - pageRect.left)
            + "px";



        highlight.style.top =
            (rect.top - pageRect.top)
            + "px";



        highlight.style.width =
            rect.width + "px";



        highlight.style.height =
            rect.height + "px";





        const layer =
            page.querySelector(
                ".highlightLayer"
            );



        if(layer){

            layer.appendChild(
                highlight
            );

        }



    });



}





function nextSentence(){


    if(sentences.length === 0)
        return;



    currentIndex++;



    if(
        currentIndex >= sentences.length
    ){

        currentIndex = 0;

    }



    console.log(
        "Активное предложение:",
        currentIndex + 1
    );



    highlightSentence();



}







function previousSentence(){


    if(sentences.length === 0)
        return;



    currentIndex--;



    if(
        currentIndex < 0
    ){

        currentIndex =
        sentences.length - 1;

    }



    console.log(
        "Активное предложение:",
        currentIndex + 1
    );



    highlightSentence();



}







// управление клавиатурой
export function enableKeyboardNavigation(){



    document.addEventListener(
        "keydown",
        (event)=>{


            if(event.key === "Tab"){


                event.preventDefault();



                if(event.shiftKey){

                    previousSentence();

                }
                else{

                    nextSentence();

                }


            }



        }
    );



}