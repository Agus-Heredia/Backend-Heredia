import { Router } from 'express';
const router = Router()

import ProductManager from "../manager/ProductManager.js"; 
const productManager = new ProductManager('./products.json');

router.get("/home", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.log(error);
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.log(error);
    }
});

export default router