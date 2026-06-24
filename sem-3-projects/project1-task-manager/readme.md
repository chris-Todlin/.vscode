# Project 1 - Task Manager

## Overview
A small Express + EJS task manager app built for semester 3 project work. Users can sign up, log in, and view the home page with a simple styled UI.

## Features
- Express server with EJS templating
- User signup and login routes
- Static assets served from `public/`
- Custom responsive styling in `public/css/main.css`
- Friendly `404` and `500` error pages

## Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```

## Usage
- Open the app in a browser at `http://localhost:3000`
- Visit `/user/signup` to create a new user
- Visit `/user/login` to sign in

## Files updated
- `public/css/main.css` — improved global styles, layout, form, and error page styles
- `views/partials/main.ejs` — fixed stylesheet path and cleaned header markup
- `views/404.ejs` — added page styling and better navigation
- `views/500.ejs` — added page styling and better navigation
- `readme.md` — project documentation

## Notes
- If the CSS does not appear, ensure the server is running and the `public/` folder is accessible.
- The app uses `express.static` for `public/`, so the stylesheet is available at `/css/main.css`.
