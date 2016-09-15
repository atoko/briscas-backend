let get = function(req, res, next) {
	const options = {
		columns: ["id", "email", "first", "last"]
	};
	req.db.membership.members.findOne({ id: req.identity.id() }, options, (err, row) => {
		if (err) {
			res.sendStatus(503);
			return;
		}
		if (!row) {
			res.sendStatus(400);
			return;
		}
		res.json(row).end();
	});
};
export default get;