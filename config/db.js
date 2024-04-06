const mongoose=require("mongoose");

async function connectionn(){
    await mongoose.connect(process.env.DB_URI) //{ useNewUrlParser: true}
    console.log('database connectd');
}
module.exports=connectionn;
