const BOOK_PRICE = 249;

document.addEventListener("DOMContentLoaded", () => {
  const quantityInput = document.getElementById("bookQuantity");
  const totalDisplay = document.getElementById("bookTotalAmount");
  const deliveryRadios = document.querySelectorAll(
    'input[name="deliveryMethod"]'
  );
  const addressBox = document.getElementById("deliveryAddress");
  const paymentRadios = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  const bankBox = document.getElementById("bankDetails");

  quantityInput.addEventListener("input", () => {
    const qty = parseInt(quantityInput.value) || 0;
    totalDisplay.textContent = (qty * BOOK_PRICE).toLocaleString();
  });

  deliveryRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      addressBox.style.display = radio.value === "delivery" ? "block" : "none";
    });
  });

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      bankBox.style.display = radio.value === "bank" ? "block" : "none";
    });
  });

  document.getElementById("bookOrderForm").addEventListener("submit", (e) => {
    e.preventDefault();

    if (quantityInput.value < 1) {
      alert("Please enter a valid number of books.");
      return;
    }

    alert(
      "Order submitted successfully. You will receive confirmation shortly."
    );
    e.target.reset();
    totalDisplay.textContent = "0";
    bankBox.style.display = "none";
    addressBox.style.display = "none";
  });
});
