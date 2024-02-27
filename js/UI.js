
class UI {
  //! Ürünleri (ayrıca filtreleme ve arama işlemleri sonrası ürünler içinde) ekranda göstermek için kullanılan metot
  static display(displayArray) {
    let result="";
    result=displayArray.map((item) => {
      if(!JSON.parse(localStorage.getItem("updatedProductList"))){
        item.id = productsList.indexOf(item) + 1;
      }
      return `
      <div class="card ${item.type}">
      <div class="card-image"> <img src="${item.imagesrc}" alt="${item.title}" /></div>
      <div class="card-header"><h2 >${item.title}</h2></div>
      <div class="card-title">
      <h3><i class="fa-solid fa-chart-simple"></i> Features</h3>
      <ul>
        <li>${item.features1}</li>
        <li>${item.features2}</li>
        <li>${item.features3}</li>
        <li>${item.features4}</li>
      </ul>
      <div class="cargo-message"><i class="fa-solid fa-truck-fast"></i>If you order now, it will ship within <strong style="color: green ;"> 3 days</strong></div>
      </div>
      <div class="card-submit">
        <span >${item.price.toLocaleString("tr-TR")} TL</span>
        <button  class="addCart${item.id}" onclick="addCart(event)" data-id="${item.id - 1}" type="button">
        <i  class="fa-solid fa-cart-shopping"></i>Add cart</button>
      </div>
      </div>
`;
    }).join('');
    pricing[0].innerHTML=result;
  }
  //! Öne çıkan ürünleri ekranda göstermek için kullanılan metot
  static featuredDisplay(){
      let result = "";
      featuredProductList.forEach((item)=>{
        result+=`
        <div class="slider-card">
        <div class="slider-card-container">
          <img src="${item.imagesrc}" alt="${item.title}" />
          <div class="slider-card-title">
          <div class="card-header"><h2>${item.title}</h2></div>
          <div class="card-submit">
            <span>${item.price.toLocaleString("tr-TR")} TL</span>
            <button  class="sliderCart${item.id}" data-id="${item.id - 1}" onclick="addCart(event)" type="button">
            <i  class="fa-solid fa-cart-shopping"></i>Add cart</button>
          </div>
          </div>
        </div>
      </div>
      `
      });
      featuredSlider.innerHTML=result;
  }
  //! Arama sonuçlarını ekranda göstermek için kullanılan metot
  static searchDisplay(){
    const search = document.getElementById("search-product");
    search.addEventListener("input", () => {
        // Değeri al, küçük harfe çevir ve boşlukları kaldır

     let    value = search.value.toLowerCase();
     if(value==""){
     UI.display(productsList );
     UI.filtresResult("All");
     }
    
    // Değeri al, küçük harfe çevir
    

    // Giriş boşsa, filtreyi temizle
    if (!value.trim()) {return;}

    // Filtreleme işlemini gerçekleştir
    let productArray = [];

    productsList.forEach((item) => {
        let title = item.title.toLowerCase();

        // Her kelimenin ardından boşluk koyarak filtreleme yap
        let words = value.split(" ");
        let isMatch = words.every((word) => title.includes(word));

        // Değerle eşleşen bir kelime bulundu mu kontrol et
        if (isMatch) {
            // Eşleşen bir kelime bulunduğunda ürünü productArray'e ekle
            productArray.push(item);
        }
    });

    // Elde edilen filtrelenmiş ürünleri kullanarak istediğiniz işlemleri gerçekleştir
    filtresResult[0].innerHTML = `${productArray.length} options found`;
        // Elde edilen filtrelenmiş ürünleri kullanarak istediğiniz işlemleri gerçekleştir
     UI.display(productArray)
     UI.filtresResult("All");
     UI.statusAddProductButtons();
   
    });
  }
  //! Kullanıcıya bir  bildirim göstermek için kullanılan metot
  static toast(title, color,border,shadow,backcolor) {
     toast.innerHTML = `${title}  <div class="toast-loading-bar"></div>`;
     const toastLoading=document.querySelector(".toast-loading-bar");
     toastLoading.style.backgroundColor=`${backcolor}`;
     toastLoading.style.boxShadow=`${shadow}`;
     toastLoading.style.display="block";
     toast.style.backgroundColor = `${color}`;
     toast.style.borderColor = `${border}`;
     toast.style.transform ="translate(0,0)";
     setTimeout(() => {toast.style.transform =`translate(0,200px)`;
     toastLoading.style.display="none";
     }, 4000);
  }
  //! Hızlı kargo  seçeneğini işlemek için kullanılan metot
  static fastCargo(){ 

    if(fastCargo[0].checked==true || fastCargo[1].checked==true){
       if(cartArray.length==0){
         UI.toast("Add items to cart for fast shipping.","rgba(180, 41, 41, 0.744)","red"," 2px 2px 6px 4px rgb(168, 59, 59)","rgb(222, 164, 164)");
         return;
       }
       cargoprice[0].childNodes[3].textContent="1.000 TL";
       totalprice[0].childNodes[3].textContent = `${(price+1000).toLocaleString("tr-TR")} TL`;
       cargoprice[1].childNodes[3].textContent="1.000 TL";
       totalprice[1].childNodes[3].textContent = `${(price+1000).toLocaleString("tr-TR")} TL`;
     }
     else if(fastCargo[0].checked==false || fastCargo[1].checked==false){
       cargoprice[0].childNodes[3].textContent="0 TL";
       totalprice[0].childNodes[3].textContent = `${price.toLocaleString("tr-TR")} TL`;
       cargoprice[1].childNodes[3].textContent="0 TL";
       totalprice[1].childNodes[3].textContent = `${price.toLocaleString("tr-TR")} TL`;
     }


  }
  //! Sepete ürün eklemek için kullanılan metot
  static cartadded(e) {
    if(!isLogin){
     UI.toast("Please log in to add items to cart.","rgba(180, 41, 41, 0.744)","red"," 2px 2px 6px 4px rgb(168, 59, 59)","rgb(222, 164, 164)");
     modal.style.display="flex";
     return;
    }
    let productID;
     if(!e.target.matches("button")){
     productID=Number(e.target.parentElement.dataset.id);
     }
     else{
     productID = Number(e.target.dataset.id);
     }
    const product = productsList.find(item=>item.id == (productID + 1))
    const isAddedCart = cartArray.some(
      (item) =>
        item.title === product.title &&
        item.features1 === product.features1 &&
        item.features2 === product.features2 &&
        item.features3 === product.features3 &&
        item.features4 === product.features4 &&
        item.price === product.price
    );
    if (isAddedCart) {
      UI.toast(`${product.title} It is already in the cart. You can change the quantity in the cart.`,"rgba(61, 61, 176, 0.826)","blue","transparent","transparent");
      return;
    } else {
      UI.toast(`${product.title} added to cart`, " rgba(41, 180, 50, 0.744)","green","2px 2px 6px 4px rgb(22, 154, 112)"," rgb(123, 255, 103)");
      price += product.price;
      let newProduct = { ...product, howmany: 1 };
      cartArray.push(newProduct);
      UI.cartDisplay();
    }
   userList[currentUser.userListİd].usercart=cartArray;
   currentUser.usercart=cartArray;
   sessionStorage.setItem("currentData",JSON.stringify(currentUser))
   authentication.accountCartDisplay(cartArray);
    const userData = {
      userList,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  //! Ürün miktarını güncellemek için kullanılan metot
  static howmany(e) {
    console.log(e.target.textContent=="+");
      if(e.target.textContent=="+"){
        e.target.previousElementSibling.textContent = `${Number(e.target.previousElementSibling.textContent) + 1}`;
        price += cartArray[Number(e.target.dataset.id)].price;
        cartArray[Number(e.target.dataset.id)].howmany++;
        UI.updateCash();
        userList[currentUser.userListİd].usercart=cartArray;
        currentUser.usercart=cartArray;
        authentication.accountCartDisplay(cartArray);
        sessionStorage.setItem("currentData",JSON.stringify(currentUser));
        const userData = {
          userList,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      else{
        if (Number(e.target.nextElementSibling.textContent) > 1) {
          e.target.nextElementSibling.textContent = `${Number(e.target.nextElementSibling.textContent) - 1}`;
          price -= cartArray[Number(e.target.dataset.id)].price;
          cartArray[Number(e.target.dataset.id)].howmany--;
          UI.updateCash();  
          userList[currentUser.userListİd].usercart=cartArray;
          currentUser.usercart=cartArray;
          sessionStorage.setItem("currentData",JSON.stringify(currentUser));
          authentication.accountCartDisplay(cartArray);
          const userData = {
            userList,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      }
  
    UI.fastCargo();
 
  }
  //! Ürünü sepetten kaldırmak için kullanılan metot
  static remove(e) {
    UI.toast(`${cartArray[Number(e.target.dataset.id)].title} removed to cart`,"rgba(180, 41, 41, 0.744)","red"," 2px 2px 6px 4px rgb(168, 59, 59)","rgb(222, 164, 164)");
    price-=cartArray[Number(e.target.dataset.id)].price * cartArray[Number(e.target.dataset.id)].howmany;
    cartArray.splice(Number(e.target.dataset.id), 1);
    UI.cartDisplay();
    userList[currentUser.userListİd].usercart=cartArray;
    currentUser.usercart=cartArray;
    sessionStorage.setItem("currentData",JSON.stringify(currentUser));
    authentication.accountCartDisplay(cartArray);
    const userData = {
      userList,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  //! Kullanıcı sepetini ekranda göstermek için kullanılan metot
  static cartDisplay() {
    let result = "";
    UI.updateCash();
    result=cartArray.map((item) => {
      return  `
    <div class="product-card">
    <img src="${item.imagesrc}" alt="${item.title}">
    <i data-id="${cartArray.indexOf(item)}" onclick="removeListİtem(event)" id="remove" class="fa-solid fa-trash"></i>
    <div class="product-card-title">
    <div class="product-card-header"><h3>${item.title}</h3></div>
    <div class="product-card-list">
      <div class="product-card-price"><i class="fa-solid fa-tag"></i> ${item.price.toLocaleString("tr-TR")} TL</div>
      <ul>
        <li>${item.features1}</li>
        <li>${item.features2}</li>
        <li>${item.features3}</li>
        <li>${item.features4}</li>
      </ul>
      <div class="product-card-options">
      <span onclick="UI.howmany(event)" data-id="${cartArray.indexOf(item)}">-</span>
      <span>${item.howmany}</span>
      <span onclick="UI.howmany(event)" data-id="${cartArray.indexOf(item)}" >+</span>
      </div>
    </div>
    </div>
    </div>
    `;
    }).join('');
    product[0].innerHTML = result;
    UI.statusAddProductButtons();
    fastCargo[0].checked=false;
    fastCargo[1].checked=false;
    UI.fastCargo()
  }
  //! Ürün eklenme durumuna göre  buton durumlarını güncellemek için kullanılan metot
  static statusAddProductButtons(){
     for (let i = 0; i < productsList.length; i++) {
       try{
       document.getElementsByClassName(`addCart${productsList[i].id}`)[0].innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Add to cart`;
       document.getElementsByClassName(`addCart${productsList[i].id}`)[0].style.backgroundColor = "#333";
       document.getElementsByClassName(`sliderCart${productsList[i].id}`)[0].innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Add to cart`;
       document.getElementsByClassName(`sliderCart${productsList[i].id}`)[0].style.backgroundColor = "#333";
     }
     catch{}
     }
     cartArray.forEach((item)=>{
     try{
       document.getElementsByClassName(`addCart${item.id}`)[0].innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Added to cart`;
       document.getElementsByClassName(`addCart${item.id}`)[0].style.backgroundColor = "#224B0C";
       document.getElementsByClassName(`sliderCart${item.id}`)[0].innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Added to cart`;
       document.getElementsByClassName(`sliderCart${item.id}`)[0].style.backgroundColor = "#224B0C";
      }
    catch{}
   });
  }
  //! Sepet toplam fiyatını güncellemek için kullanılan metot
  static updateCash(){
    badge[0].textContent = `${cartArray.length}`;
    badge[1].textContent = `${cartArray.length}`;
    basketprice[0].childNodes[3].textContent = `${price.toLocaleString("tr-TR")} TL`;
    totalprice[0].childNodes[3].textContent = `${price.toLocaleString("tr-TR")} TL`;
    basketprice[1].childNodes[3].textContent = `${price.toLocaleString("tr-TR")} TL`;
    totalprice[1].childNodes[3].textContent = `${price.toLocaleString("tr-TR")} TL`;
  }
  //! Filtreleme sonuçlarını göstermek için kullanılan metot
  static filtresResult(category) {
    if(document.getElementsByClassName("main")[0].style.display=="none"){
    showHome();
    }
    const card = document.getElementsByClassName("card");
    for (let i = 0; i < card.length; i++) {
      card[i].style.opacity = 0;
    }

    setTimeout(() => {
        for (let i = 0; i < filtres.length; i++) {
          filtres[i].style.backgroundColor = "#35A29F";
          if( filtres[i].textContent==category){
          filtres[i].style.backgroundColor = "#060047";
          }
        }
        for (let i = 0; i < card.length; i++) {
          card[i].style.opacity = 1;
          switch (category) {
            case "All":
              card[i].style.display = "flex";
              filtres[0].style.backgroundColor = "#060047";
              filtresResult[0].innerHTML = `${card.length} options found`;
              break;
            case "Telephones":
              if (!card[i].classList.contains("telephones"))
                card[i].style.display = "none";
              else {
                card[i].style.display = "flex";
                filterArray.push(card[i]);
                filtresResult[0].innerHTML = `${filterArray.length} options found`;
              }

              break;
            case "Tablets":
              if (!card[i].classList.contains("tablet"))
                card[i].style.display = "none";
              else {
                card[i].style.display = "flex";
                filterArray.push(card[i]);
              }
                filtresResult[0].innerHTML = `${filterArray.length} options found`;
                break;
            case "Watch":
              if (!card[i].classList.contains("watch"))
                card[i].style.display = "none";
              else {
                card[i].style.display = "flex";
                filterArray.push(card[i]);
              }
              filtresResult[0].innerHTML = `${filterArray.length} options found`;
              break;
            case "Laptops":
              if (!card[i].classList.contains("laptop"))
                card[i].style.display = "none";
              else {
                card[i].style.display = "flex";
                filterArray.push(card[i]);
              }
              filtresResult[0].innerHTML = `${filterArray.length} options found`;
              break;
            case "TV":
                if (!card[i].classList.contains("TV"))
                  card[i].style.display = "none";
                else {
                  card[i].style.display = "flex";
                  filterArray.push(card[i]);
                }
                filtresResult[0].innerHTML = `${filterArray.length} options found`;
                break;
            case "Headphones":
                  if (!card[i].classList.contains("headphones"))
                    card[i].style.display = "none";
                  else {
                    card[i].style.display = "flex";
                    filterArray.push(card[i]);
                  }
                  filtresResult[0].innerHTML = `${filterArray.length} options found`;
                  break;
              }
        }
        filterArray = [];
      },500);
  }
  //! Sepeti temizlemek için kullanılan metot
  static removeCartList(){
    cartArray = [];
    cargoprice[0].childNodes[3].textContent="0 TL";
    cargoprice[1].childNodes[3].textContent="0 TL";
    fastCargo[0].checked=false;
    fastCargo[1].checked=false;
    price = 0;
    UI.toast("Cleared cart list","rgba(180, 41, 41, 0.744)", "red"," 2px 2px 6px 4px rgb(168, 59, 59)","rgb(222, 164, 164)");
    UI.cartDisplay();
    userList[currentUser.userListİd].usercart=cartArray;
    currentUser.usercart=cartArray;
    sessionStorage.setItem("currentData",JSON.stringify(currentUser));
    authentication.accountCartDisplay(cartArray);
    const userData = {
      userList,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  //! Toggle çubuğunu göstermek için kullanılan metot
  static showToggleBar(){
    if (!toggleClick) {
      document.getElementsByClassName("toggle-navbar")[0].style.display = "block";
      toggleClick = true;
      const handleClick=(e)=>{
        if(!e.target.classList.contains("toggle-navbar")){
          document.getElementsByClassName("toggle-navbar")[0].style.display = "none";
          toggleClick = false;
          window.removeEventListener("click",handleClick);
        }
      }
      setTimeout(()=>{window.addEventListener("click",handleClick)},10);
     } 
     else {
      document.getElementsByClassName("toggle-navbar")[0].style.display = "none";
      toggleClick = false;
    }
  }
  //! Kayıt modalı ve giriş modalı arasındaki geçiş için kullanılan metot
  static showSignModal(e){
    togglePasswordVisibility(password);
    togglePasswordVisibility(loginpassword);
 
    if(e.target.classList.contains("sign-up")){
      document.getElementsByClassName("modal-content")[0].style.display="none";
      document.getElementsByClassName("sign-in")[0].style.display="flex";
    }
    else{
      document.getElementsByClassName("modal-content")[0].style.display="flex";
      document.getElementsByClassName("sign-in")[0].style.display="none";
    }
  }
  //! Şifre görünürlüğünü değiştirmek için kullanılan metot
  static chancePasswordVisibility(e){
    if(e.target.previousElementSibling.matches("label")){
      e.target.previousElementSibling.previousElementSibling.type = e.target.previousElementSibling.previousElementSibling.type == "password" ? "text" : "password";
      e.target.classList= e.target.previousElementSibling.previousElementSibling.type == "password" ? "fa-solid fa-eye-slash":"fa-solid fa-eye";
    }
    else{
      e.target.previousElementSibling.type = e.target.previousElementSibling.type == "password" ? "text" : "password";
      e.target.classList= e.target.previousElementSibling.type == "password" ? "fa-solid fa-eye-slash":"fa-solid fa-eye";
    }
  }
  //! Şirket iletişim bilgilerini footer da göstermek için kullanılan metot
  static footerContactInfo(){
    footerEmail.textContent=`Email: ${adminContact.mail}`;
    footerPhone.textContent=`Telephone: ${adminContact.telephones}`;
  }
}






