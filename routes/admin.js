const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const ARTICLES_DIR = path.join(__dirname, "../articles");

// Apply authentication middleware to all admin routes
router.use(authMiddleware);

// Admin Dashboard - List all articles
router.get("/admin", (req, res) => {
  fs.readdir(ARTICLES_DIR, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading articles directory.");
    }

    const articles = files.map((file) => {
      const filePath = path.join(ARTICLES_DIR, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return { filename: file, title: content.title, date: content.date };
    });

    res.render("admin", { articles });
  });
});

// New Article Form
router.get("/admin/new", (req, res) => {
  res.render("add");
});

// Create a New Article
router.post("/admin/new", (req, res) => {
  const { title, date, content } = req.body;
  if (!title || !date || !content) {
    return res.status(400).send("All fields are required.");
  }

  const filename = title.toLowerCase().replace(/\s+/g, "-") + ".json";
  const filePath = path.join(ARTICLES_DIR, filename);

  const articleData = { title, date, content };

  fs.writeFile(filePath, JSON.stringify(articleData, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error saving the article.");
    }
    res.redirect("/admin");
  });
});

// Edit Article Form
router.get("/admin/edit/:filename", (req, res) => {
  const filePath = path.join(ARTICLES_DIR, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Article not found.");
  }

  const article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.render("edit", { filename: req.params.filename, article });
});

// Update Article
router.post("/admin/edit/:filename", (req, res) => {
  const filePath = path.join(ARTICLES_DIR, req.params.filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Article not found.");
  }

  const { title, date, content } = req.body;
  if (!title || !date || !content) {
    return res.status(400).send("All fields are required.");
  }

  const updatedArticle = { title, date, content };

  fs.writeFile(filePath, JSON.stringify(updatedArticle, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error updating the article.");
    }
    res.redirect("/admin");
  });
});

// Delete Article
router.post("/admin/delete/:filename", (req, res) => {
  const filePath = path.join(ARTICLES_DIR, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Article not found.");
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send("Error deleting the article.");
    }
    res.redirect("/admin");
  });
});

module.exports = router;
