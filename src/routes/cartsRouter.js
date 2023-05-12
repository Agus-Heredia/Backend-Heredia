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

  router.post('/', async (req, res) => {
    try {
      const newCart = await cartManager.createCart()
      res.status(200).json(newCart);
    } catch (error) {
      request.status(404).json({message: error.message});
    }
  })
  
  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const productAdd = await cartManager.addProductToCart(cid, pid)
      if(productAdd){
        res.status(200).send('producto agregado al carrito')
      }else{
        res.status(404).send('producto no encontrado')
      }
      } catch (error) {
      res.status(500).send('Server error');
    }
  })

  router.delete('/', async(req, res) =>{
    try {
        await cartManager.deleteAllProducts()
        res.send('Todos los carritos han sido eliminados de manera exitosa!')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.delete('/:cid', async(req, res) =>{
  try {
      const { cid } = req.params;
      const carts = await cartManager.getCarts();  
      if(carts.length > 0) {
          await cartManager.deleteCartById(Number(cid));
          res.send(`El carrito con el id: ${cid} ha sido eliminado corectamente!`);
      } else {
          res.send(`No se ha encontrado el carrito`)
      }
  } catch (error) {
      res.status(404).json({message: error.message});
  }
})




export default router