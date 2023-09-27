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

    discountCheckbox.addEventListener('click', () => {
        cards.forEach((card) => {
            if (discountCheckbox.checked){
                if (!card.querySelector('.card-sale')){
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });
}

addCart();
toggleCheckBox();
toggleCart();
actionPage();

console.log("dev");