const mongoose = require("mongoose");

const whishSchema = new mongoose.Schema({
    WhishItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
});
module.exports=mongoose.model("whish", whishSchema);