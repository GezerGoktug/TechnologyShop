//! Sayfa belli bir mesafe kaydırıldığında başa dön ,sol sosyal medya ikonları ve help-asistan ikonları ortaya çıkmasını sağlar.
window.addEventListener('scroll', function() {
    var socialIcons = document.getElementById('social-icons');

    if (window.scrollY > 100) { 
        socialIcons.style.left = '5px';
    } else {
        socialIcons.style.left = '-50px';
    }
    if(window.scrollY > 300){
        document.getElementById("return-top").style.display="block";
        document.getElementById("help-asistan").style.display="flex";
    }
    else{
        document.getElementById("return-top").style.display="none";
        document.getElementById("help-asistan").style.display="none";
    }
});