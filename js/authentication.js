
class authentication{
    //! Giriş yapıldığında aldığı kullanıcı verilerine göre My Account sayfasını günceller.
    static accountDisplay(userdata){
     account.innerHTML=`<div class="container">
        <div class="account">
        <div class="account-img"><img src="./img/user-removebg-preview.png" alt=""></div>
        <div class="account-info">
        <div class="account-header"><h2><i class="fa-solid fa-user"></i>  ${userdata.username} ${userdata.usersurname}</h2></div>
        <div class="account-id"><i class="fa-regular fa-id-card"></i> User ID:${userdata.userid}</div>
        <button onclick="authentication.exitAccountOperation()"><i class="fa-solid fa-right-from-bracket"></i> Exit Account</button>
        <div class="account-mail"><i class="fa-regular fa-envelope"></i>  ${userdata.usermail}</div>
        <div class="account-likes">
        <p><i class="fa-regular fa-star"></i>   Favorites Product: </p>
        <ul>
        <li><i class="fa-solid fa-star"></i>   ${userdata.userfav1}</li>
        <li><i class="fa-solid fa-star"></i>   ${userdata.userfav2}</li>
        <li><i class="fa-solid fa-star"></i>   ${userdata.userfav3}</li>
        </ul></div>
        <p style="color:darkred;"><i class="fa-solid fa-cart-shopping"></i>   My Cart</p>
        <div class="account-cart"></div> 
        </div>
        </div>
        </div>
        </div>
        </div>`
    }
    //! Giriş yapılan kullanıcının sepet bilgisini alarak My account sayfasında sepetim ...
    //! bölümünü günceller.
    static accountCartDisplay(userCartData){
      let result = "";
     result= userCartData.map((item) => {
        return `
        <div class="account-card">
        <div class="account-card-img"><img onclick=(showCart()) src="${item.imagesrc}" alt="${item.title}"></div>
        <div class="account-card-info">
        <div class="account-card-header"> ${item.title}</div>
        <div class="account-card-howmany"><i class="fas fa-hashtag"></i> x${item.howmany} piece</div>
        <div class="account-card-price"><i class="fas fa-tag"></i> ${item.price.toLocaleString("tr-TR")} TL</div>
        </div>  </div>
        `
      }).join('');
      document.getElementsByClassName("account-cart")[0].innerHTML=result;
    }
    //! Kullanıcı kaydı işlemleri validation işlemleri burada gerçekleşir.
    static signUp(){
      //! Giriş boşsa kayıt yapılmaz
      if(userName.value.trim()==="" || surname.value.trim()===""){
        loginNotifications(0,"rgba(255, 0, 0, 0.477)","red","Name and surname fields cannot be left blank.");
        return false; 
      }
      //! Şifrede En az 4 harf sınırı var.Bu şart olmassa kayıt yapılmaz
    var letterCount = password.value.replace(/[^a-zA-Z]/g, "").length;
        if (letterCount < 4) {
            loginNotifications(0,"rgba(255, 0, 0, 0.477)","red","Password must contain at least 4 letters.");
            return false; 
        }
        //! Girilen şifre daha önce kullanılmışsa kayıt yapılmaz
        if(userList.some((user)=> user.userpassword === password.value)){
          loginNotifications(0,"rgba(255, 0, 0, 0.477)","red","This password has already been used. Try another password.");
          return false; 
        }
      for(let i=0;i<checkbox.length;i++){
          if(checkbox[i].checked){
              checkedcheckboxs.push(checkbox[i].nextElementSibling.textContent);
          }  
      }
      //! Eğer sadece 3 tane favori seçilmemişse kayıt yapılmaz
      if(checkedcheckboxs.length<3 || checkedcheckboxs.length>3){
          loginNotifications(0,"rgba(255, 0, 0, 0.477)","red","Please choose just 3 favorites.");
          checkedcheckboxs=[];
          return;
      }
      //! Gizlilik şartları kabul edilmesse kayıt yapılmaz.
     if(termPolicy.checked===false){
      loginNotifications(0,"rgba(255, 0, 0, 0.477)","red","To register you must accept the privacy terms.");
      checkedcheckboxs=[];
      return ; 
     }
     //! Formun diğer şartları da var mesela email doğru formatta olması gerek.Bu olmassa kayıt olmaz.
     const form = document.getElementById('myForm');  
     if (!form.checkValidity()) {
         form.reportValidity();
         checkedcheckboxs=[];
         return;
     }
    let randomNumber=0;
    do { 
         randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
     } while (userList.forEach((item)=>{item.userid== randomNumber }));

    const newuser = new userİnfo(userName.value,surname.value,email.value,password.value,randomNumber,checkedcheckboxs[0],checkedcheckboxs[1],checkedcheckboxs[2]);
    authentication.accountDisplay(newuser);
    authentication.accountCartDisplay(newuser.usercart);
    UI.cartDisplay();
    currentUser={...newuser,userListİd:userList.length};
    userList.push(newuser);
    sessionStorage.setItem("currentData",JSON.stringify(currentUser));
    password.value="";
    email.value="";
    userName.value="";
    surname.value="";
    termPolicy.checked=false;
    checkedcheckboxs=[];
    for(let i=0;i<checkbox.length;i++){
        checkbox[i].checked=false;
    }
    loginNotifications(0,"#28a7468c","green","Registration Successful.");
    togglePasswordVisibility(password);
    togglePasswordVisibility(loginpassword);
    isLogin=true;
    showLogin();
    const userData = {
      userList,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    }
    //! Hesaba giriş işlemleri burada gerçekleşir.
    static signİn(){
      if(loginemail.value == "admin@gmail.com" && loginpassword.value == "admin1234") {
        currentUser={
          usermail:"admin@gmail.com",
          userpassword:"admin1234"
        };
        pageShow("none","none","none","block",0);
        sessionStorage.setItem("currentData",JSON.stringify(currentUser));
        loginpassword.value="";
        loginemail.value=""  ;
        UI.toast("You have successfully logged in to the admin panel.", " rgba(41, 180, 50, 0.744)","green","2px 2px 6px 4px rgb(22, 154, 112)"," rgb(123, 255, 103)");
        return;
      }
      if(userList.length==0){
        loginNotifications(1,"rgba(255, 0, 0, 0.477)","red","The information you entered is incorrect");
        return;
      }
      currentUser = userList.find(item => 
       ((item.usermail === loginemail.value) && (item.userpassword === loginpassword.value )) 
        )
      if(currentUser !== undefined){
        loginpassword.value="";
        loginemail.value=""  ;
        loginNotifications(1,"#28a7468c","green","Login Successful");
        authentication.accountDisplay(currentUser);
        authentication.accountCartDisplay(currentUser.usercart);
        cartArray=currentUser.usercart;
        currentUser={...currentUser,userListİd:userList.indexOf(currentUser)};
        cartArray.forEach((item)=>{
        price+=(item.price)*(item.howmany);
        });
        isLogin=true;
        UI.cartDisplay();
        sessionStorage.setItem("currentData",JSON.stringify(currentUser));
        showLogin();
        const userData = {
          userList,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        return;
      }
      else{
        loginNotifications(1,"rgba(255, 0, 0, 0.477)","red","The information you entered is incorrect");        
      }
    }
    //! Hesaptan çıkma işlemleri burada gerçekleşir.
    static exitAccountOperation(){
      account.innerHTML = "";
      currentUser = {};
      sessionStorage.removeItem("currentData");
      cartArray = [];
      price = 0;
      UI.cartDisplay();
      isLogin = false;
      showHome();
    }
  }
