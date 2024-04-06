
const express=require("express");
const { registerUser, loginUser, getAllUser, getSingleUser, deleteUser } = require("../controller/user.controller");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");


const userRouter=express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
// userRouter.get("/:id", getSingleUser)
userRouter.get("/allusers" ,getAllUser)
userRouter.delete("/:id",deleteUser)
//protected User route auth
// userRouter.get("/user-auth", requireSignIn, (req, res) => {
//     res.status(200).send({ ok: true });
//   });
//   //protected Admin route auth
//   userRouter.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
//     res.status(200).send({ ok: true });
//   });
module.exports=userRouter