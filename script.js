const cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.previousElementSibling.previousElementSibling.innerText;
        const productPrice = parseFloat(e.target.previousElementSibling.innerText.replace('$', ''));
        cart.push({ name: productName, price: productPrice });
        console.log(cart);
        alert(`${productName} added to cart`);
    });
});