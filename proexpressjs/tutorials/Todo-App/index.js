/* This is the main entry with the cluster in details */
const cluster = require("cluster");
const app = require("./app");
const numCPUs = require("os").cpus().length;

// now set the master
if(cluster.isPrimary){
    console.info("Fork %s worker(s) from master", numCPUs);

    // fork them in
    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }

    // if the cluster is online
    cluster.on('online',function(worker){
        console.log("Worker is running on %s pid", worker.process.pid);
    });

    cluster.on('exit',function(worker){
        console.log("Worker with %s is closed.", worker.process.pid);
    });
} else if(cluster.isWorker){
    console.log("Worker (%s) is now on.",cluster.worker.process.pid);

    // function to listem
    /* now set the port and listne */
        const port = app.app.get("port");

        // then listne
        app.app.listen(port, ()=>{
            console.log(`app started using [Worker (${cluster.worker.process.pid})] on port:${port}. more at http://localhost:${port}\n`);
        });
}