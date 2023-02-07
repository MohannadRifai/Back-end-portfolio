import asyncHandler from "async-handler";
import certificates from "../models/certificates.js";
import multer from "multer";
import path from "path";
import User from "../models/user.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
});

export const getAllCertificates = async (req, res) => {
  certificates.find({}, (error, allcertificates) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(allcertificates);
  });
};

export const enterCertificates = async (req, res) => {
  try {
    const newDocument = new certificates({
      image: req.file.path,
    });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const findACertificates = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const document = await certificates.findById(id);
    if (!document)
      return res.status(404).send("No document found with the given ID.");
    const user = await User.findById(req.user.id);
    //to check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // make sure that the login user matches the goal user
    if (document.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deleteACertificates = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(req.user.id);
    //to check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // make sure that the login user matches the goal user
    if (id.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await certificates.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
export const updateACertificates = async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.file.path;
    const certificatesDoc = await certificates.findByIdAndUpdate(id, {
      $set: { image },
    });

    if (!certificatesDoc) {
      return res.status(404).send("Document not found");
    }
    const user = await User.findById(req.user.id);
    //to check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // make sure that the login user matches the goal user
    if (certificatesDoc.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    res.status(200).json("Document updated successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error updating document in the database");
  }
};
