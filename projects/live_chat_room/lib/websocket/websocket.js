module.exports.chat = function(name,password){
    const express = require('express');
    const users = require('../user/users');
    const http = require('http');
    const WebSocket = require('ws'); // web Socket

    // Start he application
    const port = 4000;
    // creat the http serverfrom express
    const server = http.createServer(express);

    const wss = new WebSocket.Server({server});

    /* Function to the real chat app */
    wss.on('connection',(ws)=>{
        // create the nes user there
        users.push({
            userName: name,
            socket: ws
        });

        console.log(users);

        ws.on('message',(data)=>{
            console.log(data);
        });

        ws.on('close',()=>{
            console.log('Client Disconnected');
        })
    });

    // Start the serverlication for revieving end
    server.listen(port,()=>{
        console.log(`Server running at ws://localhost:${port}`);
    });
}