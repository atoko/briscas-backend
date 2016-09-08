import brisca from "../../lib/brisca";

let createNew = function(req, res, next) {
	let game = {
		data: brisca.tableFor(2).join(req.identity.id()).serialize()
	};

	req.db.brisca.games.save(game, (err, row) => {
		res.json({
			success: true,
			id: row.id	
		}).end();
	});
};
export default createNew;