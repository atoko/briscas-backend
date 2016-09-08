let login = function(req, res, next) {
	let login = req.body;

	if (typeof login === "object") {
		let {
			username,
			password
		} = login;
		if (username === undefined || password === undefined) {
			res.sendStatus(400);
			return;
		}

		req.db.membership.authenticate(username, password, "local", "127.0.0.1",
			function(err, row) {
				if (err) {
					res.status(403).json(err).end();
					return;
				} else {
					let response = row[0].authenticate;
					if (response.success === false) {
						res.status(403).json(response).end();
						return;
					}
					req.identity.persist(response.return_id);
					res.json(response).end();
				}
			}
		);
	} else {
		res.sendStatus(400);
	}
};
export default login;