const ADMIN_PASSWORD = "Marius2013.";
const sheetDBOrders = "https://sheetdb.io/api/v1/3qi9q3lxt2yy9";
const sheetDBProducts = "https://sheetdb.io/api/v1/7hlvbgrd1ajf2";

const loginBtn = document.getElementById('login-btn');
const loginMsg = document.getElementById('login-msg');
const loginSection = document.getElementById('login-section');
const adminSection = document.getElementById('admin-section');

loginBtn.addEventListener('click', () => {
const pw = document.getElementById('admin-password').value;
if (pw === ADMIN_PASSWORD) { loginSection.style.display = 'none'; adminSection.style.display = 'block'; loadOrders(); loadProducts(); } 
else { loginMsg.textContent = "Mot de passe incorrect !"; }
});

async function loadOrders() {
const response = await fetch(sheetDBOrders);
const data = await response.json();
const tbody = document.querySelector("#orders-table tbody");
tbody.innerHTML = '';
data.forEach(order => {
const tr = document.createElement('tr');
tr.innerHTML = `<td>${order.name}</td><td>${order.contact}</td><td>${order.type}</td><td>${order.description}</td><td>€${order.price}</td><td><select data-id="${order.id}"><option ${order.status==="envoyée"?"selected":""}>envoyée</option><option ${order.status==="vue"?"selected":""}>vue</option><option ${order.status==="traitée"?"selected":""}>traitée</option><option ${order.status==="finie"?"selected":""}>finie</option></select></td><td><button data-id="${order.id}" class="update-status">Modifier</button></td>`;
tbody.appendChild(tr);
});
document.querySelectorAll('.update-status').forEach(btn=>{ btn.addEventListener('click', async () => {
const id = btn.dataset.id;
const select = document.querySelector(`select[data-id='${id}']`);
const newStatus = select.value;
await fetch(`${sheetDBOrders}/${id}`, { method: 'PATCH', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ data: { status: newStatus } }) });
alert("Statut mis à jour !"); loadOrders(); }); });
}

async function loadProducts() {
const response = await fetch(sheetDBProducts);
const data = await response.json();
const productsDiv = document.getElementById('products-list');
productsDiv.innerHTML = '';
data.forEach(prod => {
const div = document.createElement('div');
div.innerHTML = `<p>${prod.name} - ${prod.type} - €${prod.price}</p><button data-id="${prod.id}" class="delete-prod">Supprimer</button>`;
productsDiv.appendChild(div);
});
document.querySelectorAll('.delete-prod').forEach(btn=>{ btn.addEventListener('click', async () => {
const id = btn.dataset.id;
if(confirm("Supprimer ce produit ?")){ await fetch(`${sheetDBProducts}/${id}`, { method:'DELETE' }); loadProducts(); } }); });
}

document.getElementById('product-form').addEventListener('submit', async (e)=>{
e.preventDefault();
const form = e.target;
const data = { name: form.name.value, type: form.type.value, price: parseFloat(form.price.value), image: form.image.value };
await fetch(sheetDBProducts, { method: 'POST', headers:{ 'Content-Type':'application/json'}, body: JSON.stringify({ data }) });
alert("Produit ajouté !"); form.reset(); loadProducts();
});