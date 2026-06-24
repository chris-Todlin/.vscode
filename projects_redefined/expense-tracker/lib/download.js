/* Server side example */
app.get("/download", (req, res) => {
  const csvContent = "name,age\nAlice,23\nBob,30";
  res.setHeader("Content-Disposition", "attachment; filename=data.csv");
  res.setHeader("Content-Type", "text/csv");
  res.send(csvContent);
});


/* Client side example */
function downloadCSV(data) {
  const blob = new Blob([data], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";   // filename
  a.click();

  URL.revokeObjectURL(url);  // cleanup
}


app.get("/download-expenses", async (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");
  res.setHeader("Content-Type", "text/csv");

  // Write CSV header
  res.write("date,category,amount\n");

  // Stream results
  const cursor = Expense.find({ userId: req.user.id }).cursor();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    res.write(`${doc.date},${doc.category},${doc.amount}\n`);
  }

  res.end();
});


/* Using cursor */
const cursor = Expense.find({ userId: req.user.id }).cursor();
res.write("date,category,amount\n");
for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  res.write(`${doc.date},${doc.category},${doc.amount}\n`);
}
res.end();


/* Using cursor example */
app.get("/download-expenses", async (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");
  res.setHeader("Content-Type", "text/csv");

  // Example: streaming from DB
  const cursor = db.collection("expenses").find();
  res.write("date,category,amount\n"); // CSV header

  await cursor.forEach(doc => {
    res.write(`${doc.date},${doc.category},${doc.amount}\n`);
  });

  res.end();
});


/* Error Handling */
app.get("/sds",(req,res,next)=>{
    const cursor = Expense.find({ userId: 123 }).cursor();
let doc = await cursor.next();
if (!doc) {
  res.write("No expenses found\n");
  res.end();
  return;
}

})

/* Uploading to db */
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const csv = require("csv-parser");
const fs = require("fs");

app.post("/upload", upload.single("file"), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      results.push(row);
    })
    .on("end", async () => {
      // Insert into MongoDB
      await Expense.insertMany(results);
      res.send("CSV data uploaded successfully!");
    });
});


/* An example buffer */
const express = require('express');
const multer = require('multer');
const csv = require('csv');

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  const buffer = req.file.buffer;

  csv.parse(buffer.toString(), { columns: true }, (err, records) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(records); // parsed CSV rows
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
