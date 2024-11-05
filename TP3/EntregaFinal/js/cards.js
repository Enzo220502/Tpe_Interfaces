addEventListener("DOMContentLoaded", (event) => {
const carousel = document.querySelector(".carousel"),
firstCard = carousel.querySelectorAll(".card-l")[0],
cards = carousel.querySelectorAll(".card-l"),
arrowIcons = document.querySelectorAll(".wrapper i"),
content = document.querySelector(".content");
const lastCard = cards[cards.length - 1];
let isDragStart = false, prevPageX, isDragging = false,prevScrollLeft, positionDiff;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

document.querySelectorAll('.btn-card-buy').forEach(btn => {
    btn.addEventListener('click', function() {
        btn.classList.toggle('clicked'); // Alternar clase "clicked" solo en el botón clickeado
    });
});

document.querySelectorAll('.btn-card-buy-l').forEach(btn => {
    btn.addEventListener('click', function() {
        btn.classList.toggle('clicked-l'); // Alternar clase "clicked" solo en el botón clickeado
    });
});

const showHideIcons = () => {
    //arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    //arrowIcons[1].style.display = carousel.scrollLeft == prevScrollLeft ? "none" : "block";
}

arrowIcons.forEach(arrow =>{
    arrow.addEventListener("click", () =>{
        let firstCardWidth = firstCard.clientWidth + 20;
        if(arrow.id == "left"){
            setTimeout(() => showHideIcons(), 60);
            if(carousel.scrollLeft == 0){
                carousel.setAttribute("style", "transform:translate(120px)");
                setTimeout(()=>{carousel.setAttribute("style", "transform:translate(0x)")},400);
            }else{
                carousel.scrollLeft -= firstCardWidth;
                moveCardsL();
                setTimeout(() =>{
                    cards.forEach(card =>{
                        card.classList.remove("moving-l");
                    }) 
                },400);
            }
        }else{
            setTimeout(() => showHideIcons(), 60);
            if((carousel.scrollLeft > 0) && (carousel.scrollLeft == prevScrollLeft)){
                carousel.setAttribute("style", "transform:translate(-120px)");
                setTimeout(()=>{carousel.setAttribute("style", "transform:translate(0x)")},400);
            }else{
                prevScrollLeft = carousel.scrollLeft;
                carousel.scrollLeft += firstCardWidth;
                moveCardsR();
                setTimeout(() =>{
                    cards.forEach(card =>{
                        card.classList.remove("moving-r");
                    }) 
                },400);
            }

        }
    })
});

const moveCardsL = () =>{
    cards.forEach(card =>{
        card.classList.add("moving-l");
    }) 
}
const moveCardsR = () => {
    cards.forEach(card => {
        card.classList.add("moving-r");
    });
}

const autoSlide = () => {
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstCardWidth = firstCard.clientWidth + 20;
    let valDifference = firstCardWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstCardWidth / 4.5 ? valDifference : -positionDiff;
    } 
    return carousel.scrollLeft -= positionDiff > firstCardWidth / 4.5 ? valDifference : -positionDiff;
}

const dragStart = (e) =>{
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragStop = () =>{
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging)return;
    isDragging = false;
    autoSlide();
}

const dragging= (e) =>{
    if(!isDragStart)return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
});