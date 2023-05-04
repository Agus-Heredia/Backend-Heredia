import express, { urlencoded } from "express";
import ProductManager from "./manager/ProductManager.js";

const app = express();

app.use(express.json())
app.use(urlencoded({extended: true}))

const productManager = new ProductManager('./products.json');


app.get('/', (req, res) => {
    res.send('<h1>Bienvenidos a mi primer serverr</h1>')
})

app.get('/api/products', async(req, res) => {
    try {
        const product = await productManager.getProducts()
        res.status(200).json(product)
    } catch (error) {
        res.status(400).send({ message: error.message})
    }

})

app.get('/api/products/:prodId', async(req, res) => {
try {
    const { prodId } = req.params
    // console.log(prodId);
    const filtredProduct = await productManager.getProductById(Number(prodId))
    if (filtredProduct){
        res.status(200).json(filtredProduct)
    } else {
        res.status(404).send({Error: 'Product not found'})
    }

} catch (error) {
    res.status(404).send({ message: error.message })
}
})


// app.get('/api/products', (req, res) => {
//     const { limit } = req.query || 10

//     const limitedProducts = products.slice(0, limit)
//     res.send(limitedProducts)

// })

app.post('/api/products', async(req, res) => {

    try {
        // console.log(req.body)
        const product = req.body
        const newProduct = await productManager.createProduct(product)
        res.send(newProduct)
    } catch (error) {
        res.status(404).send({message: (error)})
        
    }


})


app.put('/api/products/:id', async(req, res) =>{
    try {
        const product = req.body;
        const { id } = req.params;
        const products = await productManager.getProductById(Number(id));
        if(products){
            await productManager.updateProduct(product, Number(id));
            res.send('Haz actualizado correctamente tu producto')
        } else {
            res.status(404).send('Error: Producto no encotrado')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
}});


app.delete('/api/products/:id', async(req, res) =>{
    try {
        const { id } = req.params;
        const products = await productManager.getProducts();  
        if(products.length > 0) {
            await productManager.deleteProductById(Number(id));
            res.send(`El producto con el id: ${id} ha sido eliminado corectamente!`);
        } else {
            res.send(`No se ha encontrado el producto`)
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.delete('/api/products', async(req, res) =>{
    try {
        await productManager.deleteAllProducts()
        res.send('Todos los productos han sido eliminados correctamente!')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})















// APP.LISTEN
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server in port ${PORT} is ready!`);
})