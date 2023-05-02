//Hacemos un require al manejador de archivos nativo de NodeJs nombrado 'File System' 
// const fs = require('fs');
import fs from 'fs';
import { products } from '../data/db.js';

//Creamos la clase que se encargara de manejar los productos que vayamos agregando, junto con sus archivos
 export class ProductManager {
  constructor() {
    this.path = '../data/db.js';
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }


  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const productInfo = await this.getProducts();
      const repeatedCode = productInfo.find((item) => item.code === code);

      if (repeatedCode) {
        console.log(`Error: El producto con el código: ${code}, ya existe!`);
      } else {
        const lastAddedProduct = productInfo[productInfo.length - 1];
        const newId = lastAddedProduct ? lastAddedProduct.id + 1 : 1;

        const newProduct = {
          id: newId,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        productInfo.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(productInfo));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(prodId) {
    try {
      const productInfo = await this.getProducts();
      const prodIndex = productInfo.find((product) => product.id === prodId);

      if (prodIndex === -1) {
        console.log('No se encontró el producto con el ID especificado');
      } else {
        productInfo.splice(prodIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productInfo));
        console.log('Has eliminado el producto correctamente');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(prodId, updatingProd) {
    try {
      const productInfo = await this.getProducts();
      const prodIndex = productInfo.find((product) => product.id === prodId);

      if (prodIndex === -1) {
        console.log('Producto no encontrado');
      } else {
        const updatedProduct = {
          ...productInfo[prodIndex],
          ...updatingProd,
          id: prodId,
        };
        productInfo[prodIndex] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(productInfo));
        console.log('Producto actualizado y modificado con éxito');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #repeatedProduct(prodId) {
    try {
      const productInfo = await this.getProducts();
      return productInfo.find((products) => products.id === prodId);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(prodId) {
    try {
      const product = this.#repeatedProduct(prodId);
      if (!product) {
        console.log('Error: Not found product');
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//Instanciamos nuestra clase ProductManager
const productManager = new ProductManager();


//Definimos la función asíncrona para manipular los productos
const testManager = async () => {
  const get = await productManager.getProducts();
  console.log("--- Primer llamado al array ---", get);

  // Agregamos productos
  await productManager.addProduct("Nike t-shirt","Nueva musculosa Nike", 500 ,"www.imgExample.com","#A001", 8);
  await productManager.addProduct("Nike short","Nuevo pantalón Nike", 200 ,"www.imgExample.com","#A002", 3);
  await productManager.addProduct("Nike shoes","Nuevas zapatillas NikeAir", 700 ,"www.imgExample.com","#A003", 5);
  await productManager.addProduct("Nike hoodie","Nuevo buzo Nike", 600 ,"www.imgExample.com","#A004", 9);
  await productManager.addProduct("Nike socks","Medias altas deportivas Nike", 100 ,"www.imgExample.com","#A005", 12);



  // // Buscamos producto por su ID
  // const getNo2 = await productManager.getProductById(1);
  // console.log("Producto buscado por ID:", getNo2);

  // // Llamamos al array para visualizar los productos
  // const getNo3 = await productManager.getProducts();
  // console.log("--- Segundo llamado al array ---", getNo3);


  // //////// Con esta función podemos eliminar un producto en específico por su ID //////////
  // await productManager.deleteProduct();
  // const getNo4 = await productManager.getProducts();
  // console.log("--- Tercer llamado al array ---", getNo4);


  // Actualizamos las caracteristicas de un producto mediante su ID
  // await productManager.updateProduct(0, {
  //   price: + 300,
  //   stock: + 15,
  // })


  // Llamado al array final
  const getNo5 = await productManager.getProducts();
  console.log("--- Último llamado al array ---", getNo5);

};

// testManager();
