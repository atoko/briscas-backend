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
				res.send();
				return;
			} else {
				let response = row[0].register;
				if (response.success === false) {
					res.status(403).json(response);
					return;
				}

				let s = req.session;
				s.data = s.data ? s.data : {};
				s.data["player_id"] = response.new_id;
				s.save();
				res.json(response).send();
			}
		});
	} else {
		res.sendStatus(400);
	}
};
export default register;