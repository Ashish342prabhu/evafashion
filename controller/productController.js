const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apifeature");
// const product=require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");

exports.createProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 150;
  try {
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({ success: true, products, productsCount, resultPerPage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
exports.orderproduct = catchAsyncErrors(async (req, res, next) => {
  const id= req.params.id;
  const products = await Product.findById(id);
  res.status(200).json({
    success: true,
    products,
  });
});

exports.getSingleProduct=catchAsyncErrors(async(req,res)=>{
   const product=await Product.findById(req.params.id);
   res.status(201).json({
    success: true,
    product,
  });
});


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});