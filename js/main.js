//! Sayfa ilk açıldığında kullanıcı verilerinin sisteme yüklenmesi ...
//! adminin güncellediği güncel dizinin sisteme yüklenmesi...
//! Ve arayüzün güncellenmesi sağlanır.
//! Ayrıca giriş yapıldıktan sonra bu veriler de tarayıcıda saklanır
//! Böylece sayfa yenilense bile kullanıcı çıkış yapmamış olur(tarayıcı kapatılmadığı sürece)

window.addEventListener("DOMContentLoaded", () => {
    updateSlider("reklam1.jpg");
    const savedUpdatedProductList = JSON.parse(localStorage.getItem("updatedProductList"));
    const savedData = JSON.parse(localStorage.getItem("userData"));
    const currentData = JSON.parse(sessionStorage.getItem("currentData"));
    if(savedUpdatedProductList){
      productsList=savedUpdatedProductList.productsList;
      featuredProductList=savedUpdatedProductList.featuredProductList;
    }
    if (savedData) {
      userList = savedData.userList;
    }
    if(currentData){
      currentUser=currentData;
      if(currentUser.usermail === "admin@gmail.com" &&
      currentUser.userpassword === "admin1234"){
        pageShow("none","none","none","block",0);
      }
      else{
        cartArray=currentData.usercart;
        cartArray.forEach((item)=>{
        price+=(item.price)*(item.howmany) })  
        isLogin=true;
        authentication.accountDisplay(currentUser);
        authentication.accountCartDisplay(cartArray);
        showHome();
      }

    }
    else{
      showHome();
    }
    UI.display(productsList);
    UI.footerContactInfo();
    UI.featuredDisplay();
    UI.cartDisplay();
    UI.searchDisplay();
    filtres[0].style.backgroundColor = "#060047";
    filtresResult[0].innerHTML = `${productsList.length} options found`;
    setTimeout(()=>{
    document.getElementsByClassName("follow-modal-wrapper")[0].style.display="flex"
    },5000);
  });
