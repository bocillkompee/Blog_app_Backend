import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { postsTable } from "../../config/schema";
import { uploadImage } from "../../services/cloudinary.service";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(postsTable);

    res.json({
      message: "Berhasil mengambil data posts",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { categoryId, title, content } = req.body;

    if (!categoryId || !title || !content) {
      return res.status(400).json({
        message: "categoryId, title, dan content wajib diisi",
      });
    }

    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      const result = await uploadImage(req.file.buffer);

      imageUrl = result.url;
      imagePublicId = result.publicId;
    }

    const result = await db.insert(postsTable).values({
      categoryId: Number(categoryId),
      title,
      content,
      imageUrl,
      imagePublicId,
    });

    res.status(201).json({
      message: "Post berhasil dibuat",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { categoryId, title, content } = req.body;

    let imageUrl = undefined;
    let imagePublicId = undefined;

    if (req.file) {
      const result = await uploadImage(req.file.buffer);

      imageUrl = result.url;
      imagePublicId = result.publicId;
    }

    const result = await db
      .update(postsTable)
      .set({
        ...(categoryId && { categoryId: Number(categoryId) }),
        ...(title && { title }),
        ...(content && { content }),
        ...(imageUrl && { imageUrl }),
        ...(imagePublicId && { imagePublicId }),
      })
      .where(eq(postsTable.id, Number(id)));

    res.json({
      message: "Post berhasil diupdate",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db
      .delete(postsTable)
      .where(eq(postsTable.id, Number(id)));

    res.json({
      message: "Post berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};