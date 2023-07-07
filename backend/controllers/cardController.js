import ErrorHandler from "../utils/errorHandler.js";
import Card from "../models/Card.js";
import mongoose from "mongoose";

// CREATE PRODUCT -- Admin (Only admin can access this route)
export const createCard = async (req, res, next) => {
  try {
    const card = await Card.create(req.body);

    const cards = await Card.find();

    res.status(201).json({
      success: true,
      card,
      cards,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Products
export const getAllCards = async (req, res, next) => {
  try {
    const cardCount = await Card.countDocuments();
    const cards = await Card.find();

    res.status(200).json({
      success: true,
      cards,
      cardCount,
    });
  } catch (err) {
    next(err);
  }
};

//Add subtask
export const addSubTask = async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);

    if (!card) {
      return next(new ErrorHandler("Card not found !", 404));
    }

    card.tasks.push(req.body);

    await card.save({ validateBeforeSave: false });

    const cards = await Card.find();

    res.status(200).json({
      success: true,
      cards,
    });
  } catch (err) {
    next(err);
  }
};

//Delete subtask
export const deleteSubTask = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return next(new ErrorHandler("Card not found !", 404));
    }

    const targetId = new mongoose.Types.ObjectId(req.body.id);

    const filteredArray = card.tasks.filter((obj) => !obj._id.equals(targetId));

    card.tasks = filteredArray;

    await card.save({ validateBeforeSave: false });

    const cards = await Card.find();

    res.status(200).json({
      success: true,
      message: "Sub task deleted successfully",
      cards,
    });
  } catch (err) {
    next(err);
  }
};

//Delete Card
export const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return next(new ErrorHandler("Card not found !", 404));
    }

    await card.deleteOne();

    const cards = await Card.find();
    res.status(200).json({
      success: true,
      message: "Card deleted successfully",
      cards,
    });
  } catch (err) {
    next(err);
  }
};
