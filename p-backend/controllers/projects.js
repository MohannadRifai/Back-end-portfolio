import asyncHandler from "async-handler";
import projects from "../models/projects.js";
import multer from "multer";
import path from "path";
import { title } from "process";
import User from "../models/user.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    console.log(file);

    const { fieldname, originalname } = file;
    const date = Date.now();
    // filename will be: image-1345923023436343-filename.png
    const filename = `${fieldname}-${date}-${originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const getAllProjects = async (req, res) => {
  console.log("1");
  projects.find({}, (error, allprojects) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(allprojects);
  });
};

export const enterProjects = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  try {
    const newDocument = new projects({
      number: req.body.number,
      image1: req.files[0].filename,
      image2: req.files[1].filename,
      description: req.body.description,
      title: req.body.title,
      link: req.body.link,
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

export const findAProject = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const document = await projects.findById(id);
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

export const deleteAProject = async (req, res) => {
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
    await projects.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const updateAProject = async (req, res) => {
  console.log(1);
  try {
    const id = req.params.id;
    const updateFields = {};

    if (req.body.number) updateFields.number = req.body.number;
    if (req.body.titlet) updateFields.title = req.body.title;
    if (req.files) updateFields.image1 = req.files[0].filename;
    if (req.files) updateFields.image2 = req.files[1].filename;
    if (req.body.link) updateFields.link - req.body.link;
    if (req.body.description) updateFields.description = req.body.description;
    console.log(req.file);
    console.log(req.body);
    const projectDoc = await projects.findByIdAndUpdate(id, {
      $set: updateFields,
    }, { new: true });

    if (!projectDoc) {
      return res.status(404).send("Document not found");
    }
    const user = await User.findById(req.user.id);
    //to check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // make sure that the login user matches the goal user
    if (projectDoc.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    res.status(200).json("Document updated successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error updating document in the database");
  }
};
