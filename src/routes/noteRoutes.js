const express=require("express")
const { getNotes, postNote, updateNote, deleteNote } = require("../controllers/noteController")
const auth = require("../middleware/auth")
const noteRouter=express.Router()


noteRouter.get('/',auth,getNotes)

noteRouter.post("/",auth,postNote)

noteRouter.put('/:id',auth,updateNote)

noteRouter.delete('/:id',auth,deleteNote)

module.exports=noteRouter