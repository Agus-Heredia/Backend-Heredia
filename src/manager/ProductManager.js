//Hacemos un import al manejador de archivos nativo de NodeJs nombrado 'File System' 
import fs from 'fs';
const path = '../../products.json'

//Creamos la clase que se encargara de manejar los productos que vayamos agregando, junto con sus archivos
 export default class ProductManager {
  constructor() {
    this.path = path;
  }

  async #getNewId(){
    let newId = 0;
    const products = await this.getProducts();
    products.map((p) =>{
        if (p.id > newId) newId = p.id;
    });
    return newId;
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


  async createProduct(obj){
    try {
        const newProduct = {
            id: await this.#getNewId() + 1,
            ...obj
        };
        const products = await this.getProducts();
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

async deleteProductById(id){
  try {
      const products = await this.getProducts();
      if(products.length > 0){    
          const newArray = products.filter(p => p.id !== id);
          await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      } else {
          throw new Error(`Error: No encontramos el producto con el id: ${id} que estabas buscando`);
      }
  } catch (error) {
      console.log(error);
  }        
}

  async deleteAllProducts() {
    try {
        if(fs.existsSync(this.path)) {
           fs.promises.unlink(this.path)
        }
    } catch(error) {
        console.log(error);  
      }
    }


    async updateProduct(obj, id){
      try {
          const products = await this.getProducts();
          const index = products.findIndex(prod => prod.id === id);
          console.log('index:', index);
          if(index === -1){
              throw new Error(`Error! No encontramos el producto con el id: ${id}`)
          } else {
              products[index] = { ...obj, id }
          }
          await fs.promises.writeFile(this.path, JSON.stringify(products));
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


async getProductById(prodId){
  try {
      const products = await this.getProducts();
      const product = await products.find(p => p.id === prodId);
      if(product) {
          return product
      }
      return false;
  } catch (error) {
      console.log(error);
  }
}





}




