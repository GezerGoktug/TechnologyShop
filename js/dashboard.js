

class dashboard {
  //! Mobil cihazlarda soldan açılan sidebar ile ilgili işlevler.
  static toggleSideBar() {
    const dashsidebar = document.getElementsByClassName("mobile-aside")[0];
    const toggleClick = (e) => {
      if (e.target.classList.contains("mobile-aside")) {
        dashsidebar.style.display = "none";
        dashboardToggleClick = false;
        window.removeEventListener("click", toggleClick);
      }
    };
    if (!dashboardToggleClick) {
      dashsidebar.style.display = "block";
      dashboardToggleClick = true;
      window.addEventListener("click", toggleClick);
    } else {
      dashsidebar.style.display = "none";
      dashboardToggleClick = false;
      window.removeEventListener("click", toggleClick);
    }
  }
  //! Dashboard da kullanılan silme,güncelleme ,ekleme işlevlerinin...
  //! modallarının açılıp kapanması ile ilgili işlev
  static handleDashboardModal(modal1, modal2, modal3, modal4) {
    document.getElementsByClassName("dashboard-modal")[0].style.display =
      "flex";
    document.getElementsByClassName(
      "remove-item-check-modal"
    )[0].style.display = modal1;
    document.getElementsByClassName("product-modal")[0].style.display = modal2;
    document.getElementsByClassName("user-modal")[0].style.display = modal3;
    document.getElementsByClassName(
      "add-featured-product-modal"
    )[0].style.display = modal4;
  }
  //! Dashboard modalını kapatır.
  static closeDashboardModal(e) {
    if(e)
    e.preventDefault()

    document.getElementsByClassName("dashboard-modal")[0].style.display =
      "none";
    document.getElementsByClassName(
      "remove-item-check-modal"
    )[0].style.display = "none";
    document.getElementsByClassName("product-modal")[0].style.display = "none";
    dashEvent = undefined;
    dashOpr = "";
    togglePasswordVisibility(dashUserPassword);
  }
  //! Dashboarddan çıkış işlemini yapar.Ayrıca arayüzü günceller.
  static exitDashboard() {
    sessionStorage.removeItem("currentData");
    currentUser = {};
    showHome();
    UI.display(productsList);
    UI.featuredDisplay();
  }
  //! Dashboard da data bölümü bölümünü ayarlar.
  static usersDataSection() {
    showDashboardSection("block", "none", "none", "none", "none", "none");
    const userNumber = document.getElementById("user-number");
    const productNumber = document.getElementById("product-number");
    const cartProductsNumber = document.getElementById("cart-products-number");
    let cartNumber = 0;
    userList.forEach((user) => {
      cartNumber += user.usercart.length;
    });

    userNumber.textContent = userList.length;
    productNumber.textContent = productsList.length;
    cartProductsNumber.textContent = cartNumber;
  }
  //! Dashboard da ürün listesi bölümünü ayarlar.
  static productsListSection() {
    showDashboardSection("none", "block", "none", "none", "none");
    const container = document.getElementById("product-container");
    let result = "";
    result = productsList
      .map((item) => {
        return `
            <tr>
            <td>${item.title}</td>
            <td>${item.features1}</td>
            <td>${item.features2}</td>
            <td>${item.features3}</td>
            <td>${item.features4}</td>
            <td>${item.price.toLocaleString("tr-TR")} TL</td>
            <td>${item.type}</td>
            <td><button  onclick="updateProduct(event)" data-id="${item.id}" class="dashboard-buttons update"><i class="fa-solid fa-pen"></i> Update</button></td>
            <td><button onclick="removeProduct(event)" data-id="${item.id}" class="dashboard-buttons remove"><i class="fa-solid fa-trash-can"></i> Remove</button></td>
            </tr>
            `;
      })
      .join("");
    container.innerHTML = result;
  }
  //! Dashboard da kullanıcı listesini bölümünü ayarlar.
  static userListSection() {
    showDashboardSection("none", "none", "block", "none", "none");
    const container = document.getElementById("user-container");
    let result = "";
    result = userList
      .map((item) => {
        return `
            <tr>
            <td>${item.username}</td>
            <td>${item.usersurname}</td>
            <td>${item.usermail}</td>
            <td>${item.userpassword}</td>
            <td>${item.userid}</td>
            <td>${item.userfav1} </td>
            <td>${item.userfav2} </td>
            <td>${item.userfav3} </td>
            <td><button onclick="updateUser(event)" data-id="${userList.indexOf(
              item
            )}" class="dashboard-buttons update"><i class="fa-solid fa-pen"></i> Update</button></td>
            <td><button onclick="removeUser(event)" data-id="${userList.indexOf(
              item
            )}" class="dashboard-buttons remove"><i class="fa-solid fa-trash-can"></i> Remove</button></td>
            </tr>
            `;
      })
      .join("");
    container.innerHTML = result;
  }
  //! Dashboard da öne çıkan ürünler bölümünü ayarlar
  static featuredproductsSection() {
    showDashboardSection("none", "none", "none", "block", "none");
    const container = document.getElementById("featured-container");
    let result = "";
    result = featuredProductList
      .map((item) => {
        return `
            <tr>
            <td>${item.title}</td>
            <td>${item.features1}</td>
            <td>${item.features2}</td>
            <td>${item.features3}</td>
            <td>${item.features4}</td>
            <td>${item.price.toLocaleString("tr-TR")} TL</td>
            <td>${item.type}</td>
            <td><button data-id="${item.id}" onclick="removeFeaturedProductItem(event)" class="dashboard-buttons remove"><i class="fa-solid fa-trash-can"></i> Remove</button></td>
            </tr>
            `;
      })
      .join("");
    container.innerHTML = result;
  }
  //! Ürün güncelleme modalını açar
  static updateProductItem(e) {
    dashboard.handleDashboardModal("none", "flex", "none", "none");
    document.getElementById("product-modal-header").textContent =
      "Update Product";
    if (!e.target.matches("button")) dashEvent = e.target.parentElement;
    else dashEvent = e.target;

    dashOpr = "UpdateProduct";
    const selectedProduct = productsList.find(item=>item.id == dashEvent.dataset.id);
    const imageSrc=selectedProduct.imagesrc;
    dashProductTitle.value = selectedProduct.title;
    dashProductFeatures1.value = selectedProduct.features1;
    dashProductFeatures2.value = selectedProduct.features2;
    dashProductFeatures3.value = selectedProduct.features3;
    dashProductFeatures4.value = selectedProduct.features4;
    dashProductPrice.value = selectedProduct.price;
    dashProductİmage.value =imageSrc.replace("./img/cardİmages/","");
    dashProductType.value = selectedProduct.type;
  }
  //! Ürün silme modalını açar
  static removeProductItem(e) {
    dashboard.handleDashboardModal("flex", "none", "none", "none");
    if (!e.target.matches("button")) dashEvent = e.target.parentElement;
    else dashEvent = e.target;

    dashOpr = "RemoveProduct";
  }
  //! Öne çıkan ürün silme modalını açar
  static removeFeaturedProduct(e) {
    dashboard.handleDashboardModal("flex", "none", "none", "none");
    if (!e.target.matches("button")) dashEvent = e.target.parentElement;
    else dashEvent = e.target;

    dashOpr = "RemoveFeaturedProduct";
  }
  //! Kullanıcı silme modalını acar.
  static removeUserList(e) {
    dashboard.handleDashboardModal("flex", "none", "none", "none");
    if (!e.target.matches("button")) dashEvent = e.target.parentElement;
    else dashEvent = e.target;

    dashOpr = "RemoveUser";
  }
  //! Kullanıcı güncelleme modalını açar.
  static updateUserList(e) {
    dashboard.handleDashboardModal("none", "none", "flex", "none");
    document.getElementById("user-modal-header").textContent = "Update User";
    togglePasswordVisibility(dashUserPassword);
    if (!e.target.matches("button")) dashEvent = e.target.parentElement;
    else dashEvent = e.target;

    dashOpr = "UpdateUser";
    const selectedUser = userList[Number(dashEvent.dataset.id)];
    dashUserName.value = selectedUser.username;
    dashUserSurName.value = selectedUser.usersurname;
    dashUserMail.value = selectedUser.usermail;
    dashUserPassword.value = selectedUser.userpassword;
    dashUserFav1.value = selectedUser.userfav1;
    dashUserFav2.value = selectedUser.userfav2;
    dashUserFav3.value = selectedUser.userfav3;
  }
  //! Öne çıkan ürün ekleme modalını açar
  static addFeaturedProduct() {
    dashboard.handleDashboardModal("none", "none", "none", "block");
    document.getElementById("featured-product-modal-header").textContent =
      "Add Featured Product";
    let unselectedFeaturedProducts = productsList.filter((product) => {
      return !featuredProductList.some((item) => item.id === product.id);
    });
    let result = "";
    unselectedFeaturedProducts.forEach((item) => {
      result += `
            <div class="dash-card">
            <img src="${item.imagesrc}" alt="${item.title}">
            <div class="dash-card-title">
              <h3>${item.title}</h3>
              <p>${item.price.toLocaleString("tr-TR")} TL</p>
              <div class="confirm-buttons">
                <button onclick="dashboard.dashboardOperations(event)" data-id="${item.id}" class="confirm-add"><i class="fa-solid fa-plus"></i>Ekle</button>
              </div>
            </div>
            </div>
            
            `;
    });
    document.getElementsByClassName("add-featured-container")[0].innerHTML =
      result;

    dashOpr = "AddFeaturedProduct";
  }
  //! Ürün ekleme modalını açar
  static addProduct() {
    dashboard.handleDashboardModal("none", "flex", "none", "none");
    document.getElementById("product-modal-header").textContent = "Add Product";

    dashOpr = "AddProduct";
    dashProductTitle.value = "";
    dashProductFeatures1.value = "";
    dashProductFeatures2.value = "";
    dashProductFeatures3.value = "";
    dashProductFeatures4.value = "";
    dashProductPrice.value = 0;
    dashProductİmage.value = "";
    dashProductType.value = "telephones";
  }
  //! Kullanıcı ekleme modalını açar.
  static addUser() {
    dashboard.handleDashboardModal("none", "none", "flex", "none");
    document.getElementById("user-modal-header").textContent = "Add User";
    togglePasswordVisibility(dashUserPassword);

    dashOpr = "AddUser";
    dashUserName.value = "";
    dashUserSurName.value = "";
    dashUserMail.value = "";
    dashUserPassword.value = "";
    dashUserFav1.value = "Telephones";
    dashUserFav2.value = "Telephones";
    dashUserFav3.value = "Telephones";
  }
  //! Dashboard daki ekleme ,silme güncelleme işlemlerini yönetir.
  static dashboardOperations(event) {
    if (dashEvent == undefined) {
      if (event.target.matches("button")) dashEvent = event.target;
      else dashEvent = event.target.parentElement;
    }

    const selectedProduct = productsList.find(item=>item.id == dashEvent.dataset.id);
    const selectedUser = userList[Number(dashEvent.dataset.id)];
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const fileExtensionRegex = /\.png$/i;
    let prefix="./img/cardİmages/";
    event.preventDefault();
    if (dashOpr == "UpdateUser" || dashOpr == "AddUser") {
      if (
        dashUserName.value.trim() === "" ||
        dashUserSurName.value.trim() === ""
      ) {
        loginNotifications(
          2,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "Name and surname fields cannot be left blank."
        );
        return false;
      }
      var letterCount = dashUserPassword.value.replace(/[^a-zA-Z]/g, "").length;
      if (letterCount < 4) {
        loginNotifications(
          2,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "Password must contain at least 4 letters."
        );
        return false;
      }
      if(dashOpr == "AddUser"){
        if(userList.some((user)=> user.userpassword === dashUserPassword.value)){
          loginNotifications(2,"rgba(255, 0, 0, 0.477)","red","This password has already been used. Try another password.");
          return false; 
        }
      }
      else{
        if(selectedUser.userpassword != dashUserPassword.value){
          if(userList.some((user)=> user.userpassword === dashUserPassword.value)){
            loginNotifications(2,"rgba(255, 0, 0, 0.477)","red","This password has already been used. Try another password.");
            return false; 
          }
        }
      }
      if (
        dashUserFav1.value == dashUserFav2.value ||
        dashUserFav3.value == dashUserFav2.value ||
        dashUserFav1.value == dashUserFav3.value
      ) {
        loginNotifications(
          2,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "Favorites must be different from each other"
        );
        return false;
      }

      const form = document.getElementById("dash-user-form");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
    } 
    else if (dashOpr == "UpdateProduct" || dashOpr == "AddProduct") {
      if (dashProductTitle.value.trim() === "") {
        loginNotifications(
          3,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "Product Title fields cannot be left blank."
        );
        return false;
      }
      if (
        dashProductFeatures1.value.trim() === "" ||
        dashProductFeatures2.value.trim() === "" ||
        dashProductFeatures3.value.trim() === "" ||
        dashProductFeatures4.value.trim() === ""
      ) {
        loginNotifications(
          3,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "Product Features fields cannot be left blank."
        );
        return false;
      }
      if (+dashProductPrice.value < 1000) {
        loginNotifications(
          3,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "Product Price cannot be less than 1000"
        );
        return false;
      }
      if (dashProductİmage.value.trim() == "") {
        loginNotifications(
          3,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "Product Image Source fields cannot be left blank."
        );
        return false;
      }
      if (
        !urlRegex.test(dashProductİmage.value) &&
        !fileExtensionRegex.test(dashProductİmage.value)
      ) {
        loginNotifications(
          3,
          "rgba(255, 0, 0, 0.477)",
          "red",
          "The image format must be either an http url or a .png file."
        );
        return false;
      }

      const form = document.getElementById("dash-product-form");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
    }
    switch (dashOpr) {
      //! Ürün güncelleme yapar.Aynı zamanda öne çıkan ürünlerde bu ürün varsa...
      //! o ürünüde günceller.Kullanıcıların sepetinde bu ürün varsa onuda günceller.
      case "UpdateProduct":
        if(urlRegex.test(dashProductİmage.value))
          prefix="";

        selectedProduct.title = dashProductTitle.value;
        selectedProduct.features1 = dashProductFeatures1.value;
        selectedProduct.features2 = dashProductFeatures2.value;
        selectedProduct.features3 = dashProductFeatures3.value;
        selectedProduct.features4 = dashProductFeatures4.value;
        selectedProduct.price = Number(dashProductPrice.value);
        selectedProduct.imagesrc = `${prefix}${dashProductİmage.value}`;
        selectedProduct.type = dashProductType.value;
        featuredProductList.forEach((item) => {
          if (item.id == selectedProduct.id) {
            Object.assign(item, selectedProduct);
          }
        });
        userList.forEach((user) => {
          user.usercart.forEach((product) => {
            if (product.id === selectedProduct.id) {
              Object.assign(product, selectedProduct);
            }
          });
        });
        UI.toast(
          "The product has been updated successfully",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        dashboard.productsListSection();
        dashboard.closeDashboardModal();
        break;
      //! Seçilen ürünü siler.Ayrıca öne çıkan ürünlerde bu ürün varsa bu ürünü siler.
      //! Kullanıcıların sepetinde bu ürün varsa onuda siler.
      case "RemoveProduct":
        productsList.splice(productsList.indexOf(selectedProduct), 1);
        featuredProductList.forEach((item,index)=>{
          if(item.id == selectedProduct.id ){
            featuredProductList.splice(index,1);
            }
        });
        userList.forEach((user) => {
          user.usercart.forEach((product, index) => {
            if (product.id === selectedProduct.id) {
              user.usercart.splice(index, 1);
            }
          });
        });
        UI.toast(
          "The product was successfully removed",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        dashboard.productsListSection();
        dashboard.closeDashboardModal();

        break;
      //! Seçilen Kullanıcının bilgilerini günceller.
      case "UpdateUser":
        selectedUser.username = dashUserName.value;
        selectedUser.usersurname = dashUserSurName.value;
        selectedUser.usermail = dashUserMail.value;
        selectedUser.userpassword = dashUserPassword.value;
        selectedUser.userfav1 = dashUserFav1.value;
        selectedUser.userfav2 = dashUserFav2.value;
        selectedUser.userfav3 = dashUserFav3.value;
        UI.toast(
          "The user has been updated successfully",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        dashboard.userListSection();
        dashboard.closeDashboardModal();
        break;
      //! Seçilen kullanıcıyı siler.
      case "RemoveUser":
        userList.splice(Number(dashEvent.dataset.id), 1);
        dashboard.userListSection();
        dashboard.closeDashboardModal();
        UI.toast(
          "The user was successfully removed",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        break;
      //! Öne çıkan ürünlerde olmayan ürünler arasında seçilen ürünü öne çıkan ürünlere ekler.
      case "AddFeaturedProduct":
        featuredProductList.push(selectedProduct);
        dashboard.featuredproductsSection();
        dashboard.closeDashboardModal();
        UI.toast(
          "The featured product has been updated successfully",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        break;
      //! Seçilen öne çıkan ürünü siler
      case "RemoveFeaturedProduct":
        featuredProductList.forEach((item,index)=>{
          if(item.id === selectedProduct.id)
          featuredProductList.splice(index, 1);
        })
        dashboard.featuredproductsSection();
        dashboard.closeDashboardModal();
        UI.toast(
          "The featured product was successfully removed",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        break;
      //! Yeni ürün ekler.
      case "AddProduct":
        if(urlRegex.test(dashProductİmage.value))
          prefix="";
  
        const newProduct = new products(
          dashProductTitle.value,
          dashProductFeatures1.value,
          dashProductFeatures2.value,
          dashProductFeatures3.value,
          dashProductFeatures4.value,
          Number(dashProductPrice.value),
          `${prefix}${dashProductİmage.value}`,
          dashProductType.value
        );
        productsList.push(newProduct);
        const maxId = productsList.length > 0 ? Math.max(...productsList.map(product => product.id)) : 0;
        newProduct.id = maxId + 1;
        dashboard.productsListSection();
        dashboard.closeDashboardModal();
        UI.toast(
          "Product added successfully",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        break;
      //! Yeni kullanıcı ekler.    
      case "AddUser":
        let randomNumber = 0;
        do {
          randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
        } while (
          userList.forEach((item) => {
            item.userid == randomNumber;
          })
        );
        const newUser = new userİnfo(
          dashUserName.value,
          dashUserSurName.value,
          dashUserMail.value,
          dashUserPassword.value,
          randomNumber,
          dashUserFav1.value,
          dashUserFav2.value,
          dashUserFav3.value
        );
        userList.push(newUser);
        dashboard.userListSection();
        dashboard.closeDashboardModal();
        UI.toast(
          "User added successfully",
          " rgba(41, 180, 50, 0.744)",
          "green",
          "2px 2px 6px 4px rgb(22, 154, 112)",
          " rgb(123, 255, 103)"
        );
        break;
    }
    const updatedProductList = {
      productsList,
      featuredProductList,
    };
    const userData = {
      userList,
    };
    localStorage.setItem(
      "updatedProductList",
      JSON.stringify(updatedProductList)
    );
    localStorage.setItem("userData", JSON.stringify(userData));
  }
}
