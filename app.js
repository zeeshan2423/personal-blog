const express = require("express");
const session = require("express-session");
const path = require("path");

const homeRoutes = require("./routes/home");
const guestRoutes = require("./routes/guest");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure views folder is correctly set

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Session configuration
app.use(
  session({
    secret: "my_secret_key", 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// Routes
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/", guestRoutes);
app.use("/", adminRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
