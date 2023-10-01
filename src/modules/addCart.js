export default function addCart(){
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