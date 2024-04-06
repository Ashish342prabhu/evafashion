const express = require("express");
const {
    newWhish,
    MyWhish,
    deletewhish,
} = require("../controller/whishlistController");



const orderRoute = express.Router();

orderRoute.post("/newWhish", newWhish);
// orderRoute.post("/new",requireSignIn, newOrder);
orderRoute.get("/MyWhish/:id" ,MyWhish);
orderRoute.delete("/:id" ,deletewhish)
module.exports = orderRoute;

