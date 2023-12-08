import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controller/book.controller.js";

const router = express.Router();

router.post("/api/books", createBook);

router.get("/api/books", getAllBooks);

router.get("/api/books/:id", getBookById);

router.put("/api/books/:id", updateBook);

router.delete("/api/books/:id", deleteBook);



export default router;