//! Öne çıkan ürünlerin gösterildiği slider ile alakalı işlevler.
const sliderWrapper = document.querySelector('.slider-wrapper');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;
 function showSlide(index) {
  let slideWidth;
  try{
    slideWidth = document.querySelector('.slider-card').offsetWidth;
  }
  catch{}
  sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = document.querySelectorAll('.slider-card').length - 1;
  }
  showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
  const totalSlides = document.querySelectorAll('.slider-card').length;
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  showSlide(currentIndex);
});

showSlide(currentIndex);
