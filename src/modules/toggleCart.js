export default function toggleCart() {
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