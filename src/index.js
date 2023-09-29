"use strict";



// checkbox
function toggleCheckBox(){
    const checkboxs = document.querySelectorAll('.filter-check_checkbox');

    checkboxs.forEach((checkbox) => {
        checkbox.addEventListener("change", function() {
            if (this.checked){
                this.nextElementSibling.classList.add('checked');
            } else{
                this.nextElementSibling.classList.remove('checked');
            }
        });
    })
}

// end checkbox

// Добавление и удаление товаров
function addCart(){
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');
    const cartTotal = document.querySelector('.cart-total span');

    function showData (){
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
    
        countGoods.textContent = cardsCart.length;
    
        let sum = 0;
        cardsPrice.forEach((cardPrice) =>{
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
    
        cartTotal.textContent = sum;
    
        if (cardsCart.length !== 0){
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
    
    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();
    
            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины'
    
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            })
            
        });
    })
}
// end Добавление и удаление товаров


// открытие закрытие Корзины
function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const btnClose = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        modalCart.style.display = 'flex';
    })
    
    btnClose.addEventListener('click', () => {
        document.body.style.overflow = '';
        modalCart.style.display = '';
    })
}
// end открытие закрытие Корзины

function actionPage(){

    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');


    function filter(){
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');

            if ((min.value && price < min.value) || (price > max.value  && max.value)){
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount){
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    }


    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    // поиск
    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)){
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });

    });
}

// Получение данных с сервера
function getData(){
    const goodsWrapper = document.querySelector('.goods');

    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok){
                return response.json();
            } else {
                throw new Error ('Данные не были получены, ошибка: ' + response.status)
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px;">Упс, что-то пошло не так! :(</div>';
        });
}
// end Получение данных с сервера

// Выводим карточки товаров
function renderCards(data){
    const goodsWrapper = document.querySelector('.goods');

    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
            <div class="card">
                ${ good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : '' }
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" style="${ good.sale ? 'color: red;' : ''}">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
        `;
        goodsWrapper.appendChild(card);
    });
}

getData().then((data) => {
    renderCards(data);
    toggleCheckBox();
    actionPage();

    addCart();
    toggleCart();
});


console.log("dev");