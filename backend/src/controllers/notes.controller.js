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
    await newNote.save();
    res.json({message: 'Note Saved!!'})
}

NotesController.getNote = async (req,res) => {
    //console.log(req.params.id);
    const note = await Note.findById(req.params.id);
    //console.log(note);
    //res.json({message: 'GET Request'})
    res.json(note);
}

NotesController.updateNote = async (req,res) => {
    const { title, content, author, date } = req.body;
    await Note.findOneAndUpdate(req.params.id, {
        title: title,
        content: content,
        author: author,
        date: date
    });
    res.json({message: 'Note Updating!!!'})
}

NotesController.deleteNote = async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message: 'Note Deleting'})
}

module.exports = NotesController