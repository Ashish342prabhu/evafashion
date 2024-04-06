const app  = require("./app.js");
const connectionn  = require("./config/db");
connectionn().catch(err => console.log(err));

app.listen(process.env.PORT,()=>{
    console.log(`server is woking on http://localhost:${process.env.PORT}`);
});


// main().catch(err => console.log(err));
// async function main(){
//     await mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true }) //{ useNewUrlParser: true}
//     console.log('database connectd');
// }