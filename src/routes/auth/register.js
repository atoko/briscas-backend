let register = function(req, res, next) {
	let login = req.body;

	if (typeof login === "object") {
		let {
			username,
			password,
			confirm
		} = login;
		if (username === undefined || password === undefined || confirm === undefined) {
			res.sendStatus(400);
			return;
		}

		req.db.membership.register(username, password, confirm, function(err, row) {
			if (err) {
				res.status(403).json(err);
				res.end();
				return;
			} else {
				let response = row[0].register;
				if (response.success === false) {
					res.status(403).json(response);
					return;
				}

				req.identity.persist(response.new_id);
				res.json(response).end();
			}
		});
	} else {
		res.sendStatus(400);
	}
};
export default register;