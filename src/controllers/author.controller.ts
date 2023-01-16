import { Request, Response } from "express";
import { Author, PrismaClient } from "@prisma/client";

const authorClient = new PrismaClient().author;

export const getAllAuthors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allAuthors: Author[] = await authorClient.findMany({ include: { books: true }});

    res.status(200).json({ data: allAuthors });
  } catch (error) {
    console.log(error);
  }
};

export const getAuthorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authorId = req.params.id;
    const author = await authorClient.findUnique({ where: { id: authorId }, include: { books: true } });

    res.status(200).json({ data: author });
  } catch (error) {
    console.log(error);
  }
};

export const createAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authorData = req.body;
    const author = await authorClient.create({
      data: { ...authorData },
    });

    res.status(201).json({ data: author });
  } catch (error) {
    console.log(error);
  }
};

export const updateAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authorId = req.params.id;
    const authorData = req.body;
    const updatedAuthorData = await authorClient.update({
      where: { id: authorId },
      data: { ...authorData },
    });

    res.status(200).json({ data: updatedAuthorData });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authorId = req.params.id;
    const authorData = await authorClient.delete({ where: { id: authorId } });

    res.status(200).json({ data: {} });
  } catch (error) {
    console.log(error);
  }
};