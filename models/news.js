const { Schema, model } = require('mongoose');

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, add title to your news'],
      unique: true,
      description: 'News title',
    },
    description: {
      type: String,
      required: false,
      description: 'News description',
    },
    date: {
      type: Date,
      default: Date.now,
      description: 'News creation date',
    },
    link: {
      type: String,
      match:
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      description: 'Link to full news',
    },
  },
  { versionKey: false }
);

const News = model('news', newsSchema);

module.exports = {
  News,
};
