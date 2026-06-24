# 🧭 Fitness Tracker Backend Roadmap (Backend → Frontend)

Below is a **backend-first roadmap** for your **Fitness Tracker** that you can follow while 
testing everything with **Postman**.
Each item has a **checkbox (☐)** so you can **tick it when done**. ✅

The order is **exactly how a real backend project would grow**.

---

## PHASE 1 — Project Setup

Sounds good 👍 Go for it.

While you try, here’s a **quick checklist you can follow as you build** so you can verify each piece works. You can tick them as you go.

### Setup

✅ Create project folder

✅ Run `npm init -y`

✅ Install dependencies

✅ Create folders (`routes`, `middleware`, `views`, `logs`, `sessions`, `data`)

### Server

✅ Basic **Express** server runs

✅`GET /` route works in browser or **Postman**

### Sessions

✅ Configure **express-session**

✅ Add **session-file-store**

✅ Confirm session files appear in `/sessions`

### Logging

✅ Install **Morgan**

✅ Add rotating logs using **rotating-file-stream**

✅ Confirm `/logs/access.log` is created

### Views

✅ Configure **Express Handlebars**

✅ Create `home.handlebars`

✅ Confirm page renders at `localhost:5000`

### Auth (Next Step)

✅ Create `/register` route

✅ Create `/login` route

✅ Store `userId` in session

✅ Test login using Postman

---

💡 **Tip while testing:**

If something breaks, check in this order:

1️⃣ Terminal errors

2️⃣ Network response in Postman

3️⃣ Whether session files/log files are being created

Those three usually reveal the issue quickly.

---

## PHASE 2 — Basic Server

Goal: Confirm backend runs correctly.

✅ Create basic Express server

✅ Add JSON body parser

✅ Enable CORS

Example test route:

```
GET /health
```

Test in **Postman**

Response:

```json
{ "status": "server running" }
```

---

## PHASE 3 — In-Memory Data Storage

Goal: Store users and workouts in arrays.

✅Create users array

```javascript
const users = []
```

✅ Create workouts array

```javascript
const workouts = []
```

Example workout object:

```json
{
  "id": 1,
  "userId": 1,
  "type": "running",
  "duration": 30,
  "calories": 200,
  "date": "2026-03-14"
}
```

---

## PHASE 4 — User Registration

Goal: Create new accounts.

Route:

```
POST /register
```

Request body (Postman):

```json
{
  "username": "john",
  "password": "1234"
}
```

Tasks:

✅ Create register route

✅ Check if username already exists

✅ Create new user object

✅ Push user into `users` array

✅ Return success message

Example response:

```json
{
  "message": "User created"
}
```

---

## PHASE 5 — Session Authentication

Goal: Create login sessions.

Install:

```
npm install express-session
```

Tasks:

✅Configure session middleware

✅ Create login route

Route:

```
POST /login
```

Request:

```json
{
  "username": "john",
  "password": "1234"
}
```

Logic:

```
Find user
Check password
Create session
Store userId in session
```

Example:

```
req.session.userId = user.id
```

✅ Return login success

---

## PHASE 6 — Auth Middleware

Goal: Protect routes.

Create middleware:

```
middleware/authMiddleware.js
```

Logic:

```
Check if req.session.userId exists
If not → return 401
Else → continue
```

Tasks:

✅  Create middleware

✅  Test protected route

Example route:

```
GET /dashboard
```

---

## PHASE 7 — Workout Logging

Goal: Users log fitness activities.

Route:

```
POST /workouts
```

Request example:

```json
{
  "type": "running",
  "duration": 30,
  "calories": 200
}
```

Tasks:

✅ Create workout object

✅ Attach logged-in user ID

```
userId = req.session.userId
```

✅ Save workout to array

✅ Return success response

---

## PHASE 8 — Fetch User Workouts

Goal: User sees their logs.

Route:

```
GET /workouts
```

Tasks:

✅ Filter workouts by userId

Example logic:

```
workouts.filter(w => w.userId === req.session.userId)
```

✅ Return user workouts

Example response:

```json
[
  {
    "type": "running",
    "duration": 30
  }
]
```

---

# PHASE 9 — Delete Workout

Route:

```
DELETE /workouts/:id
```

Tasks:

☐ Find workout

☐ Check ownership

☐ Remove from array

---

# PHASE 10 — Update Workout

Route:

```
PUT /workouts/:id
```

Tasks:

☐ Find workout

☐ Update fields

☐ Save changes

---

# PHASE 11 — Logout

Route:

```
POST /logout
```

Tasks:

☐ Destroy session

```
req.session.destroy()
```

☐ Return confirmation

---

# PHASE 12 — Frontend Integration

Now connect frontend.

Pages:

☐ Register page
☐ Login page
☐ Dashboard
☐ Workout log form
☐ Workout history list

