const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const articlesDir = path.join(__dirname, "../articles");

// Home page - List all articles
router.get("/", (req, res) => {
    fs.readdir(articlesDir, (err, files) => {
        if (err) {
            return res.status(500).send("Error reading articles");
        }
        
        const articles = files.map(file => {
            const content = JSON.parse(fs.readFileSync(path.join(articlesDir, file)));
            return { title: content.title, date: content.date, slug: file.replace(".json", "") };
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
        
        res.render("home", { articles });
    });
});

// Article page - Display full article
router.get("/article/:slug", (req, res) => {
    const filePath = path.join(articlesDir, `${req.params.slug}.json`);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Article not found");
    }
    
    const article = JSON.parse(fs.readFileSync(filePath));
    res.render("article", { article });
});

module.exports = router;