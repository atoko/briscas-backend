import brisca from "../../lib/brisca";

let play = function(req, res, next) {
	debugger;
	let reqCard = req.params.card;
	let gameData = req.game.data;
	let b = brisca.deserialize(gameData);
	//if (b.nextPlayerId() === req.identity.id()) {
		b.play(reqCard);
	//}
	if (JSON.stringify(b.serialize()) === JSON.stringify(gameData)) {
		res.json(req.game).flush();
	} else {
		req.game.data = b.serialize();
 +		delete req.game.player_data;		
		req.db.brisca.games.save(req.game, function(err, row) {
			if (err) {
				res.sendStatus(503);
				return;
			}
			res.json(row).flush();
		});
	}
};
export default play;