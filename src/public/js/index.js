const socketClient = io();

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputPrice = document.getElementById("price");
const products = document.getElementById("products");
const inputStock = document.getElementById("stock");
const inputDescription = document.getElementById("description");
const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `<p><strong>${msg.username}: ${msg.message}<strong></p>`;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p> ${data} is writting a message... </p>`;
});

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

    infoProducts += `
    <div class="d-flex justify-content-center align-items-center">
    <div class="text-center border border-info rounded my-3 py-2 px-3">
      <p>
      <h3>Nuevo producto</h3>
        <b>${p.title}</b></br>
        <u>Descripcion:</u> ${p.description}</br>
        <u> Precio:</u> $${p.price} </br>
        <u>Categoria:</u> ${p.category}</br>
        <u>Stock:</u> ${p.stock}</br>
        <u>Code:</u> ${p.code}</br>
      </p>
    </div>
  </div>
  `;
  });
  products.innerHTML = infoProducts;
});