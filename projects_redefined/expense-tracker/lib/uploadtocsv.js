async function writeCSV() {
    
}

/* Some error on the end */
router.get("/download-csv/:id",async (req,res,next)=>{
    // The columns of the csv
    const columns = ['Description','Amount'];

    try {
        const stringifier = stringify({header: true, columns: columns});
        const writeableStream = fs.createWriteStream(file);

        writeableStream.on("finish",()=>{
            console.log("Finished writing CSV file");
        });

        writeableStream.on("error",(error)=>{
            console.error("Write stream error:", error.message);
        });

        await pipeline(
            async function* () {
                // generate data
                for(const row of data) {
                    yield row;
                }
            },
            stringifier,
            writeableStream
        );

        req.flash("info","Fineshed writing the file");
        res.redirect("/expense/");
    } catch (error) {
        next(error);
    }
});