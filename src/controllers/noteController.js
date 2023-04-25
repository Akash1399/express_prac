const express = require("express");
const noteModel = require("../model/note");
const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId });
    res.status(200).json({ notes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something is Worng" });
  }
};

const postNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new noteModel({ title, description, userId: req.userId });
    await newNote.save();
    res.status(200).json(newNote);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something is Worng" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await noteModel.findByIdAndRemove(id);
    res.status(202).json(note);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something is Worng" });
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const newNote = {
      title,
      description,
      userId: req.userId,
    };
    await noteModel.findByIdAndUpdate(id, newNote, { new: true });
    res.status(201).json(newNote);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something is Worng" });
  }
};

module.exports = { getNotes, postNote, deleteNote, updateNote };
