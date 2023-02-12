import express from "express";
import protect from "../middleware/authMiddleware.js";
// import {
//   getAllCertificates,
//   enterCertificates,
//   findACertificates,
//   deleteACertificates,
//   updateACertificates,
// } from "../controllers/Certificates.js";
// const router = express.Router();

// router.get('/', getAllCertificates)
// router.post("/", enterCertificates);

// router.get("/:id", findACertificates);

// router.delete("/:id", deleteACertificates);

// router.patch("/:id", updateACertificates);

// export default router;

import {
  getAllCertificates,
  enterCertificates,
  findACertificates,
  deleteACertificates,
  updateACertificates,
  upload,
} from "../controllers/certificates.js";
const router = express.Router();

router.get("/", getAllCertificates);
router.post("/", upload.single("file"), protect, enterCertificates);
router.get("/:id", protect, findACertificates);
router.delete("/:id", protect, deleteACertificates);
router.patch("/:id", protect, upload.single("file"), updateACertificates);

export default router;
