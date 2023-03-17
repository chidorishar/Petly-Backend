const { Schema, model } = require("mongoose");

const sponsorSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  },
  addressUrl: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  workdays: {
    type: [
        {
          isOpen: { type: String },
          from: { type: String},
          to: { type: String}
        }
      ]
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
}, { versionKey: false, timestamps: true });

const Sponsor = model("sponsor", sponsorSchema);

module.exports = Sponsor;