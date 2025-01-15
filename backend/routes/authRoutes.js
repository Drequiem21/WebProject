const express = require("express");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const router = express.Router();

const plainPassword = "admin";
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(plainPassword, salt);

const admin = {
  username: "admin",
  password: hashedPassword
};


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Έλεγχος username
  if (username !== admin.username) {
    return res.status(401).json({ message: "Λάθος όνομα χρήστη ή κωδικός." });
  }

  // Έλεγχος password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Λάθος όνομα χρήστη ή κωδικός." });
  }

  // Δημιουργία JWT
  const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Λήξη σε 1 ώρα
  });

  res.json({ token });
});

module.exports = router;
