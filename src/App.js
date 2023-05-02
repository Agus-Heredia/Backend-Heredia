import express from "express";
import { products } from "../data/db.js";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager('../data/db.json');


app.get('/', (req, res) => {
    res.send('<h1>Bienvenidos a mi primer serverr</h1>')
})

app.get('/products', (req, res) => {
    res.status(200).json(products)
})


app.get('/products/:prodId', (req, res) => {
    const { prodId } = req.params
    // console.log(prodId);
    const filterProducts = products.find(p => p.id === parseInt(prodId))
    if (filterProducts) {
        res.status(200).json(filterProducts)
    } else {
        res.status(404).send({message: 'Error: product not found'})
    }
})


app.get('/products', (req, res) => {
    const { limit } = req.query || 10

    const limitedProducts = products.slice(0, limit)
    res.send(limitedProducts)

})


app.listen(PORT, () => {
    console.log(`Server in port ${PORT} is ready!`);
})