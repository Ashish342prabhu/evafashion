const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/orderModel");
const ErrorHandler = require("../utils/errorhandler");
// const Product=require("../model/productModel")

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { itemIds } = req.body;
  const user = req.body.userId;
  try {
    const existingOrder = await Order.findOne({ user });
    if (existingOrder) {
      existingOrder.cartItems.push(...itemIds.map(item => ({ product: item.itemId })));
      await existingOrder.save();
      res.status(200).json({ success: true, order: existingOrder });
    } else {
      // Create a new order
      const order = await Order.create({
        cartItems: itemIds.map(item => ({ product: item.itemId })),
        user,
      });
      res.status(201).json({ success: true, order });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error creating order' });
  }
});





exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const id= req.params.id;
  const orders = await Order.find({user:id});
  console.log(orders);
  res.status(200).json({
    success: true,
    orders,
  });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const itemId = req.params;
  const cart = await Order.findOne({ user: userId });
  if (!cart) {
    return next(new ErrorHandler("Cart not found for this user", 404));
  }
  const itemIndex = Order.cartItems.product.findIndex(item => item._id.toString() === itemId);
  if (itemIndex === -1) {
    return next(new ErrorHandler("Item not found in your cart", 404));
  }
  cart.items.splice(itemIndex, 1);
  await cart.save();
  res.status(200).json({
    success: true,
    message: "Item removed from your cart",
  });
});
