const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const articlesDir = path.join(__dirname, "../articles");

// Home Page - List all articles
router.get("/", (req, res) => {
    const articles = [];

    fs.readdir(articlesDir, (err, files) => {
        if (err) {
            console.error("Error reading articles directory:", err);
            return res.status(500).send("Internal Server Error");
        }

        files.forEach((file) => {
            const filePath = path.join(articlesDir, file);
            const articleData = JSON.parse(fs.readFileSync(filePath, "utf8"));
            articles.push({ 
                title: articleData.title, 
                date: articleData.date, 
                slug: file.replace(".json", "") 
            });
        });

        res.render("home", { articles });
    });
});

module.exports = router;
