const express = require("express");

const router = express.Router();

// Hardcoded credentials (for simplicity)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password";

// Login Page (Ensure `error` is always passed)
router.get("/login", (req, res) => {
    res.render("login", { error: null }); // ✅ Always pass `error`
});

// Handle Login
// Handle Login
router.post("/login", (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            req.session.user = username;
            return res.redirect("/admin");
        }
        
        // If credentials don't match
        res.render("login", { 
            error: "Invalid credentials. Please try again." 
        });

    } catch (error) {
        // Pass errors to Express error handler
        next(error);
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;
