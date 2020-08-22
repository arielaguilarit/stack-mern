const { Router } = require('express');
const router = Router();

const { getNotes, createNotes, getNote, updateNote, deleteNote } = require('../controllers/notes.controller');

router.route('/')
    //.get((req,res) => res.send('GET - Notes routes'))
    .get(getNotes)
    .post(createNotes)

    router.route('/:id')
    .get(getNote)
    .delete(deleteNote)
    .put(updateNote)


module.exports = router;