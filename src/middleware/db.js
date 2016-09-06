import { database } from "../configure";
import pg from "pg";
import massive from "massive";

pg.defaults.ssl = true;

//Initialize schema if not exists
{
	let db =  massive.connectSync({connectionString : database.connection_string});
	if (typeof db.membership === "undefined") {
		db.schema.membership(function(err) { if (err !== null) { console.log(err); }});
	}
	if (typeof db.session === "undefined") {
		db.schema.session(function(err) { if (err !== null) { console.log(err); }});
	}	

	//version migrations?
}

let injectDb = function () {
	let massiveDb =  massive.connectSync({connectionString : database.connection_string});

	return function(req, res, next) {
		req.db = massiveDb;
		next();
	};
};
export default injectDb;