import { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../../controllers/post/post.controller";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

router.get("/", getPosts);
router.post("/", upload.single("image"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;