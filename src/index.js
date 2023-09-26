"use strict";

// Элементы

const checkboxs = document.querySelectorAll('.filter-check_checkbox');
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const countGoods = document.querySelector('.counter');

// Функции

function showData (){
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
}

// Обработчики
// checkbox
checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("change", function() {
        if (this.checked){
            this.nextElementSibling.classList.add('checked');
        } else{
            this.nextElementSibling.classList.remove('checked');
        }
    });
})
// end checkbox


// Корзина
btnCart.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    modalCart.style.display = 'flex';
})

btnClose.addEventListener('click', () => {
    document.body.style.overflow = '';
    modalCart.style.display = '';
})
// end Корзина

// Добавление, удаление товаров

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove()
        showData();
    });
})
// end Добавление, удаление товаров

// Вызов функций

console.log("dev");