import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './path.js';
import productsRouter from './routes/productsRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewsRouter from './routes/viewsRouter.js'
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import ProductManager from "./managers/productsManager.js";

const productManager = new ProductManager(__dirname + "/fs/products.json");

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
app.use('/views', viewsRouter)

const httpServer = app.listen(8080, () => {
    console.log("🚀 Server listening on port 8080");
  });
  
  const socketServer = new Server(httpServer);
  
  const arrayProducts = [];
  
  socketServer.on("connection", (socket) => {
    console.log("usuario conectado!", socket.id);
    socket.on("disconnect", () => {
      console.log("usuario desconectado!");
    });
  
    socketServer.emit("arrayProducts", arrayProducts);
  
    socket.on("newProduct", (obj) => {
      arrayProducts.push(obj);
      socketServer.emit("arrayProducts", arrayProducts);
    });
  });