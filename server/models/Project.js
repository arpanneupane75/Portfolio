// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   technologies: [String],
//   imageUrl: String,
//   liveUrl: String,
//   githubUrl: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Project', projectSchema);
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    liveUrl: { type: String, required: true },  // can be demo video or live link
    githubUrl: { type: String, required: true },
    technologies: [{ type: String }],
    features: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
