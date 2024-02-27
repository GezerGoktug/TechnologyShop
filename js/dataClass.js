//! Sepetteki ürünlerle ilgili bilgiler ve kayıt olan kullanıcılar ile ilgili bilgileri tasıyan
//! Ve ek olarak one cıkan urunlerın verilerini tasıyan nesne ve dizi atamaları.

class products {
    constructor(title,features1,features2,features3,features4,price,imagesrc,type) {
      this.title = title;
      this.features1 = features1;
      this.features2 = features2;
      this.features3 = features3;
      this.features4 = features4;
      this.price = price;
      this.imagesrc = imagesrc;
      this.type = type;
      this.id = 0;
    }
  }
class userİnfo{
    constructor(username,usersurname,usermail,userpassword,userid,userfav1,userfav2,userfav3){
        this.username=username
        this.usersurname=usersurname
        this.usermail=usermail
        this.userpassword=userpassword
        this.userid=userid
        this.userfav1=userfav1
        this.userfav2=userfav2
        this.userfav3=userfav3
        this.usercart=[]
    }
  }
const adminContact={
  telephones:"+90 123 456 7890",
  mail:"info@example.com"
};

let productsList = [
     new products("Iphone 15 Pro Max","256 GB","48MP Camera","A17 Pro","4422 mAH",75000,"./img/cardİmages/iphone15promax-removebg-preview.png","telephones"),
     new products("Iphone 15 Pro ","256 GB","48MP Camera","A17 Pro","3274 mAH",71000,"./img/cardİmages/iphone15pro-removebg-preview.png","telephones"),
     new products("Iphone 15 ","256 GB","48MP Camera","A16 Bionic","3349 mAH",51000,"./img/cardİmages/iphone15-removebg-preview.png","telephones"),
     new products("Iphone 14 Pro Max","256 GB","48MP Camera","A16 Bionic","4323 mAH",70000,"./img/cardİmages/iphone14promax-removebg-preview.png","telephones"),
     new products("Iphone 14 ","128 GB","12MP Camera","A15 Bionic","3279 mAH",45000,"./img/cardİmages/iphone14-removebg-preview.png","telephones"),
     new products("Iphone 13 Pro Max","128 GB","12MP Camera","A15 Bionic","4352 mAH",60000,"./img/cardİmages/iphone13promax-removebg-preview.png","telephones"),
     new products("Iphone 13 ","128 GB","12MP Camera","A15 Bionic","3227 mAH",37000,"./img/cardİmages/iphone13-removebg-preview.png","telephones"),
     new products("Iphone 12 ","128 GB","12MP Camera","A14 Bionic","2815 mAH",27000,"./img/cardİmages/iphone12-removebg-preview.png","telephones"),
     new products("Iphone 11 ","128 GB","12MP Camera","A13 Bionic","3110 mAH",25000,"./img/cardİmages/iphone11-removebg-preview.png","telephones"),
     new products("Samsung Galaxy Tab S8","128 GB","13MP Camera","Qualcomm Snapdragon 8 Gen 1 (SM8450)","8000 mAH",18000,"./img/cardİmages/samsunggalaxytabs8-removebg-preview.png","tablet"),
     new products("Samsung Galaxy Tab S9","512 GB","13MP Camera","Qualcomm Snapdragon 8 Gen 2 (SM8550-AB)","11200 mAH",26000,"./img/cardİmages/samsungtabs9-removebg-preview.png","tablet"),
     new products("Apple Ipad 9 Tablet","64 GB","8MP Camera","A13 Bionic","8557 mAH",14000,"./img/cardİmages/ipad9-removebg-preview.png","tablet"),
     new products("Apple Ipad Pro 11 Tablet","1024 GB","12MP Camera","Apple M1 Çip","7538 mAH",35000,"./img/cardİmages/ipadpro11-removebg-preview.png","tablet"),
     new products("JBL Tune 700 BT","27 hours using","Wireless","102 dB precision","Stereo",1200,"./img/cardİmages/jbltune700bt-removebg-preview.png","headphones"),
     new products("Apple Airpods 3","6 hours using","Wireless","5.0 Bluetooth","Stereo",5300,"./img/cardİmages/appleairpods3-removebg-preview.png","headphones"),
     new products("Apple Airpods 2 Pro","6 hours using","Wireless","5.3 Bluetooth","Stereo",7000,"./img/cardİmages/appleairpods2pro-removebg-preview.png","headphones"),
     new products("Apple Airpods 2","5 hours using","Wireless","5.0 Bluetooth","Stereo",4000,"./img/cardİmages/appleairpods2-removebg-preview.png","headphones"),
     new products("LG Ultra HD 4K TV",'77" screen',"OLED Screen","Ultra HD 4K","40W Sound",140000,"./img/cardİmages/lgultrahd4K-removebg-preview.png","TV"),
     new products("Samsung Ultra HD 8K TV",'98" screen',"LED Screen","Ultra HD 8K","120W Sound",470000,"./img/cardİmages/samsungultrahd8K-removebg-preview.png","TV"),
     new products("Apple Watch Series 8",'32 GB',"352x430 piksel","Apple S8","41 mm",8500,"./img/cardİmages/applewatch8-removebg-preview.png","watch"),
     new products("Apple Watch SE 2",'32 GB',"368x448 piksel","Apple S8 ","44 mm",10000,"./img/cardİmages/applewatchse2-removebg-preview.png","watch"),
     new products("Apple Watch Ultra 2",'1.92" screen',"338 PPI","Apple S9 SIP","49 mm",42000,"./img/cardİmages/applewatchultra2-removebg-preview.png","watch"),
     new products("Apple Watch Series 9",'1.9" screen',"326 PPI","Apple S9 SIP","45 mm",15000,"./img/cardİmages/applewatchseries9-removebg-preview.png","watch"),
     new products("Apple Watch Ultra","32 GB","410x502 piksel","Apple S8","49 mm",28000,"./img/cardİmages/applewatchultra-removebg-preview.png","watch"),
     new products('Apple Macbook Air 13.3"',"512 GB","2560 x 1600 Piksel","Apple M1 ","8GB RAM",45000,"./img/cardİmages/macbookair13-removebg-preview.png","laptop"),
     new products('Apple Macbook Pro 14.2"',"512 GB","3024 x 1964 Piksel","Apple M3 Pro","18GB RAM",75000,"./img/cardİmages/macbookpro14-removebg-preview.png","laptop"),
   ];
let featuredProductList=[
    productsList[0],
    productsList[1],
    productsList[2],
    productsList[3],
    productsList[11],
    productsList[16],
    productsList[18],
    productsList[19],
    productsList[22],
    productsList[23],
    productsList[25],
  ];