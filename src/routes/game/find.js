let find = function(req, res, next) {
	let id = new Number(req.params.id).valueOf(),
		options = {
			columns: ["id", "data"]
		};
	req.db.brisca.games.find(id, options, (err, row) => {
		if (err) {
			res.sendStatus(503);
			return;
		}
		if (!row) {
			res.sendStatus(400);
			return;
		}
		req.game = row;
		next();
	});
};
export default find;