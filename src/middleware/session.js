import { database } from "../configure";
import session from "express-session";
import pg from "pg";
import connect from "connect-pg-simple";

let injectSession = function() {
	let pgSession = connect(session);
	return session({
		store: new pgSession({
			pg: pg,
			conString: database.connection_string
		}),
		secret: "lembas",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: null
		}
	});
};

export default injectSession;