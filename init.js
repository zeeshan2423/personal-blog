const fs = require("fs");
const path = require("path");

const articlesDir = path.join(__dirname, "articles");

// Check if the directory exists, if not, create it
if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir);
    console.log("📂 'articles' directory created.");
} else {
    console.log("✅ 'articles' directory already exists.");
}

console.log("Setup complete. You can now start the server with: npm start");
