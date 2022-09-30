var moDal = document.querySelector('.modal');
var logIn = document.querySelector('.auth-from.dangnhap');
var logCreat = document.querySelector('.auth-from.dangki');
var logIcon = document.querySelectorAll('.header__navbar-item--bold');
var switchLog = document.querySelectorAll('.auth-from__switch-heading');
var  cartList = document.querySelectorAll('.header__cart-item')


lengthCart = cartList.length
logIcon[0].onclick = function(){
    moDal.style.display = 'flex';
    logCreat.style.display = "block";
}
logIcon[1].onclick = function(){
    moDal.style.display = 'flex';
    logIn.style.display = "block";
}
switchLog[0].onclick = function(){
    moDal.style.display = 'flex';
    logCreat.style.display="none";
    logIn.style.display = "block";
}
switchLog[1].onclick = function(){
    moDal.style.display = 'flex';
    logIn.style.display = "none";
    logCreat.style.display = "block";
}

document.querySelector('.app__cart').style.display = 'none'
document.querySelector('.app__container').style.display = 'block'


document.querySelector('.header__navbar-item.header__navbar-user').style.display ='none'
document.querySelector('.header__cart-list').classList.add('header__cart-nocart')
document.querySelector('.header__cart-heading').classList.add('hide')
document.querySelector('.header__cart-list-item').classList.add('hide')
document.querySelector('.header__cart-view-cart').classList.add('hide')
document.querySelector('.header__cart-numbercart').innerText = 0
var backBtn = document.querySelectorAll('.auth-form__button-ctl-back');

 
for( var i =0; i<2 ;i++){
    backBtn[i].onclick = function(){
        moDal.style.display = 'none';
        logIn.style.display = "none";
        logCreat.style.display = "none";
    }
}

var searchInput = document.querySelector('.header__search-input');

// var historyText = document.querySelector('.header__search-history-item')
// historyText.onclick = function(){
//     searchInput.value = historyText.innerText
// }


var clickSearch = document.querySelector('.header__search-find')
clickSearch.onclick = function(){
    var historyList = document.querySelector('.header__search-history-list')
    var newHistory = document.createElement('li')
    newHistory.classList.add('header__search-history-item')
    newHistory.innerHTML = `<a href="" class="">${searchInput.value}</a>`
    historyList.prepend(newHistory)
    // searchInput.addEventListener('input', function(e){
        let txtSearch = searchInput.value.trim().toLowerCase()
        let nameProduct = document.querySelectorAll('.grid__collum-2-4.product');
        var length = nameProduct.length
        var noProduct = document.querySelector('.no-product')
        nameProduct.forEach(function(item){
            if (item.innerText.toLowerCase().includes(txtSearch)){
                item.classList.remove('hide')
                noProduct.classList.add('hide')
            }
            else{
                item.classList.add('hide')
                length--
            }

            if (length < 16 ){
                document.querySelector('.pagination.home-product__pagination').classList.add('hide')
            }

            if ( length <1 ){
                noProduct.classList.remove('hide')
            }
        })
    // })
}



var isLogin = false;


function Validator(options){
    var formElement = document.querySelectorAll(options.form)
    for(var i=0; i<formElement.length; i++){
        if (formElement[i]){
            options.rules.forEach(function (rule){
                var inputElement = formElement[i].querySelector(rule.selector)
                var errorElement = inputElement.parentElement.querySelector('.form-message')

                        if(inputElement){
                            inputElement.onblur = function () {
                                var errorMsg =rule.test(inputElement.value) 
                                if ( errorMsg){
                                    errorElement.style.display = 'block'
                                }else{
                                    errorElement.style.display = 'none'
                                }
                            }
                        }
             })
                
        }
    }

}

Validator.isRequired = function (selector){
    return{
        selector : selector,
        test: function(value){
            return value.trim() ? undefined : 'vui long nhap truong nay'
        }
    }
}

Validator({
    form : '.auth-form__form',
    rules: [
        Validator.isRequired('#phone-number'),
    ]
})

Validator({
    form : '.auth-form__gr-psw',
    rules: [
        Validator.isRequired('#password'),
    ]
})





function Account(sdt, pass){
    this.sdt = sdt;
    this.pass = pass;
}
var acc = new Array();
acc[0] = new Account('1', '1')
var indexAcc = 1;


