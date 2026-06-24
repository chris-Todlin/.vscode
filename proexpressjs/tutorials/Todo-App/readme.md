# TODO APP

A nice way to store you task in here and remeber them in a while.

## Directories and files

- Model
- Session
- Log
- Controller
- Routes
- Public
- Views
- Test
- app.js
- reamdme.md
- package.json

## Functionality

1. ### Add Task

    - Add a task by `{name: name, completed: false(as default)}`

2. ### Read Task

    - Read a task `all of them`

3. ### Update todo

    - Update by `mark all as complete`
    - Update by `one as complete`

4. ### Delete Todo

    - Delete `all tasks`, set to the delete tasks.
    - Completely `all tasks`

## Structure of Todo

`
todo: String, required,
completed: false, boolean,
deleted: false, boolean
`

- For the deleted, if the user deletes a todo it does to deleted but still in the database.
- If you navigate in the delete section and completely delete all or one, then it is deleted.

## Technologies used

- [Bootstrap]("https://bootstrap.com")
- [Express]("https://expressjs.com")
- [mongodb]("https://mongodb.com")
- [Nodejs]("https://nodejs.com")

- There is also `express-session, morgan, rotating-file-stream, csurf, cookie-parser,helmet, dotenv, cluster, mongoose, ejs, compression, mocha, chai, errorhandler`.
