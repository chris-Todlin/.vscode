# Project 1 - Task Manager

## Overview
A small Express + EJS task manager app built for semester 3 project work. Users can sign up, log in, and access a protected dashboard. The app uses Passport for authentication and MongoDB for user storage.

## Features
- Express server with EJS templating
- User signup and login routes
- Passport local authentication
- Protected dashboard for authenticated users
- Dynamic header navigation depending on login state
- Inline form feedback for signup/login
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
- After successful login, the user is redirected to `/user/dashboard`
- Authenticated users cannot access `/user/login` or `/user/signup`
- Use the logout button on the dashboard to end the session

## Routes
- `GET /user/signup` — signup page
- `POST /user/signup` — create a new user and log them in
- `GET /user/login` — login page
- `POST /user/login` — authenticate an existing user
- `GET /user/dashboard` — protected user dashboard
- `POST /user/logout` — logout endpoint

## Auth and middleware
- `middleware/auth.js` contains `ensureAuth` and `ensureGuest`
- `lib/setPassort.js` configures Passport serialization, deserialization, and local login strategy
- Signup now returns JSON feedback for the frontend to display inline
- Duplicate usernames return a `409` response and an inline error message
- The dashboard receives the authenticated user from `req.user`

## Updated files
- `routes/user.js` — added login, dashboard, and logout routes with access control
- `middleware/auth.js` — route guards for authenticated and guest users
- `middleware/saveUser.js` — improved signup response handling and Passport login after signup
- `views/login.ejs` — login template with inline feedback
- `views/dashboard.ejs` — protected dashboard template
- `views/partials/main.ejs` — conditional menu for auth state
- `public/js/login.js` — login form submission and feedback handling
- `public/js/formsubmit.js` — improved signup feedback handling
- `public/css/main.css` — dashboard and message styles

## Notes
- Make sure MongoDB is running and configured properly for the app to create and authenticate users.
- If users remain signed in unexpectedly, restart the server and clear cookies.
- The app uses `express-session` to maintain login state between requests.
