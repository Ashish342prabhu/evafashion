const express= require("express");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");
const userRouter = require("./routes/user.route");
const whishlistRoute = require("./routes/whishlistRoute");
const cookieParser = require("cookie-parser");
const path=require("path")
// const cors=require("cors");
const morgan = require('morgan');
const app=express();
const dotenv =require("dotenv");
dotenv.config({path:"config/.env"});
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser());
// app.use(cors());
app.use(morgan('dev'));

app.use(express.static('public'));

const {name}=require('ejs');
app.set('view engine','ejs');


// app.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// }); 

// app.get('/bag(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'bag.html'));
// });


app.get('^/$|/index(.html)?', (req, res) => {
    res.render('index');
});
app.get('/bag(.html)?', (req, res) => {
    res.render('bag');
});
app.get('/men(.html)?', (req, res) => {
    res.render('men');
});
app.get('/women(.html)?', (req, res) => {
    res.render('women');
});
app.get('/kids(.html)?', (req, res) => {
    res.render('kids');
});

app.get('/Home(.html)?', (req, res) => {
    res.render('home_and_Living');
});
app.get('/Beauty(.html)?', (req, res) => {
    res.render('beauty');
});
app.get('/singup(.html)?', (req, res) => {
    res.render('singup');
});
app.get('/login(.html)?', (req, res) => {
    res.render('login');
});
app.get('/whislist(.html)?', (req, res) => {
    res.render('whishlist');
});
app.use("/user",userRouter);
app.use("/products",productRoute)
app.use("/cart",orderRoute)
app.use("/whish",whishlistRoute)
module.exports=app