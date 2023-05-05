import express, { urlencoded } from "express";
import productsRouter from './routes/productsRouter.js'
import { __dirname } from "./path.js";

const app = express();

app.use(express.json())
app.use(urlencoded({extended: true}))

// app.use('/', productsRouter)
app.use('/api/products', productsRouter)
app.use(express.static(__dirname + './public/images'))




// APP.LISTEN
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server in port ${PORT} is ready!`);
})