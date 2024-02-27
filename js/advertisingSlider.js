//! Ana sayfa daki reklam sliderı ile alakalı işlevler yapıldı.
const prev=document.getElementById("prev");
const next=document.getElementById("next");
let slideindex =1;
let time =70;
function updateSlider(sliderİmageSrc){
    document.getElementById("slider-image").style.opacity=0;
    setTimeout(()=>{
    document.getElementById("slider-image").src=`./img/advertising/${sliderİmageSrc}`;
    document.getElementById("slider-image").style.opacity=1;
    },500);
  }
function  prevSlider(){
    switch(slideindex){
      case 1:
        updateSlider("reklam7.jpg");
        slideindex=7;
        time=70;
        break;
      case 2:
        updateSlider("reklam1.jpg");
        slideindex--;
        time=60;
        break;
      case 3:
        updateSlider("reklam2.jpg");
        slideindex--;
        time=50;
        break;
      case 4:
        updateSlider("reklam3.jpg");
        slideindex--;
        time=40;
        break;
      case 5:
        updateSlider("reklam4.jpg");
        slideindex--;
        time=30;
        break;
      case 6:
        updateSlider("reklam5.jpg");
        slideindex--;
        time=20;
        break;
      case 7:
        updateSlider("reklam6.jpg");
        slideindex--;
        time=10;
        break;
      }
  }
function nextSlider(){
    switch(slideindex){
      case 1:
        updateSlider("reklam2.jpg");
        slideindex++;
        time=60;
        break;
      case 2:
        updateSlider("reklam3.jpg");
        slideindex++;
        time=50;
        break;
      case 3:
        updateSlider("reklam4.jpg");
        slideindex++;
        time=40;
        break;
      case 4:
        updateSlider("reklam5.jpg");
        slideindex++;
        time=30;
        break;
      case 5:
        updateSlider("reklam6.jpg");
        slideindex++;
        time=20;
        break;
      case 6:
        updateSlider("reklam7.jpg");
        slideindex++;
        time=10;
        break;
      case 7:
        updateSlider("reklam1.jpg");
        slideindex=1;
        time=70;
        break;
      }
  }


function timer() {
    time--;
  
    if (time == 60) {
      updateSlider("reklam2.jpg");
      slideindex = 2;
    }
    if (time == 50) {
      updateSlider("reklam3.jpg");
      slideindex = 3;
    }
    if (time == 40) {
      updateSlider("reklam4.jpg");
      slideindex = 4;
    }
    if (time == 30) {
      updateSlider("reklam5.jpg");
      slideindex = 5;
    }
    if (time == 20) {
      updateSlider("reklam6.jpg");
      slideindex = 6;
    }
    if (time == 10) {
      updateSlider("reklam7.jpg");
      slideindex = 7;
    }
    if (time == 0) {
      updateSlider("reklam1.jpg");
      slideindex = 1;
      time = 70;
    }
  }
setInterval(timer, 1000);
next.addEventListener("click", () => {nextSlider();});
prev.addEventListener("click", () => {prevSlider();});