let login = function(req, res, next) {
	let login = req.body;

	if (typeof login === "object") {
		let {username, password} = login;
		if (username === undefined || password === undefined) {
			res.sendStatus(400);
			return;
		}

		req.db.membership.authenticate(username, password, "local",	"127.0.0.1",
			function(err, row) {
				let response = row[0].authenticate;
				if (err || response.success === false) {
					res.status(403).json(response);
					res.send();
				}
				else {
					let s = req.session;
					s.data = s.data ? s.data : {};
					s.data["player_id"] = response.return_id;
					s.save();			
					res.json(response).send();
				}
			}
		);
	}
	else {
		res.sendStatus(400);
	}
};
export default login;