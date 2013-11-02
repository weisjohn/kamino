
// kamino - a node.js powered cli for cloning lots of repos from Gitlab

var commander = require('commander')
  , colors = require('colors')
  , fs = require('fs')
  , path = require('path')
  , url = require('url')
  , request = require('request')
  , async = require('async')
  , mkdirp = require('mkdirp')
  ;


// setup
commander.version('0.0.1')
	.option('-h, --host [IP || DNS]', 'The IP address or hostname for Gitlab')
	.option('-s, --secure', 'Use https instead')
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


// verify the `dir` exists
if (!fs.existsSync(path.resolve(commander.dir))) {
	console.error((commander.dir + " doesn't exist").red);
	process.exit(1);
}


// resolve the url
commander.host = "http" + (commander.secure ? "s" : "") + "://" + commander.host + "/api/v3/";
var gitlab = url.parse(commander.host);
if (!gitlab.host) {
	console.error("It appears that `host` is invalid".red);
	process.exit(1);
}


// setup request
var r = request.defaults({ qs : {
	"private_token" : commander.token,
	"per_page" : 100
}, json : true });


// error handling
function handle(cb) {
	return function(err, response, json) {

		if (err && err.code === "ENOTFOUND") {
			console.error('Couldn\'t find Gitlab.'.red);
		} else if (response.body && response.body.error) {
			console.error(response.body.error.red);
		} else {
			return cb(err || response, json);
		}

		process.exit(1);
	}
}


// find projects (we only get 100 at a time)
var projects = [], page = 1, refetch;
async.doWhilst(function(cb) {

	r.get(gitlab.resolve("projects?page=" + page), handle(function(err, p) {
		page++;
		refetch = p.length == 100;
		projects = projects.concat(p);
		cb();
	}));

}, function() {
	return refetch;
}, function() {
	console.log(("Found " + projects.length + " projects to clone.").green);
	cloneall(projects);
});


// clone all the projects
function cloneall(projects) {
	async.eachSeries(projects, clone, function(err, results) {
		if (err) {
			console.log('Failure while cloning'.red);
		} else {
			console.log('Finished');
		}
	});
};

// clone an individual project
function clone(project, callback) {

	async.waterfall([function(cb) {

		// if the namespace exists, make it there
		if (project.namespace && project.namespace.path) {
			var dirpath = path.resolve(commander.dir, project.namespace.path);
			mkdirp(dirpath, function(err, made) {
				if (err) return cb('Failed to make directory: ' + dirpath);
				if (made) console.log(('Made directory: ' + dirpath).green);
				cb(null);
			});
		} else { cb(null); }

	}, function(cb) {

		// clone out the project
		console.log("TODO", "implement this".yellow);
		cb(null);

	}], function(err, results) {
		callback(err, results);
	});

}

