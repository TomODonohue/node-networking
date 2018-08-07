'use strict';
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if(!filename) {
	throw Error('Error: No filename specified');
}

const server = net.createServer(connection => {
	//Reporting
	console.log('Subscriber connected');
	connection.write(JSON.stringify({type: 'watching', file: filename}) + '\n');
  
	//File watcher setup
	const watcher = fs.watch(filename, () => connection.write(JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n'));

	//Cleanup
	connection.on('close', () => {
		console.log('Subscriber disconnected');
		watcher.close();
	});
});

const port = 60300;
server.listen(port, () => console.log(`Listening for subscribers on port: ${port}...`));
