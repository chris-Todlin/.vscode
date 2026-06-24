/* This is the main application file of the server */
const express = require("express");
const cluster = require("cluster")
const http = require("http");
const numCPUs = require("os").cpus().length; // return the number of cpus

if(cluster.isPrimary){
    console.log("Fork %s workers(s) from master", numCPUs);
    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }

    // if the cluster is online
    cluster.on('online',function(worker){
        console.log('Worker is running on %s pid', worker.process.pid);
    });
    // on exit
    cluster.on('exit',function(worker,code,signal){
        console.log('Worker with %s is closed', worker.process.pid);
    });
} else if(cluster.isWorker){
    const port = 3000;
    console.log("Worker (%s) is now listneing to http://localhost:%s",cluster.worker.process.pid,port);

    const app = express(); // start the application 
    app.all("/",function(req,res){
        res.send(`Cluster ${cluster.worker.process.pid} responded \n`);
        console.log(req.csrfToken());
    });

    app.listen(port,function(){
    });
}