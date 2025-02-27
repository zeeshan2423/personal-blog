module.exports = (req, res, next) => {
  console.log("Session data:", req.session);
  if (!req.session.user) {
    console.log("Session lost, redirecting to login...");
    return res.redirect("/login");
  }
  next();
};
