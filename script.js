document.addEventListener("DOMContentLoaded", () => {
  const CART_KEY = "demo_cart_count";

  function getStoredCartCount() {
    try {
      const value = localStorage.getItem(CART_KEY);
      return value ? Number(value) : 0;
    } catch (err) {
      return 0;
    }
  }

  function setStoredCartCount(count) {
    try {
      localStorage.setItem(CART_KEY, String(count));
    } catch (err) {
      // ignore
    }
  }

  function findCartLink() {
    const navLinks = document.querySelectorAll("nav a");
    for (const link of navLinks) {
      if (link.textContent && link.textContent.trim().toLowerCase().startsWith("cart")) {
        return link;
      }
    }
    return null;
  }

  let cartCount = getStoredCartCount();
  const cartLink = findCartLink();
  const countSpan = document.createElement("span");
  countSpan.id = "cart-count";
  countSpan.style.marginLeft = "4px";

  function renderCartText() {
    if (!cartLink) return;
    const base = "Cart";
    countSpan.textContent = `(${cartCount})`;
    if (!cartLink.contains(countSpan)) {
      cartLink.appendChild(countSpan);
    }
    cartLink.setAttribute("aria-label", `${base}, ${cartCount} items`);
  }

  renderCartText();

  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount += 1;
      setStoredCartCount(cartCount);
      renderCartText();
      button.animate(
        [
          { transform: "translateY(0) scale(1)" },
          { transform: "translateY(-2px) scale(1.015)" },
          { transform: "translateY(0) scale(1)" },
        ],
        { duration: 220, easing: "ease-out" }
      );
    });
  });
});