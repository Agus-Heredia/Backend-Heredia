import express, { urlencoded } from "express";
// import morgan from 'morgan';
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes//cartsRouter.js'
import { __dirname } from "./path.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/viewsRouter.js'
import { Server } from "socket.io";


const app = express();

app.use(express.json())
app.use(urlencoded({extended: true}))
// app.use(morgan('dev'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/', viewsRouter)

// app.use('/', productsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use(express.static(__dirname + '/public'))

// // Configurar la ruta estática para los archivos JavaScript
// app.use('/realtimeproducts', express.static(__dirname + '../public/main.js'));

// // Configurar el tipo MIME para los archivos JavaScript
// app.use('/realtimeproducts', (req, res, next) => {
//   res.type('text/javascript');
//   next();
// });


    
    
//Websocket    
import ProductManager from '../src/manager/ProductManager.js'
const productManager = new ProductManager()

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!`);
})

const socketServer = new Server(httpServer)


// socketServer.on('connection', (socket) => {
//     console.log('User connected successfully', socket.id);
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     })
//     // socket.emit('msgFromBack', 'Welcome to the Backend server!');

//     socket.on('newProduct', async(prod) => {
//         await productManager.createProduct(prod.name, prod.price)
//         const products = await productManager.getProducts()
//         socketServer.emit ('getProducts', products)
//     })
// })

socketServer.on('connection', async (socket) => {
    console.log('✓ User connected successfully!', `-- Your ID is: (${socket.id}) --`);
    socket.on('disconnect', () => {
        console.log('✗ User disconnected');
    })
    // socket.emit('msgFromBack', 'Welcome to the Backend server!');

    const products = await productManager.getProducts()
    // console.log(products)
    socket.on('newProduct', async(prod) => {
        await productManager.createProduct(prod.name, {...prod})
    })
    socket.emit('getProducts', products)
})