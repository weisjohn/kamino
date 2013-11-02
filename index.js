
// kamino - a node.js powered cli for cloning lots of repos from Gitlab

var commander = require('commander')
  , fs = require('fs')
  , colors = require('colors')
  ;

// setup 
commander.version('0.0.1')
	.option('-h, --host [IP || DNS]', 'The hostname for Gitlab')
	.option('-t, --token [token]', 'Your account\'s API token')
	.option('-d, --dir [dir]', 'The directory to clone projects into')
	.parse(process.argv);

// validation
["host","token","dir"].forEach(function(k) {
	if (!commander[k]) {
		console.error((k + " is required").red);
		process.exit(1);
	}
});