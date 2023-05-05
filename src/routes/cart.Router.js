import { Router} from "express";
const router = Router()

import cartManager from "../manager/cartManager.json";
const cartManager = new CartManager('./cart.json')