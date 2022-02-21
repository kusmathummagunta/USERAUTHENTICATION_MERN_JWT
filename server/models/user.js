const mongoose = require("mongoose");

//define a model

const user = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "user-data" } //name of the collection
);

const model = mongoose.model("UserData", user); // we create a model with name UserData and schema that is User

module.exports = model; //This model allows us to access and interact with mongoose
