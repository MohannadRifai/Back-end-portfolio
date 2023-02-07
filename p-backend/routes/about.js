import express from "express";
import protect from '../middleware/authMiddleware.js'

import {
  getAllAbout,
  enterAbout,
  findAnAbout,
  deleteAnAbout,
  updateAnAbout,
   upload
} from "../controllers/about.js";
const router = express.Router();

router.get("/", getAllAbout);

router.post("/",upload.single('file'), protect, enterAbout);

router.get("/:id", protect, findAnAbout);

router.delete("/:id", protect, deleteAnAbout);

router.patch("/:id", protect, upload.single('file') ,updateAnAbout);

export default router;
