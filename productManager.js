//Creamos la clase que se encargara de manejar los productos que vayamos agregando
class ProductManager{
    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail= 'www.img.com', stock){
        const newProduct = {
            id: this.#newId() + 1,
            title,
            description,
            price,
            thumbnail,
            stock,
        };
        this.products.push(newProduct);

    }


    #newId(){
        let id = 0;
        this.products.map((product) => {
            if (product.id  >= id) id = product.id;
            
        })
        return id
    }


    getProducts(){
        return this.products;
    }


    getProductById(idProduct){   
        return this.products.find((product) => product.id === idProduct)
    }

}


//Instanciamos
const productManager = new ProductManager()


//Añadimos los productos a nuestro array 'Products'
productManager.addProduct('Nike t-shirt', 'Remera nike deportiva', 350, this.thumbnail, 5); 
productManager.addProduct('Nike short', 'Short deportivo Nike', 150, this.thumbnail, 8);
productManager.addProduct('Nike shoes', 'Tu calzado para correr favorito', 600, this.thumbnail, 3); 


//Imprimimos por consola nuestro array con los productos agregados,
console.log(productManager.getProducts());


//En caso de necesitarlo, podemos buscar un producto en específico con su correspondiente ID
console.log(productManager.getProductById(2));


