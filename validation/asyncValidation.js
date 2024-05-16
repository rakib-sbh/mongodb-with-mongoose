const { Schema, model } = require("mongoose");

const assert = require("assert");

(async () => {
  const userSchema = new Schema({
    name: {
      type: String,
      validate: () => Promise.reject(new Error("Oops!")),
    },
    email: {
      type: String,
      validate: {
        validator: () => Promise.resolve(false),
        message: "Email validation failed",
      },
    },
  });

  const User = model("User", userSchema);
  const user = new User();

  user.email = "test@test.co";
  user.name = "test";

  let error;
  try {
    await user.validate();
  } catch (err) {
    error = err;
  }
  assert.ok(error);
  try {
    assert.equal(
      error.errors["name"].message,
      "Oops",
      error.errors["name"].message
    );
  } catch (error) {
    console.log(error.message);
  }
  try {
    assert.equal(
      error.errors["email"].message,
      "Email validation fail",
      error.errors["email"].message
    );
  } catch (error) {
    console.log(error.message);
  }
})();
