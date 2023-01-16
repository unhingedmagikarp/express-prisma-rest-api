import { Request, Response } from "express";
import { Book, PrismaClient } from "@prisma/client";

const bookClient = new PrismaClient().book;

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allBooks: Book[] = await bookClient.findMany();

    res.status(200).json({ data: allBooks });
  } catch (error) {
    console.log(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookId = req.params.id;
    const book = await bookClient.findUnique({
      where: { id: bookId },
    });

    res.status(200).json({ data: book });
  } catch (error) {
    console.log(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookData = req.body;

    console.log(bookData)
    const book: Book = await bookClient.create({
      data: { 
        title: bookData.title,
        author: {
          connect: { id: bookData.authorId }
        }
      },
    });

    res.status(201).json({ data: book });
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookId = req.params.id;
    const bookData = req.body;
    const updatedBookData = await bookClient.update({
      where: { id: bookId },
      data: { ...bookData },
    });

    res.status(200).json({ data: updatedBookData });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookId = req.params.id;
    const book = await bookClient.delete({ where: { id: bookId } });

    res.status(200).json({ data: {} });
  } catch (error) {
    console.log(error);
  }
};