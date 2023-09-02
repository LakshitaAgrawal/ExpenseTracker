const mongoose = require("mongoose");

const conn = mongoose
  .connect(process.env.ATLAS_URI)
  .then((db) => {
    console.log("Database connected");
    return db;
  })
  .catch((err) => {
    HTMLFormControlsCollection.log("Connection error");
  });

module.exports = conn;
