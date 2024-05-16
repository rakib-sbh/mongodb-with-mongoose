const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  name: String,
  email: String,
  home: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Person = model("Person", personSchema);

module.exports = Person;
