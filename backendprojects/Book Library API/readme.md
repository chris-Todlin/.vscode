# Book Library API

- Create a digital book library.
- Use the books as [task](`../Book Library API`)

## Technologies used

1. [Express]("https://express")
2. [Passport]("")
3. [MongoDB]("mongodb://localhost:27017")
4. [Nodejs]("nodejs")
5. [My brain]("chrispinmwakai")

## Procedure

### 1. Book Management

- Add a book `title`, `author`, `genre`, `etc`
- View all the books or a single book
- Update or delete a task

### 2. Authentication

- Sign up new user
- Login user
- log out user

### 3. Task

- Create new task: `title = "Read 1984"`, `description = "book summary"` and optional `category = "ficton, non-fiction, science"` or `status = "completed"`
- Read a task

  - Return all  book for auth user

  - Filter by status or category

  - Retrieve by ID

- Update a task or mark it ad reading or pending/done

- Delete a task

## Steps

1. Package.json creation
2. Npm install `dependencies`
3. app.js - creation `npm start`
4. Create the model of the Book, Task and user
5. Controller for the Book, Task

   - Book router tested and all is well ready for the mounting of the UI
   - Task router done, testing requires the user router
   - User Router created

## Packages

`npm install express ejs consolidate express-handlebars compression morgan rotating-file-server method-override server-favicon express-session cookie-parser mongoose dotenv passport passport-local jsonwebtoken passport-jwt bcrypt csurf helmet bootstrap connect-flash --save`

`npm install forever chai mocha --save-dev`

## Test

`curl -X POST http://localhost:3000/cars \
-H "Content-Type: application/json" \
-d '{"name":"TestCar","speed":0.72}'
`