var clickSign = document.getElementById('register')
clickSign.onclick = function(){
    var yourPsw = document.querySelector('.auth-form__input--yourpsw')
    var cfPsw = document.querySelector('.auth-form__input--cfpsw')
    var phoneNum = document.querySelector('.phone-number--register')
    var checkPhone = false
    for(var i=0 ; i < indexAcc; i++){
        if(phoneNum.value === acc[i].sdt){
            checkPhone = true
            break
        }
    }

    if (checkPhone){
        document.querySelector('.form-message--Errphone').style.display = 'block'

    }else{
        if (yourPsw.value === cfPsw.value){
            document.querySelector('.form-message--Errphone').style.display = 'none'
            document.querySelector('.form-message--psw').style.display = 'none'
            acc[indexAcc] = new Account(phoneNum.value, yourPsw.value)
            indexAcc++ 
            Regis()
            // luu , chuyen sang dang nhap
        } else{
            document.querySelector('.form-message--psw').style.display = 'block'
        }
    }

}

var Regis = function() {
    alert('Đăng kí thành công')
    moDal.style.display = 'flex';
    logCreat.style.display="none";
    logIn.style.display = "block";
}

var clickLogin = document.getElementById('LogIn')
clickLogin.onclick = function(){
    var yourPsw = document.querySelector('.auth-form__input--pswLogin')
    var phoneNum = document.querySelector('.phone-number--login')
    var check = false
    var iACC
    for(var i=0 ; i < indexAcc; i++){
        if(phoneNum.value === acc[i].sdt && yourPsw.value === acc[i].pass){
            iACC = i
            check = true
            break
        }

    }
    
    if (check){
        document.querySelector('.form-message--Erracc').style.display = 'none'
        isLogin = true
        alert('Đăng nhập thành công')
        moDal.style.display = 'none';
        logCreat.style.display="none";
        logIn.style.display = "none";
        checkCart();
        document.querySelectorAll('.header__navbar-item--bold')[0].style.display = 'none'
        document.querySelectorAll('.header__navbar-item--bold')[1].style.display = 'none'

        document.querySelector('.header__navbar-item.header__navbar-user').style.display ='block'
        document.querySelector('.header__navbar-user-name').innerHTML = acc[iACC].sdt
         // dang nhap
    }else{
        document.querySelector('.form-message--Erracc').style.display = 'block'
    }

}
var hideCart = function(){
    document.querySelector('.header__cart-list').classList.add('header__cart-nocart')
    document.querySelector('.header__cart-heading').classList.add('hide')
    document.querySelector('.header__cart-list-item').classList.add('hide')
    document.querySelector('.header__cart-view-cart').classList.add('hide')
    document.querySelector('.header__cart-numbercart').innerText = 0
}
var unHidecart = function(){
    document.querySelector('.header__cart-list').classList.remove('header__cart-nocart')
    document.querySelector('.header__cart-heading').classList.remove('hide')
    document.querySelector('.header__cart-list-item').classList.remove('hide')
    document.querySelector('.header__cart-view-cart').classList.remove('hide')
    document.querySelector('.header__cart-numbercart').innerText = lengthCart
}


var checkCart = function(){
    if(lengthCart > 0  && isLogin){
        unHidecart()
    }else{
        hideCart()
    }
}




var itemAdd = function(){
var addItem = document.querySelectorAll('.home-product-item')
var cart = document.querySelector('.header__cart-list-item')
for (var i=0 ; i< addItem.length; i++){
    addItem[i].onclick = function(){
        var dsCart = cart.querySelectorAll('.header__cart-item-name')
        console.log('add')
        if (isLogin){
        var tmp =false
        for(var j=0; j < dsCart.length; j++)
        {
            if (this.querySelector('.home-product-item__name').innerText.trim().toLowerCase() == dsCart[j].innerText.trim().toLowerCase()){
                dsCart[j].parentElement.querySelector('.header__cart-item-x-number').innerHTML++
                var numProduct = dsCart[j].parentElement.querySelector('.header__cart-item-x-number').innerHTML
                var pricee = dsCart[j].parentElement.querySelector('.header__cart-item-price').innerHTML.toString().slice(0, -2)
                dsCart[j].parentElement.querySelector('.header__cart-item-price').innerHTML = (pricee*numProduct/(numProduct-1)).toFixed(3)+' đ'
                tmp =true
            }
        }
        if(tmp){
            
        }else{
            var namePr = this.querySelector('.home-product-item__name').innerText
            var img = this.querySelector('.home-product-item__img').style.backgroundImage.toString().slice( 4, -1)
            var price = this.querySelector('.home-product-item__price-now').innerText
            document.querySelector('.header__cart-list').classList.remove('header__cart-nocart')
            document.querySelector('.header__cart-heading').classList.remove('hide')
            document.querySelector('.header__cart-list-item').classList.remove('hide')
            document.querySelector('.header__cart-view-cart').classList.remove('hide')
            document.querySelector('.header__cart-numbercart').innerText++
        
            var newItem = document.createElement('li')
            newItem.classList.add('header__cart-item')
            newItem.innerHTML=`<img src=${img} alt="" class="header__cart-img">
            <div class="header__cart-item-info">
                <div class="header__cart-item-head">
                    <h5 class="header__cart-item-name">${namePr}</h5>
                    <div class="header__cart-item-price-warp">
                    <span class="header__cart-item-price">${price}</span>
                    <span class="header__cart-item-x">x</span>
                    <span class="header__cart-item-x-number">1</span>
                    </div>
                </div>
                <div class="header__cart-item-body">
                    <span class="header__cart-item-description">
                        Phân loại: Không kèm CD
                    </span>
                    <span class="header__cart-item-remove">
                        <i class="fa-regular fa-trash-can"></i>                                                   
                        </span>
                </div>
            </div>`
            cart.prepend(newItem)
        }
        itemRemove()
        btnCartt()
    }
}
}
}

