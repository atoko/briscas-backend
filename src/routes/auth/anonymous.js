let anonymous = function(req, res, next) {
	let anon = req.sessionID.slice(0, 8);

	req.db.membership.register(anon, anon, anon, function(err, row) {
		if (err) {
			res.status(403).json(err).end();
			return;
		} else {
			let response = row[0].register;
			if (response.success === false) {
				res.status(403).json(response).end();
				return;
			}

			req.identity.persist(response.new_id);
			res.json(response).end();
		}
	});
};
export default anonymous;