//! DOM da sayfa geçişlerini kontrol eden fonksiyon
function pageShow(main,mycart,myAccount,dashboardPage,activeİndex){
  document.getElementsByClassName("wrapper")[0].style.display = `block`;
  document.getElementsByClassName("active")[0].classList.remove("active");
  document.getElementsByClassName("nav-links")[activeİndex].classList.add("active");
  document.getElementsByClassName("main")[0].style.display = `${main}`;
  document.getElementsByClassName("mycart")[0].style.display = `${mycart}`;
  document.getElementsByClassName("my-account")[0].style.display = `${myAccount}`;
  document.getElementsByClassName("dashboard")[0].style.display = `${dashboardPage}`;
  if(dashboardPage == "block"){
    document.getElementsByClassName("wrapper")[0].style.display = `none`;
    loading();
    dashboard.usersDataSection();
    document.title="Dashboard";
  }
}
//! Dashboardda bölüm geçişlerini kontrol eden fonksiyon
function showDashboardSection(sec1,sec2,sec3,sec4){
loading()
document.getElementsByClassName("dashboard-user-data")[0].style.display=sec1;
document.getElementsByClassName("dashboard-product-list")[0].style.display=sec2;
document.getElementsByClassName("dashboard-user-list")[0].style.display=sec3;
document.getElementsByClassName("dashboard-featured-product")[0].style.display=sec4;
}
//! Sepetim sayfasına eğer giriş yapılmışsa yönlendirme yapar.
//! Giriş yapılmamışsa kayıt modalına yönlendirir.
function showCart() {
  if (!isLogin) {
    UI.toast("Please log in to add items to cart.","rgba(180, 41, 41, 0.744)","red"," 2px 2px 6px 4px rgb(168, 59, 59)","rgb(222, 164, 164)");
    modal.style.display = "flex";
    togglePasswordVisibility(password);
    togglePasswordVisibility(loginpassword);
    return;
  }
  loading();
  sidebar.classList.remove("side-bar-disabled");
  sidebarButton.classList.remove("side-bar-disabled");
  pageShow("none","flex","none","none",2);
  document.title="My Cart";
}
//! Ana sayfaya yönlendirir
function showHome() {
  loading();
  sidebar.classList.add("side-bar-disabled");
  sidebarButton.classList.add("side-bar-disabled");
  pageShow("block","none","none","none",0);
  document.title="Technology Shop";
}
//! Hesabım sayfasına yönlendirir(eğer giriş yapılmışsa)
//! Giriş yapılmamışsa kayıt modalına yönlendirir.
function showLogin() {
  if (!isLogin) {
    modal.style.display = "flex";
    togglePasswordVisibility(password);
    togglePasswordVisibility(loginpassword);
    return;
  }
  loading();
  sidebar.classList.add("side-bar-disabled");
  sidebarButton.classList.add("side-bar-disabled");
  pageShow("none","none","block","none",1);
  document.title="My Account";
}
//! Şifre inputunu sıfırlar.
function togglePasswordVisibility(element){
  element.type="password";
  loginpassword.nextElementSibling.classList = "fa-solid fa-eye-slash";
  password.nextElementSibling.classList = "fa-solid fa-eye-slash";
  dashUserPassword.nextElementSibling.nextElementSibling.classList="fa-solid fa-eye-slash";
}
//! Kayıt modalını kapatır
function closeModal() {
  modal.style.display = "none";
  togglePasswordVisibility(password);
  togglePasswordVisibility(loginpassword);
}
//! Yükleme ekranı animasyonu
function loading() {
  const load = document.querySelector(".loading-icon");
  const loadBar = document.querySelector(".loading-bar");
  load.style.opacity = 1;
  loadBar.style.opacity = 1;
  load.style.display = "block";
  loadBar.style.display = "block";
  setTimeout(() => {
    load.style.display = "none";
    loadBar.style.display = "none";
    load.style.opacity = 0;
    loadBar.style.opacity = 0;
  }, 1000);
}
//! Kayıt sırasında validation işlemlerinde sıkıntı çıkarsa kullanıcıya kayıt ...
//! modalında bildirim gönderir(örnek:isim alanı boş bırakılamaz!)
//! Bu fonksiyon sadece kayıt ta değil dashboard modalında yeni kullanıcı ekleme güncelleme...
//! ürün ekleme güncelleme işlemlerindede kullanılıyor. 
function loginNotifications(index, backcolor, color, message) {
  notifications[index].style.display = "block";
  notifications[index].style.color = "white";
  notifications[index].style.backgroundColor = `${backcolor}`;
  notifications[index].style.borderColor = `${color}`;
  notifications[index].innerHTML = `${message}`;
  setTimeout(() => {
    notifications[index].style.display = "none";
  }, 5000);
}


//! Üstte gözüken "Bizi takip edin" modalını kapatır.  
const closes = () => {
  document.getElementsByClassName("follow-modal-wrapper")[0].style.display ="none";
};
//! Sepete ekle ye basıldığında ilgili UI metoduna yönlendirir
const addCart = (e) => {UI.cartadded(e);};
//! Sepette kaldırma ikonuna basıldığında o ürünü silmek için ilgili UI metoduna yönlendirir
const removeListİtem = (e) => {UI.remove(e);};
//! Çerez kabulü durumunda ilgili modalı kapatır.
const acceptCookies = () => {
  document.getElementsByClassName("cookies")[0].style.display = "none";
};
//! Dashboardda kullanıcı,ürün güncelleme silme  öne çıkan ürün...
//! kaldırma işlevleri için ilgili dashboard metoduna yönlendirir.
const updateProduct = (e) =>{dashboard.updateProductItem(e)} ;
const removeProduct = (e) =>{dashboard.removeProductItem(e)} ;
const removeUser = (e) =>{dashboard.removeUserList(e)} ;
const updateUser = (e) =>{dashboard.updateUserList(e)} ;
const removeFeaturedProductItem = (e) =>{dashboard.removeFeaturedProduct(e)};

//! Kayıt olma butonuna basıldığında validation ve kayıt ekleme işlevlerinin bulunduğu...
//! authentication metoduna yönlendirir.
submit.addEventListener("click", (e) => {
  e.preventDefault();
  authentication.signUp();
});
//! Giriş yap butonuna basıldığında validation ve giriş yapma  işlevlerinin bulunduğu...
//! authentication metoduna yönlendirir.
loginsubmit.addEventListener("click", (e) => {
  e.preventDefault();
  authentication.signİn();
});