import brisca from "../../lib/brisca";

let join = function(req, res, next) {
	let id = req.identity.id();
	let gameData = req.game.data;
	let b = brisca.deserialize(gameData);
	
	b.join(id);
	if (JSON.stringify(b.serialize()) === JSON.stringify(gameData)) {
		res.json(req.game).flush();
	} else {
		req.game.data = b.serialize();
		req.db.brisca.games.save(req.gameForDb(), function(err, row) {
			if (err) {
				res.sendStatus(503);
				return;
			}
			res.json(row).flush();
		});
	}
};
export default join;
