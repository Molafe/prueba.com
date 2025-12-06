const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.dots');

let index = 0;
const total = slides.length;

// Crear dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
});
const dots = Array.from(dotsContainer.children);

// Mostrar slide
function goToSlide(i) {
    index = (i + total) % total; // circular
    track.style.transform = `translateX(-${100 * index}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

// Botones
nextBtn.addEventListener('click', () => goToSlide(index + 1));
prevBtn.addEventListener('click', () => goToSlide(index - 1));

// Dots
dots.forEach((dot, i) =>
    dot.addEventListener('click', () => goToSlide(i))
);

// Auto-slide
let auto = setInterval(() => goToSlide(index + 1), 4000);

// Pausar cuando el mouse esté encima
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(auto);
});
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    auto = setInterval(() => goToSlide(index + 1), 4000);
});
