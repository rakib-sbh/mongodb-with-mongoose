const { Schema, model } = require("mongoose");
const assert = require("assert");
const userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, "User phone number required"],
  },
});

const User = model("user", userSchema);

const user = new User();

let error;

user.phone = "555.0123";
error = user.validateSync();

try {
  assert.equal(
    error.errors["phone"].message,
    "555.0123 is not a valid phone number!",
    error.errors["phone"].message
  );
} catch (error) {
  console.log(error.message);
}

user.phone = "";
error = user.validateSync();

try {
  assert.equal(
    error.errors["phone"].message,
    "User must have phone number",
    error.errors["phone"].message
  );
} catch (error) {
  console.log(error.message);
}
