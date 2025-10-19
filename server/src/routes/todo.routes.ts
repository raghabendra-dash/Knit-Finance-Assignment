import express from "express";

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodos,
} from "../controllers/todo.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTodo).get(isAuthenticated, getAllTodos);
router
  .route("/:todoId")
  .put(isAuthenticated, updateTodos)
  .delete(isAuthenticated, deleteTodo);

export default router;
