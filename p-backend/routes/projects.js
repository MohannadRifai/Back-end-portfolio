// import express from "express";

// import {
// getAllProjects,
//   enterProjects,
//   findAProject,
//   deleteAProject,
//   updateAProject,
// } from "../controllers/Projects.js";
// const router = express.Router();

// router.get("/", getAllProjects);

// router.post("/", enterProjects);

// router.get("/:id", findAProject);

// router.delete("/:id", deleteAProject);

// router.patch("/:id", updateAProject);

// export default router;
import protect from '../middleware/authMiddleware.js'
import express from "express";
const router = express.Router();
import{
  getAllProjects,
  enterProjects,
  findAProject,
  deleteAProject,
  updateAProject,
  upload
} from '../controllers/projects.js'

router.get("/", protect, getAllProjects);
router.post('/', protect, upload.single('file') ,enterProjects);
router.get('/:id', protect, findAProject);
router.delete('/:id', protect, deleteAProject);
router.patch('/:id', protect, upload.single('file') ,updateAProject);

export default router