const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  payment: {
    card: {
      number: {
        type: String,
      },
      cvc: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("User", Schema);
