import brisca from "../../lib/brisca";

let createNew = function(req, res, next) {
	let game = {
		data: brisca.tableFor(2).join(req.identity.id()).serialize(),
		access: req.body.access
	};

	req.db.brisca.games.save(game, (err, row) => {
		if (err) {
			res.sendStatus(401).flush();
			return;
		}
		res.json({
			success: true,
			id: row.id	
		}).flush();
	});
};
export default createNew;