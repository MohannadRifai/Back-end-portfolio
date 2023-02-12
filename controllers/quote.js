import quote2 from "../models/quote.js";
import User from "../models/user.js";



export const getAllQuote = (req, res) => {
  quote2.find({}, (error, allQuote) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(allQuote);
  });
};

export const enterQuote= async (req, res) => {
  try {
    const newDocument = new quote2({
      quote: req.body.quote,
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

export const findAQuote = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const document = await quote2.findById(id);
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

export const deleteAQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(req.user.id);
    // to check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // make sure that the login user matches the goal user
    if (id.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await quote2.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
export const updateAQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const quote = req.body.quote;
    const quoteDoc = await quote2.findByIdAndUpdate(id, {
      $set: { image },
    });

    if (!quoteDoc) {
      return res.status(404).send("Document not found");
    }
    const user = await User.findById(req.user.id);
    // to check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // make sure that the login user matches the goal user
    if (aboutDoc.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    res.status(200).json("Document updated successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error updating document in the database");
  }
};