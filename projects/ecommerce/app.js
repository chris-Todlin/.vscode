/* Ecommerce world */
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const product = require('./lib/productService');
const fileStore = require('session-file-store');

const app = express(); // Start the server instance

/* configurations */
app.set('port', process.env.PORT || 3000);
const acessLogStream = rfs.createStream('acess.log',{
    encoding: 'utf8',
    interval: '1d',
    path: path.resolve(__dirname, 'log'),
    compress: 'gzip'
});
const sessionFile = fileStore(session);
app.disable('x-powered-by');
app.engine('handlebars', hbs.engine({extname: 'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', 'views');

/* Middleware */
app.use(morgan('combined', {stream: acessLogStream}));
app.use(morgan('short'));
// configuring the session
app.use(session({
    store: new sessionFile({path: path.resolve(__dirname, 'sessionsUser')}),
    secret: '5d0eb150d653134eac37a06063fb0942',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 *60,
        httpOnly: true,
    }
}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* Routes */

// Debugging tip
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  next();
});

const htmlRoot = path.resolve(__dirname, 'views/html');
app.get('/',(req,res)=>{
    res.sendFile('home.html',{root: htmlRoot}); // Send landing page
});

app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root: htmlRoot}); // Send the login file
});

app.post('/login',(req,res)=>{
    // data is sent by the user
    const {username, password} = req.body;
    if(username && password){
        // create the session here
        if(!req.session.user){
            req.session.user = {username, id: 123};
        }
        res.json({sucess: true, redirectUrl: '/products'});
    } else {
        res.json({sucess: false});
    }
});

// Path were the product page is rendered
app.get('/products',(req,res)=>{
    const productAll = product.returnAllProducts();
    res.render('products',{products: productAll}); // return all the products
});

// Get all the products through js fetch
app.get('/productsall',(req,res)=>{
    res.json(product.returnAllProducts());
});

// Path to add to cart
app.post('/add-to-cart',(req,res)=>{
    const product = req.body;
    if(!req.session.cart) req.session.cart = [];
    req.session.cart.push(product);
    res.json({message: 'Added to cart!'});
});

// path for the carts (can be one or two depending of the programmer choice)
app.get('/cart',(req,res)=>{
    const cartItems = req.session.cart || {};
    res.render('cart',{cartproducts: cartItems, layout: 'view'}); // Send it once and for all
});
// If html
app.get('/cartitems',(req,res)=>{
    const cartItems = req.session.cart || {};
    if(cartItems.length){
        res.json(cartItems);
    } else {
        res.json({message: "No such thing you selected"});
    }
});

/* Error Handling of routes */

// 500 Handlers
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send('500 - Internal Server Error!');
});

// A 404 handleer
app.use((req,res,next)=>{
    res.status(404).send('404 - Resource Not Found!');
});

/* Listen the server */
const port = app.get('port');
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});