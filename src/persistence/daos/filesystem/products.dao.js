import fs from 'fs';
import { __dirname } from '../../path.js';

export default class ProductManager {

 constructor() {
    this.pathFile = 'products.json';
  }

async getMaxId() {
  let maxId = 0;
  const products = await getAllProducts();
  products.map((prod) => {
    if (prod.id > maxId) maxId = prod.id;
  });
  return maxId;
};

async getAllProducts() {
    try {
        if(fs.existsSync(this.pathFile)){
            const products = await fs.promises.readFile(this.pathFile, 'utf-8');
            const productsJSON = JSON.parse(products);
            return productsJSON; 
        } else {
            return []
        }
        
    } catch (error) {
        console.log(error);
    }
}

async getProductById(id) {
    try {
        const products = await getAllProducts();
        const product = products.find((prod) => prod.id === id);
        if(product) {
            return product
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

async createProduct(obj) {
    try {
        const product = {
            id: await getMaxId() + 1,
            ...obj
        };
        const productsFile = await getAllProducts();
        productsFile.push(product);
        await fs.promises.writeFile(this.pathFile, JSON.stringify(productsFile));
        return product;
    } catch (error) {
        console.log(error);
    }
}

async updateProduct(obj, id) {
    try {
        const productsFile = await getAllProducts();
        const index = productsFile.findIndex(prod => prod.id === id);
        if(index === -1){
            throw new Error(`El producto ${id} no se encontro`)
        } else {
            productsFile[index] = { ...obj, id }
        }
        await fs.promises.writeFile(this.pathFile, JSON.stringify(productsFile));
    } catch (error) {
        console.log(error);
    }
}

async deleteProductById(id) {
    try {
        const productsFile = await getAllProducts();
        if(productsFile.length > 0){
            const newArray = productsFile.filter(prod => prod.id !== id);
            await fs.promises.writeFile(this.pathFile, JSON.stringify(newArray));
        } else {
            throw new Error(`El producto ${id} no se encuentra`);
        }
    } catch (error) {
        console.log(error);
    }
}

async deleteAllProducts() {
    try {
        if(fs.existsSync(this.pathFile)){
            await fs.promises.unlink(this.pathFile)
        }
    } catch (error) {
        console.log(error);
    }
}
}