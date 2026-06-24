/* Seeding the user */
const express =  require("express");
const fs =  require("fs");

const app = express();

app.get("/users", (req, res) => {
    const readStream = fs.createReadStream("./users.json", "utf-8");
    readStream.pipe(res);
});

app.listen(3000);