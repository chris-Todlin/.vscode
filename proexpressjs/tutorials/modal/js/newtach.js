const fs = require("fs");

const readStream = fs.createReadStream("bigfile.txt");
const writeStream = fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("File copied successfully!");
});

app.get("/download", (req, res) => {
  const fileStream = fs.createReadStream("bigfile.csv");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=bigfile.csv");

  fileStream.pipe(res); // stream file directly to client
});

app.post("/upload", (req, res) => {
  const writeStream = fs.createWriteStream("uploaded.txt");
  req.pipe(writeStream);

  req.on("end", () => {
    res.send("Upload complete!");
  });
});
