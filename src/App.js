import express, { urlencoded } from "express";
import morgan from 'morgan';
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes//cartsRouter.js'
import { __dirname } from "./path.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/viewsRouter.js'


const app = express();

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/views', viewsRouter)

// app.use('/', productsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use(express.static(__dirname + './public/images'))



// APP.LISTEN
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!`);
})