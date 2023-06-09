import "./db/database.js";
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './path.js';
import productsRouter from './routes/productsRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewsRouter from './routes/viewsRouter.js'
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import ProductManager from "./daos/mongodb/products.dao.js";
import MessagesManager from "./daos/filesystem/messages.dao.js";

const productManager = new ProductManager(__dirname + "/daos/filesystem/products.json");
const messagesManager = new MessagesManager(__dirname + "/daos/filesystem/messages.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(errorHandler);
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/products', productsRouter);
app.use('/carts', cartRouter);
app.use('/chat', viewsRouter)

const httpServer = app.listen(8080, () => {
  console.log("🚀 Server listening on port 8080");
});

const socketServer = new Server(httpServer);

const arrayProducts = [];

socketServer.on("connection", async (socket) => {
  console.log("usuario conectado!", socket.id);
  socket.on("disconnect", () => {
    console.log("usuario desconectado!");
  });

  socketServer.emit("messages", await messagesManager.getAllmessage());

  socketServer.emit("arrayProducts", arrayProducts);

  socket.on("chat:message", async (message) => {
    await messagesManager.createMessage(message);
    socketServer.emit("messages", await messagesManager.getAllMessage());
  });

  socket.on("newProduct", (obj) => {
    arrayProducts.push(obj);
    socketServer.emit("arrayProducts", arrayProducts);
  });
});

