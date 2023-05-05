import fs from 'fs';
const path = '../../cart.json'


export default class cartManager {
    constructor() {
      this.path = path;
    }


    async #getNewId() {
        let newId = 0;
        const carts = await this.getCarts();
        carts.map((cart) => {
            if (cart.cid > newId) newId = cart.cid;
        });
        return newId;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(carts);
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }


    async createCart() {
        try {
            const cart = {
                cid: await this.#getNewId() + 1,
                products: []
            };
            const carts = await this.getCarts();
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            console.log(error);
        }
    }


    async getCartById(cid) {
        try {
            const carts = await this.getCarts();
            const cart = await carts.find(cart => cart.cid === cid);
            if (cart) {
                return cart;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }







}