var itemRemove = function(){
    var nodeDel = document.querySelectorAll('.header__cart-item-remove')

    for (var i = 0; i<nodeDel.length; i++)
    {
        nodeDel[i].onclick = function(){
            this.parentElement.parentElement.parentElement.remove()
            document.querySelector('.header__cart-numbercart').innerText--
            if(document.querySelector('.header__cart-numbercart').innerText == 0){
                hideCart()
            }
        }
    }


}
itemRemove()
itemAdd()

var btnCartt = function(){


var btnCart = document.querySelector('.header__cart-view-cart')
btnCart.onclick = function(){
    document.querySelector('.app__cart').style.display = 'block'
    document.querySelector('.app__container').style.display = 'none'
    var listtCart = document.querySelectorAll('.header__cart-item')

    var itemOld = document.querySelectorAll('.app__cart-product-list-item')
    if(itemOld.length != 0){
        for( var i=0 ; i<itemOld.length ; i++){
            itemOld[i].style.display = 'none'
        }
    }
    var tongtien = 0
    for( var i=0; i<listtCart.length; i++){
        var namee = listtCart[i].querySelector('.header__cart-item-name').innerText
        var priceee = listtCart[i].querySelector('.header__cart-item-price').innerText.slice(0,-2)
        var imgg = listtCart[i].querySelector('.header__cart-img').src
        var sl = listtCart[i].querySelector('.header__cart-item-x-number').innerText
        var totalPr = (priceee*sl).toFixed(3)
        var newItem = document.createElement('li')
        tongtien += parseInt(totalPr)
        newItem.classList.add('app__cart-product-list-item')
        newItem.innerHTML=`<img src="${imgg}" alt="" class="app__cart-product-img">
        <div class="app__cart-product-info">
            <span class="app__cart-product-name">${namee}</span>
            <div class="app__cart-product-price">
                <span class="app__cart-product-price-now">${priceee} đ</span>
            </div>
        </div>
        <div class="app__cart-product-icon">
            <div class="app__cart-product-change">
                <a class="app__cart-product--">
                    <i class="app__cart-product---icon fa-solid fa-minus"></i>
                </a>
                <span class="app__cart-product-num">${sl}</span>
                <a class="app__cart-product---">
                    <i class="app__cart-product---icon fa-solid fa-plus"></i>
                </a>
            </div>
            <span class="app__cart-product-pricee">${totalPr} đ</span>
            <div class="app__cart-product-delete">
                <i class="app__cart-product-delete-icon fa-solid fa-trash-can"></i>
            </div>
        </div>`
        document.querySelector('.app__cart-product-list').prepend(newItem)

        
        
    }
    document.querySelector('.app__cart-payment-total-money').innerText=tongtien.toFixed(3)+' đ'
    document.querySelector('.app__cart-payment-total-vat-money').innerText=tongtien.toFixed(3)+' đ' 

    remmoveCart()
 



}
}

