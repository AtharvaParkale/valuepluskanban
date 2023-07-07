import express from "express";
import {
    addSubTask,
  createCard,
  deleteCard,
  deleteSubTask,
  getAllCards,
} from "../controllers/cardController.js";

const router = express.Router();

//POST
router.post("/card/new", createCard);
router.delete("/card/:id", deleteCard);
router.get("/cards", getAllCards);
router.put("/card/subTask/:id", deleteSubTask);
router.put("/card/task/:id", addSubTask);

export default router;
