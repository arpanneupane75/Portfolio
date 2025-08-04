// // const express = require('express');
// // const Project = require('../models/Project');
// // const auth = require('../middleware/auth');
// // const router = express.Router();

// // // Get all projects (public)
// // router.get('/', async (req, res) => {
// //   try {
// //     const projects = await Project.find();
// //     res.json(projects);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Create project (admin only)
// // router.post('/', auth, async (req, res) => {
// //   try {
// //     const project = new Project(req.body);
// //     await project.save();
// //     res.status(201).json(project);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // //Get Project by Id
// // router.get('/:id', auth, async (req, res) => {
// //   try {
// //     const project = await Project.findById(req.params.id);
// //     res.status(200).json(project);
// //   } catch (err) {
// //     res.status(404).json({ error: 'Project not found' });
// //   }
// // });

// // // Update project (admin only)
// // router.put('/:id', auth, async (req, res) => {
// //   try {
// //     const project = await Project.findByIdAndUpdate(
// //       req.params.id, 
// //       req.body, 
// //       { new: true }
// //     );
// //     res.json(project);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Delete project (admin only)
// // router.delete('/:id', auth, async (req, res) => {
// //   try {
// //     await Project.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Project deleted' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Project = require("../models/Project");

// // GET all projects
// router.get("/", async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET single project by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST create new project
// router.post("/", async (req, res) => {
//   try {
//     const { title, description, technologies, imageUrl, liveUrl, githubUrl } = req.body;

//     const newProject = new Project({
//       title,
//       description,
//       technologies,
//       imageUrl,
//       liveUrl,
//       githubUrl,
//       features: [], // Initialize with empty features array
//     });

//     const savedProject = await newProject.save();
//     res.status(201).json(savedProject);
//   } catch (err) {
//     res.status(400).json({ message: "Invalid data", error: err.message });
//   }
// });

// // PUT update project by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { title, description, technologies, imageUrl, liveUrl, githubUrl } = req.body;

//     const updatedProject = await Project.findByIdAndUpdate(
//       req.params.id,
//       { title, description, technologies, imageUrl, liveUrl, githubUrl },
//       { new: true, runValidators: true }
//     );

//     if (!updatedProject) return res.status(404).json({ message: "Project not found" });
//     res.json(updatedProject);
//   } catch (err) {
//     res.status(400).json({ message: "Invalid data", error: err.message });
//   }
// });

// // DELETE project by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedProject = await Project.findByIdAndDelete(req.params.id);
//     if (!deletedProject) return res.status(404).json({ message: "Project not found" });
//     res.json({ message: "Project deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create new project
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      technologies = [],
      features = [],
      imageUrl = "",
      liveUrl = "",
      githubUrl = "",
    } = req.body;

    const newProject = new Project({
      title,
      description,
      technologies,
      features,
      imageUrl,
      liveUrl,
      githubUrl,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

// PUT update project by ID
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      technologies = [],
      features = [],
      imageUrl = "",
      liveUrl = "",
      githubUrl = "",
    } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        technologies,
        features,
        imageUrl,
        liveUrl,
        githubUrl,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

// DELETE project by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
