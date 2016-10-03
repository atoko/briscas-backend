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
				console.log(JSON.stringify(err));
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
	let deployBrisca = (callback) => {
		if (typeof db.brisca === "undefined") {
			db.schema.brisca(callback);
		}
	};
	if (typeof db.session === "undefined") {
		db.schema.session(registry("session"));
	}
	if (typeof db.membership === "undefined") {
		let membership = registry("membership");
		let brisca = registry("brisca");
		db.schema.membership(() => { membership(); deployBrisca(brisca);});
	} else {
		deployBrisca(registry("brisca"));	
	}	
	registry(null);
});
//version migrations?

