/* A one involving the result is an array of objects */
const file = path.resolve(__dirname, `../upload/csv_file-${fileNumber}.csv`);
    const parser = fs.createReadStream(file)
                    .pipe(parse({delimiter: ",", from_line:2}))
    try {
        for await (const row of parser) {
            console.log(row);
        }
        req.flash("info","Uploaded sucessfully");
        res.redirect("/expense/upload-csv")
    } catch (error) {
        next(err);
    }

/* Writing into the csv file now */