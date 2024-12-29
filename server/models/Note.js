import mongoose from "mongoose";
import User from './User.js';  

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Use 'User' as a string to reference the User model
});

const Note = mongoose.model("Note", noteSchema);

export default Note;

