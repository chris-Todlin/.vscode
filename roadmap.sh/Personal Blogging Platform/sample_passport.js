import express from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(passport.initialize());

// 🧍 In-memory user store (replace with DB later)
const users = [];

// 🔐 Passport JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    const user = users.find(u => u.username === jwt_payload.username);
    if (user) return done(null, user);
    return done(null, false);
  })
);

// 🧾 Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: "User registered successfully" });
});

// 🔑 Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// 🧠 Protected Route
app.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, user: req.user });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