Frontend calls backend with `fetch`.

Example:

```javascript
fetch("/workouts", {
  credentials: "include"
})
```

---

# PHASE 13 — Later Improvements

Once everything works:

☐ Add password hashing
☐ Replace arrays with database
☐ Add charts for progress
☐ Add workout categories
☐ Add calorie calculator
☐ Add weekly statistics

---

# 🧠 Final API Structure

Your backend will look like this:

```
POST   /register
POST   /login
POST   /logout

GET    /dashboard

POST   /workouts
GET    /workouts
PUT    /workouts/:id
DELETE /workouts/:id
```

---

# ⭐ When Finished

Your project becomes a **full backend fitness API** tested with **Postman** and ready for frontend.

That is already **portfolio-level backend work**.

---

✅ If you want, I can also give you:

* **The cleanest folder structure used by professional Node backends**
* **The 3 backend mistakes beginners make with sessions**
* **A much more impressive feature for your fitness tracker that makes it look like a startup product** (this one is surprisingly simple).


ADDITIONAL
Below is a **practical middleware setup** for your backend that will:

1. **Store sessions in files** (instead of memory)
2. **Log request events** (method, route, time, user session)

This works well for your **fitness tracker backend while testing with Postman**.

---

# 1️⃣ Install Required Packages

You need:

* **Express**
* **express-session**
* **session-file-store**
* **Morgan**

Install them:

```bash
npm install express express-session session-file-store morgan
```

---

# 2️⃣ Session File Storage Middleware

Create a **session configuration** in `server.js`.

```javascript
const express = require("express")
const session = require("express-session")
const FileStore = require("session-file-store")(session)

const app = express()

app.use(express.json())

app.use(
  session({
    store: new FileStore({
      path: "./sessions",
      retries: 0
    }),
    secret: "fitness-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)
```

What this does:

* Creates a **session directory**

```
sessions/
 ├── a83jfh23.json
 ├── l39dj392.json
```

Each file contains session data like:

```json
{
  "cookie": { "maxAge": 86400000 },
  "userId": 1
}
```

---

# 3️⃣ Basic Request Logging Middleware

Use **Morgan** for automatic request logs.

```javascript
const morgan = require("morgan")

app.use(morgan("dev"))
```

Example output in console:

```
POST /login 200 12 ms
GET /workouts 200 5 ms
```

---

# 4️⃣ Custom Event Logger Middleware

Create a file:

```
middleware/logger.js
```

Middleware:

```javascript
function logger(req, res, next) {

  const time = new Date().toISOString()

  console.log(`[${time}] ${req.method} ${req.url}`)

  next()
}

module.exports = logger
```

Use it in server:

```javascript
const logger = require("./middleware/logger")

app.use(logger)
```

Example log:

```
[2026-03-14T10:22:10.123Z] POST /login
```

---

# 5️⃣ Advanced Logger (Includes Session Info)

Better version for authentication tracking.

```javascript
function logger(req, res, next) {

  const time = new Date().toISOString()

  const user = req.session?.userId || "guest"

  console.log(
    `[${time}] ${req.method} ${req.url} | user: ${user}`
  )

  next()
}

module.exports = logger
```

Example output:

```
[2026-03-14T10:23:11Z] POST /login | user: guest
[2026-03-14T10:23:20Z] GET /workouts | user: 1
```

---

# 6️⃣ Authentication Middleware

You also need middleware to **protect routes**.

Create:

```
middleware/auth.js
```

```javascript
function auth(req, res, next) {

  if (!req.session.userId) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  next()
}

module.exports = auth
```

Use it:

```javascript
const auth = require("./middleware/auth")

app.get("/workouts", auth, (req, res) => {
  res.json(workouts)
})
```

---

# 7️⃣ Example Server Structure

```
fitness-tracker-backend
│
├── server.js
│
├── sessions
│
├── middleware
│   ├── auth.js
│   └── logger.js
│
├── routes
│   ├── authRoutes.js
│   └── workoutRoutes.js
│
└── data
    ├── users.js
    └── workouts.js
```

---

# 8️⃣ Example Server Flow

Request:

```
POST /login
```

Flow:

```
Request
  ↓
Logger middleware
  ↓
Session middleware
  ↓
Auth route
  ↓
Session stored in file
```

---

# 9️⃣ Why File Sessions Are Good for Now

Advantages:

✔ survives server restart
✔ simple debugging
✔ good for development

Limitations:

* slower than memory
* not scalable for big apps

Later you would switch to:

* Redis
* database session store

---

✅ With this setup your backend will have:

* **file-based session storage**
* **request event logging**
* **authentication middleware**
* **clean debugging**

That’s already **very close to real production architecture**.

---

If you want, I can also show you **one extremely useful middleware most Node developers add early that automatically logs authentication failures and suspicious requests** (it helps a lot when debugging APIs).
