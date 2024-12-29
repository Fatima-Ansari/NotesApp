import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

// Route to add a new note
router.post("/add", middleware, async (req, res) => {
  try {
   console.log('Request Body:',req.body);
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Create a new note
    const newNote = new Note({
      title,
      description,
      userId: req.user.id, // Use the user ID from middleware
    });

    // Save the note to the database
    await newNote.save();

    return res.status(200).json({
      success: true,
      message: "Note created successfully",
      note: newNote, // Return the created note
    });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({
      success: false,
      message: "Error in adding note",
    });
  }
});

// Route to retrieve all notes
router.get("/", middleware, async (req, res) => {
  try {
    console.log(req.user)
    // Retrieve notes for the logged-in user
    const notes = await Note.find({ userId: req.user.id });

    return res.status(200).json({
      success: true,
      notes})
  } catch (error) {
    console.error("Error retrieving notes:", error);
    return res.status(500).json({
      success: false,
      message: "Error in retrieving notes",
    });
  }
});

// Update Api
router.put('/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const updateNote = await Note.findByIdAndUpdate(id,req.body)
    return res.status(200).json({success: true, updateNote})
  }
   catch(error){
    return res.status(500).json({success: false, message: "Can't update notes"})
   }
})

// delete api
router.delete('/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const updateNote = await Note.findByIdAndDelete(id)
    return res.status(200).json({success: true, updateNote})
  }
   catch(error){
    return res.status(500).json({success: false, message: "Can't delete notes"})
   }
})

export default router;

