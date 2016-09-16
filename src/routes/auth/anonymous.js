let anonymous = function(req, res, next) {
	let anon = req.sessionID.slice(0, 8);

	req.db.membership.register(anon, anon, anon, function(err, row) {
		if (err) {
			res.status(403).json(err).end();
			return;
		} else {
			req.db.membership.authenticate(anon, anon, "local", "127.0.0.1",
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
		}
	});
};
export default anonymous;