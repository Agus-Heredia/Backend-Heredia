import { Router} from "express";
const router = Router()

import ProductManager from "../manager/ProductManager.js"; 
const productManager = new ProductManager('./products.json');



// router.get('/home', (req, res) => {
//     res.send('<h1>Bienvenidos a mi primer serverr</h1>')
// })

router.get('/', async(req, res) => {
    try {
        const product = await productManager.getProducts()
        res.status(200).json(product)
    } catch (error) {
        res.status(400).send({ message: error.message})
    }

})

router.get('/:prodId', async(req, res) => {
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


// router.get('/', (req, res) => {
//     const { limit } = req.query

//     const limitedProducts = products.slice(0, Number(limit))
//     res.send(limitedProducts)

// })

router.post('/', async(req, res) => {

    try {
        // console.log(req.body)
        const product = req.body
        const newProduct = await productManager.createProduct(product)
        res.send(newProduct)
    } catch (error) {
        res.status(404).send({message: (error)})
        
    }


})


router.put('/:id', async(req, res) =>{
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


router.delete('/:id', async(req, res) =>{
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

router.delete('/', async(req, res) =>{
    try {
        await productManager.deleteAllProducts()
        res.send('Todos los productos han sido eliminados correctamente!')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})




export default router