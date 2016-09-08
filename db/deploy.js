var database = require("../es5/configure").database;
var massive = require("massive");
var process = require("process");

//pg.defaults.ssl = true;
//Initialize schema if not exists
var registry = function() {
	var registered = [];
	
	return function(database) {
		if (database === null) {
			if (registered.length === 0) {
				console.log("All databases deployed");
				process.exit(0);
			}
			return;
		}
		registered.push(database);
		console.log("Deploying database " + database);
		return function (err) {
			if (err !== null) {
				console.log(err);
				process.exit(1);
			} else {
				console.log("Database " + database + " deployed.");
				registered = registered.filter(function(db) { return db != database; });
				if (registered.length == 0) {
					console.log("All databases deployed");
					process.exit(0);		
				}
			}
		}
	}
}();

massive.connect({connectionString : database.connection_string}, function(err, db) {
	if (typeof db.membership === "undefined") {
		db.schema.membership(registry("membership"));
	}
	if (typeof db.session === "undefined") {
		db.schema.session(registry("session"));
	}
	if (typeof db.brisca === "undefined") {
		db.schema.brisca(registry("brisca"));
	}
	registry(null);
});
//version migrations?