var clickPlus  = function(){
    var plus = document.querySelectorAll('.app__cart-product---')
    for(var i=0 ; i< plus.length ; i++){
        plus[i].onclick = function(){
            this.parentElement.querySelector('.app__cart-product-num').innerText++
            
            var headerCartitem = document.querySelectorAll('.header__cart-item')
            for(var j=0 ; j<headerCartitem.length; j++){
                if(this.parentElement.parentElement.parentElement.querySelector('.app__cart-product-name').innerText == 
                headerCartitem[j].querySelector('.header__cart-item-name').innerText){
                    headerCartitem[j].querySelector('.header__cart-item-x-number').innerText++
                }
            }

            var afterTong = parseInt(this.parentElement.parentElement.querySelector('.app__cart-product-pricee').innerText.slice(0,-2)) + 
            parseInt(this.parentElement.parentElement.parentElement.querySelector('.app__cart-product-price-now').innerText.slice(0,-2))
            this.parentElement.parentElement.querySelector('.app__cart-product-pricee').innerText = afterTong.toFixed(3)+ ' đ'

            var afterTong2 = parseInt(document.querySelector('.app__cart-payment-total-money').innerText.slice(0,-2)) + 
            parseInt(this.parentElement.parentElement.parentElement.querySelector('.app__cart-product-price-now').innerText.slice(0,-2))

            document.querySelector('.app__cart-payment-total-money').innerText = afterTong2.toFixed(3) +' đ'
            document.querySelector('.app__cart-payment-total-vat-money').innerText = afterTong2.toFixed(3) + ' đ'
        }

    }
}
var clickMinus  = function(){
    var plus = document.querySelectorAll('.app__cart-product--')
    for(var i=0 ; i< plus.length ; i++){
        plus[i].onclick = function(){
            if(this.parentElement.querySelector('.app__cart-product-num').innerText > 1){
                this.parentElement.querySelector('.app__cart-product-num').innerText--
                var headerCartitem = document.querySelectorAll('.header__cart-item')

                for(var j=0 ; j<headerCartitem.length; j++){
                    if(this.parentElement.parentElement.parentElement.querySelector('.app__cart-product-name').innerText == 
                    headerCartitem[j].querySelector('.header__cart-item-name').innerText){
                        headerCartitem[j].querySelector('.header__cart-item-x-number').innerText--
                    }
                }
                var afterTong = parseInt(this.parentElement.parentElement.querySelector('.app__cart-product-pricee').innerText.slice(0,-2)) - 
                parseInt(this.parentElement.parentElement.parentElement.querySelector('.app__cart-product-price-now').innerText.slice(0,-2))
                this.parentElement.parentElement.querySelector('.app__cart-product-pricee').innerText = afterTong.toFixed(3)+ ' đ'

                var afterTong2 = parseInt(document.querySelector('.app__cart-payment-total-money').innerText.slice(0,-2)) - 
                parseInt(this.parentElement.parentElement.parentElement.querySelector('.app__cart-product-price-now').innerText.slice(0,-2))

                document.querySelector('.app__cart-payment-total-money').innerText = afterTong2.toFixed(3) +' đ'
                document.querySelector('.app__cart-payment-total-vat-money').innerText = afterTong2.toFixed(3) + ' đ'
            }
        }
    }
}




var remmoveCart =function(){
    var nodeDelete = document.querySelectorAll('.app__cart-product-delete')
    var cartDelete = document.querySelectorAll('.header__cart-item')
    for (var i=0; i< nodeDelete.length ; i++){
        nodeDelete[i].onclick = function() {

            for(var j=0 ; j<cartDelete.length; j++){
                if(this.parentElement.parentElement.querySelector('.app__cart-product-name').innerText == 
                cartDelete[j].querySelector('.header__cart-item-name').innerText){
                    // cartDelete[j].style.display = 'none'
                    cartDelete[j].remove()
                    document.querySelector('.header__cart-numbercart').innerText--
                    if(document.querySelector('.header__cart-numbercart').innerText == 0){
                        hideCart()
                    }
                }
            }

            console.log(i)
            // this.parentElement.parentElement.style.display = 'none'
            this.parentElement.parentElement.remove()
            var totalAfter = parseInt(document.querySelector('.app__cart-payment-total-vat-money').innerText.slice(0,-2)) - parseInt(this.parentElement.querySelector('.app__cart-product-pricee').innerText.slice(0,-2))
            document.querySelector('.app__cart-payment-total-money').innerText=totalAfter.toFixed(3)+' đ'
            document.querySelector('.app__cart-payment-total-vat-money').innerText=totalAfter.toFixed(3)+' đ'
            
            
        }
    }
    document.querySelector('.app__cart-back-btn').onclick = function(){
        document.querySelector('.app__cart').style.display = 'none'
        document.querySelector('.app__container').style.display = 'block'
    }
    clickPlus()
    clickMinus()
}

