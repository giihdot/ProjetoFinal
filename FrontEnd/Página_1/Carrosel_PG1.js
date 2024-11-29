let currentIndex = 0;
const slides = document.querySelector('.slides');
const slideArray = document.querySelectorAll('.slides img');
const totalSlides = slideArray.length;

document.querySelector('.prev').addEventListener('click', () => {
    moveSlide(-1);
});

document.querySelector('.next').addEventListener('click', () => {
    moveSlide(1);
});

function moveSlide(step) {
    currentIndex += step;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    slides.style.transform = 'translateX(' + (-25 * currentIndex) + '%)';
}

setInterval(() => {
    moveSlide(1);
}, 5000); // Muda a imagem a cada 3 segundos
