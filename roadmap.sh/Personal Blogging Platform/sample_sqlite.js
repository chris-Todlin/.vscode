import express from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(passport.initialize());

// 🧩 Initialize SQLite database
const db = new sqlite3.Database("./users.db", err => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database");
});

// 🧱 Create users table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// 🔐 Passport JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    db.get("SELECT * FROM users WHERE username = ?", [jwt_payload.username], (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  })
);

// 🧍 Register (CREATE)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], err => {
    if (err) return res.status(400).json({ message: "User already exists or DB error" });
    res.json({ message: "User registered successfully" });
  });
});

// 🔑 Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
});

// 🧠 Protected Route (READ single user)
app.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, user: req.user });
});

// 📋 READ all users (admin only)
app.get("/users", passport.authenticate("jwt", { session: false }), (req, res) => {
  db.all("SELECT id, username FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
});

// ✏️ UPDATE user password
app.put("/users/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.params.id], function (err) {
    if (err) return res.status(500).json({ message: "Database error" });
    if (this.changes === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Password updated successfully" });
  });
});

// 🗑️ DELETE user
app.delete("/users/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: "Database error" });
    if (this.changes === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
