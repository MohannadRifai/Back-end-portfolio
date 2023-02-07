import express from "express";
import protect from '../middleware/authMiddleware.js'
import {
getAllSkills,
  enterSkills,
  findAnSkills,
  deleteAnSkills,
  updateAnSkills,
  upload
} from "../controllers/skills.js";
const router = express.Router();

router.get("/", getAllSkills);

router.post("/", protect, upload.single('file') ,enterSkills);

router.get("/:id", protect, findAnSkills);

router.delete("/:id", protect, deleteAnSkills);

router.patch("/:id",protect, upload.single('file') ,updateAnSkills);

export default router;