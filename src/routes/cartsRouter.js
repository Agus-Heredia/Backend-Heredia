import { Router} from "express";
const router = Router()

import CartManager from "../manager/cartManager.js";
const cartManager = new CartManager('./cart.json')

router.get('/', async(req, res) => {
    try {
        const cart = await cartManager.getCarts()
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).send({ message: error.message})
    }
})


router.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    try {
      const cart = await cartManager.getCartById(cid);
      if (!cart) {
        res.status(404).send(`No se ha enontrado el carrito con el id ${cid}`);
        return;
      }
      const products = await Promise.all(
        cart.products.map(async (product) => {
          const p = await productManager.getProductById(product.pid);
          return { ...product, ...p };
        })
      );
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error: Server error');
    }
  });




export default router