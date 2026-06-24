# 📝 Personal Blogging Platform API

A RESTful API built to manage and publish articles for a personal blogging platform.  
It supports CRUD operations, user authentication, and flexible filtering options for posts and tags.

---

## 💡 Skills

- CRUD (Create, Read, Update, Delete)
- RESTful API Design
- Server-side Development
- API Documentation (Swagger/OpenAPI)

---

## ⚙️ Technologies Used

- **Express.js** – for building the server and routing requests  
- **Node.js** – runtime environment for executing JavaScript on the server  
- **Database** – MongoDB or SQL for storing articles, users, and metadata  
- **Server-side Logic** – handles requests, validation, and responses  
- **Postman / Thunder Client** – for API testing and debugging  

---

## 🎯 Purpose / Steps

This API enables complete blog management operations:

1. **Return all articles**  
   - Endpoint: `GET /articles`  
   - Supports filtering by date or tags  

2. **Return a single article by ID**  
   - Endpoint: `GET /articles/:id`  

3. **Create a new article**  
   - Endpoint: `POST /articles`  
   - Used to publish new content  

4. **Update an existing article by ID**  
   - Endpoint: `PUT /articles/:id`  

5. **Delete an article by ID**  
   - Endpoint: `DELETE /articles/:id`  

---

## 🧩 Additional Features

- **User Authentication** – JWT-based login and signup  
- **Comments and Likes** – interaction features for posts  
- **Pagination and Search** – efficient data retrieval  
- **Error Handling** – consistent and descriptive responses  
- **Environment Configuration** – `.env` file for sensitive data  

---

## 🧠 Project Setup

### 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/chris-Todlin/personal-blogging-api.git

# Navigate into the project directory
cd personal-blogging-api

# Install dependencies
npm install
