const mongoose = require("mongoose");

const ProductSchema=mongoose.Schema({
    title:{type:String, require:true},
    brand:{type:String, require:true},
    category:{type:String, require:false},
    discounted_price:{type:Number, require:true},
    strike_price:{type:Number, require:true},
    discount:{type:String, require:true},
    rating:{type:Number, require:false},
    rating_count:{type:String, require:false},
    images: {type:String, require:true},
    size:{type:Array , require:false} ,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        
      },  

})

const Product=mongoose.model("product",ProductSchema);

module.exports=Product;
