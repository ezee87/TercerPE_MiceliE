const socketClient = io();

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputPrice = document.getElementById("price");
const products = document.getElementById("products");

const inputStock = document.getElementById("stock");
const inputDescription = document.getElementById("description");

form.onsubmit = (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const price = inputPrice.value;
  const stock = inputStock.value;
  const description = inputDescription.value;
  socketClient.emit("newProduct", { title, price, stock, description });
};

socketClient.on("arrayProducts", (array) => {
  console.log(array);
  let infoProducts = "";
  array.forEach((p) => {
    infoProducts += `Title: ${p.title} | Description: ${p.description} | Price: $${p.price} | Category: ${p.category} | Stock: ${p.stock} | Code: ${p.code} |  <br>`;
  });
  products.innerHTML = infoProducts;
});