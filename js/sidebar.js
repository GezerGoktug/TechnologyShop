//! Mobil tasarım da sağ tarafta açılabilen side bar ın işlevleri yapıldı.

const sidebarButton = document.getElementById("side-bar");
const sidebar = document.getElementsByClassName("side-bar")[0];
const sidebarWrap = document.getElementsByClassName("side-bar-wrapper")[0];

let isClick = false;
sidebarButton.addEventListener("click", () => {
  if (!isClick) {
    sidebar.style.display = "flex";
    setTimeout(() => {
      sidebarButton.style.transform = "translate(0,0)";
      sidebarWrap.style.transform = "translate(0,0)";
    }, 10);

    isClick = true;
  } else {
    sidebarButton.style.transform = "translate(80vw,0)";
    sidebarWrap.style.transform = "translate(100vw,0)";

    setTimeout(() => {
      sidebar.style.display = "none";
    }, 300);
    isClick = false;
  }
});
