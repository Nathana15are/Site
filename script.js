const sheetDBOrders = "https://sheetdb.io/api/v1/3qi9q3lxt2yy9";
const sheetDBProducts = "https://sheetdb.io/api/v1/7hlvbgrd1ajf2";
const whatsappNumber = "33766748515";
const paypalLink = "TON_LIEN_PAYPAL";

const prices = { miniature: 1, pdp: 0.5, fond: 1 };

const priceDisplay = document.getElementById('price');
const typeSelect = document.getElementById('type-select');

typeSelect?.addEventListener('change', () => { priceDisplay.textContent = prices[typeSelect.value]; });

document.getElementById('order-form')?.addEventListener('submit', async (e) => {
e.preventDefault();
const form = e.target;
const type = form.type.value;
const price = prices[type];
const data = {
name: form.name.value, contact: form.contact.value, type: type,
description: form.description.value, price: price, status: "envoyée"
};
await fetch(sheetDBOrders, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({data}) });
const message = `Bonjour, je souhaite commander :\nType: ${data.type}\nNom: ${data.name}\nContact: ${data.contact}\nDescription: ${data.description}\nPrix: €${data.price}`;
document.getElementById('whatsapp-btn').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
document.getElementById('paypal-btn').href = `${paypalLink}?amount=${price}`;
alert(`Commande envoyée ! Prix : €${price}. Clique sur WhatsApp pour confirmer ou PayPal pour payer.`);
form.reset();
priceDisplay.textContent = prices['miniature'];
});