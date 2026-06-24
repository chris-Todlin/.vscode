/* 
    This is the file to setup the db by the sqlite3
    Sorry, we use all the things they say, we just do everything lieke anything
*/

const sqlite3 = require("sqlite3");

// connect to sqlite3
const db = new sqlite3.Database("./data/blog.db",err=>{
    if(err) console.error("Database connection error:", err);
    else console.log("Connected to SQLite database");
});

// create the table if it t does not exists
db.run(`
    CREATE TABLE IF NOT EXISTS blogs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        author TEXt,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// export the db
module.exports.db = db;