const NotesController = {}
const Note = require('../models/Note');

NotesController.getNotes = async (req,res) => {
    const notes = await Note.find();
    res.json(notes)
}
NotesController.createNotes = async (req,res) => {
    const { title, content, author, date } = req.body;
    const newNote = new Note ({
        title: title,
        content: content,
        author: author,
        date: date
    });
    console.log(newNote);
    await newNote.save();
    res.json({message: 'POST Request'})
}

NotesController.getNote = (req,res) => res.json({message: 'GET Request'})

NotesController.updateNote = (req,res) => res.json({message: 'PUT Request'})

NotesController.deleteNote = (req,res) => res.json({message: 'DELETE Request'})

module.exports = NotesController