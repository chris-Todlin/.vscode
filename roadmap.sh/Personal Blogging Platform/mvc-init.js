// mvc-init.js
const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();

const folders = [
  "config",
  "controllers",
  "models",
  "routes",
  "views/layouts",
  "views/pages",
  "views/partials",
  "public/css",
  "public/js",
  "public/images",
  "middleware",
  "utils",
  "tests"
];

folders.forEach(folder => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created: ${folder}`);
  }
});

// Create starter view files
const viewFiles = {
  "views/layouts/main.ejs": "<!DOCTYPE html><html><head><title><%= title %></title></head><body><%- body %></body></html>",
  "views/pages/index.ejs": "<h1>Welcome to MVC App</h1>",
  "views/pages/error.ejs": "<h2>Error: <%= message %></h2>",
  "views/partials/header.ejs": "<header><h1>Header</h1></header>",
  "views/partials/footer.ejs": "<footer><p>Footer</p></footer>"
};

for (const [filePath, content] of Object.entries(viewFiles)) {
  const fullPath = path.join(baseDir, filePath);
  fs.writeFileSync(fullPath, content);
  console.log(`📝 Created file: ${filePath}`);
}

console.log("\n🎯 MVC structure initialized successfully!");
