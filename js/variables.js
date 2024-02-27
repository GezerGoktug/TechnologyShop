//! UI DOM ACCESS
const fastCargo=document.getElementsByClassName("fastCargo");
const cargoprice = document.getElementsByClassName("cargo-total");
const totalprice = document.getElementsByClassName("price-total");
const basketprice = document.getElementsByClassName("basket-total");
const badge = document.getElementsByClassName("badge");
const filtres = document.getElementsByClassName("filtre-badge");
const filtresResult = document.getElementsByClassName("filtre-result");
const pricing = document.getElementsByClassName("pricing");
const product = document.getElementsByClassName("products");
const featuredSlider = document.getElementsByClassName("slider-wrapper")[0];
const toast =document.getElementsByClassName("toast")[0];
const followmodal = document.getElementsByClassName("follow-up-modal")[0];
const modal = document.getElementsByClassName("login-modal")[0];
const account = document.getElementsByClassName("my-account")[0];
const footerEmail = document.getElementById("admin-mail");
const footerPhone = document.getElementById("admin-phone");
//! UI DOM ACCESS
//! DASHBOARD UI DOM ACCESS
const dashProductTitle = document.getElementById("product-title");
const dashProductFeatures1 = document.getElementById("product-features1");
const dashProductFeatures2  = document.getElementById("product-features2");
const dashProductFeatures3  = document.getElementById("product-features3");
const dashProductFeatures4  = document.getElementById("product-features4");
const dashProductPrice = document.getElementById("product-price");
const dashProductİmage = document.getElementById("product-image");
const dashProductType = document.getElementById("product-type");
const dashUserName = document.getElementById("dash-user-name");
const dashUserSurName = document.getElementById("dash-user-surname");
const dashUserMail = document.getElementById("dash-user-mail");
const dashUserPassword = document.getElementById("dash-user-password");
const dashUserFav1 = document.getElementById("user-fav1-type");
const dashUserFav2 = document.getElementById("user-fav2-type");
const dashUserFav3 = document.getElementById("user-fav3-type");
//! DASHBOARD UI DOM ACCESS
//! LOGİN PANEL GLOBAL VARİABLES START
const submit = document.getElementsByClassName("input-submit")[0];
const loginsubmit = document.getElementsByClassName("input-submit")[1];
const password = document.getElementsByClassName("input-password")[0];
const loginpassword = document.getElementsByClassName("input-password")[1];
const email = document.getElementsByClassName("input-email")[0];
const loginemail = document.getElementsByClassName("input-email")[1];
const userName = document.getElementsByClassName("input-name")[0];
const surname = document.getElementsByClassName("input-surname")[0];
const checkbox = document.getElementsByClassName("input-checkbox");
const termPolicy = document.getElementById("terms");
const notifications = document.getElementsByClassName("notifications");
//! LOGİN PANEL GLOBAL VARİABLES STOP
//? Filtre tag larındaki kategorileri uygun kartları tutacak dizi
let filterArray = [];
let price = 0;//? Fiyat değişkeni
let toggleClick = false;//? toggle navbarın tıklanma durumunu tutacak değişken
let cartArray = [];//? Kullanıcı sepetindeki ürünleri tutacak dizi.
let isLogin = false;//? Giriş yapılma durumunu tutacak değişken
let checkedcheckboxs=[];//? Kayıt formunda kullanıcının favorilerini tutacak dizi
let currentUser;//? Giriş  yapıldıktan sonra o anki kullanıcı bilgilerini tutan değişken
let userList=[];//? Sistemde kayıtlı kullanıcıları tutan değişken.
let dashboardToggleClick = false;//? Mobilde sol dashboard sidebarının açık olma durumunu tutan değişken
let dashOpr="";//? Dashboard da yapılan işlemi(örn:Kullanıcı güncelleme,ürün silme...) tutan değişken
let dashEvent;//? Hangi item(item kullanıcı ya da ürün olabilir) üzerinde işlem yapılıyosa onun verilerini...
//? tutan elementi saklayan değişken.
