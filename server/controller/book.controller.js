import Book from "../model/book.model.js";

export const createBook = async (request, response) => {
  try {
    console.log("Request Body:", request.body);

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      price: request.body.price,
      category: request.body.category,
      description: request.body.description,
    };
    console.log("New Book:", newBook);

    const book = await Book.create(newBook);
    console.log("Book added successfully");
    return response.status(201).send(book);
  } catch (error) {
    console.log("Error:", error.message);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return response.status(400).json({ message: "Validation Error", errors });
    } else {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
};


export const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getBookById = async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const updateBook = async (request, response) => {
  try {
    const { id } = request.params;

    const updatedBook = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
      runValidators: true,
    });
    console.log("Books updated succesfully");
    console.log("Updated Book:", updatedBook);

    if (!updatedBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(updatedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return response.status(400).json({ message: "Validation Error", errors });
    } else {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
};

export const deleteBook = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedBook = await Book.findByIdAndDelete(id);
   console.log("Books removed succesfully");
   console.log("Deleted Book:", deletedBook);

    if (!deletedBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(deletedBook);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};