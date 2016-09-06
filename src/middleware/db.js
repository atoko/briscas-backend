import { database } from "../configure";
import massive from "massive";

let injectDb = function () {
	let massiveDb =  massive.connectSync({connectionString : database.connection_string});
	return function(req, res, next) {
		req.db = massiveDb;
		next();
	};
};
export default injectDb;