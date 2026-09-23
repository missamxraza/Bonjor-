// BONJOR PAKISTAN
// Put your WhatsApp number below, including Pakistan country code.
// Example format: 923001234567 (no +, spaces or dashes).
const WHATSAPP_NUMBER = "";

let bag = JSON.parse(localStorage.getItem("bonjorBag") || "[]");

const drawer = document.getElementById("drawer");
const count = document.getElementById("count");
const items = document.getElementById("items");
const total = document.getElementById("total");

function money(n) {
  return "PKR " + Number(n).toLocaleString("en-PK");
}

function render() {
  count.textContent = bag.reduce((s, i) => s + i.qty, 0);

  items.innerHTML = bag.length
    ? bag.map((i, idx) => `
      <div class="item">
        <span>${i.name} × ${i.qty}</span>
        <span>${money(i.price * i.qty)}
          <button onclick="removeItem(${idx})">Remove</button>
        </span>
      </div>
    `).join("")
    : '<p class="note">Your bag is empty. Add something you love.</p>';

  total.textContent = money(
    bag.reduce((s, i) => s + i.price * i.qty, 0)
  );

  localStorage.setItem("bonjorBag", JSON.stringify(bag));
}

function addItem(name, price) {
  const product = bag.find(i => i.name === name);

  if (product) {
    product.qty++;
  } else {
    bag.push({
      name,
      price: Number(price),
      qty: 1
    });
  }

  render();
  drawer.classList.add("open");
}

function removeItem(index) {
  bag.splice(index, 1);
  render();
}

document.querySelectorAll(".add").forEach(button => {
  button.addEventListener("click", () => {
    addItem(button.dataset.name, button.dataset.price);
  });
});

document.getElementById("bagBtn").onclick = () => {
  render();
  drawer.classList.add("open");
};

document.getElementById("close").onclick = () => {
  drawer.classList.remove("open");
};

drawer.addEventListener("click", event => {
  if (event.target === drawer) {
    drawer.classList.remove("open");
  }
});

document.getElementById("checkout").onclick = () => {
  if (!bag.length) {
    alert("Please add a product first.");
    return;
  }

  if (!WHATSAPP_NUMBER) {
    alert("WhatsApp number ابھی script.js میں add نہیں کیا گیا۔");
    return;
  }

  const lines = bag
    .map(i => `${i.name} x${i.qty} — ${money(i.price * i.qty)}`)
    .join("%0A");

  const totalAmount = bag.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  const message =
    `Assalam-o-Alaikum Bonjor!%0A%0A` +
    `I want to order:%0A${lines}%0A%0A` +
    `Total: ${money(totalAmount)}%0A%0A` +
    `Name:%0ACity:%0ASize:%0AAddress:`;

  window.location.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

// Optional social links.
// Replace # with your real Instagram/WhatsApp links later.
document.getElementById("instagramLink").href = "#";
document.getElementById("whatsappLink").href =
  WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "#";

render();
