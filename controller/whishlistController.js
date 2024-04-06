const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const whish = require("../model/whishlistModel");
const ErrorHandler = require("../utils/errorhandler");

exports.newWhish = catchAsyncErrors(async (req, res, next) => {
  const { itemIds } = req.body;
  const user = req.body.userId;
  try {
    const existingWhish = await whish.findOne({ user });
    if (existingWhish) {
      existingWhish.WhishItems.push(...itemIds.map(item => ({ product: item.itemId })));
      await existingWhish.save();
      res.status(200).json({ success: true, whish: existingWhish });
    } else {
      // Create a new order
      const newWhish = await whish.create({  // Changed 'whish' to 'newWhish'
        WhishItems: itemIds.map(item => ({ product: item.itemId })),
        user,
      });
      res.status(201).json({ success: true, whish: newWhish });  // Changed 'whish' to 'newWhish'
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error creating whish' });
  }
});



exports.MyWhish = catchAsyncErrors(async (req, res, next) => {
  const id= req.params.id;
  const whishs = await whish.find({user:id});
  console.log(whishs)
  res.status(200).json({
    success: true,
    whishs,
  });
});

exports.deletewhish = catchAsyncErrors(async (req, res, next) => {
  const whish = await whish.findByIdAndDelete(req.params.id);
  if (!whish) {
    return next(new ErrorHandler("whish not found with this Id", 404));
  }
  res.status(200).json({
    success: true,
  });
});
