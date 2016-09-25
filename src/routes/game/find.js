let find = function(req, res, next) {
	let id = new Number(req.params.id).valueOf();
	req.db.briscas.get(id, (err, row) => {
		if (err) {
			res.sendStatus(503);
			return;
		}
		if (row.length == 0) {
			res.sendStatus(400);
			return;
		}
		let briscas = row[0];
		let currentTeam = -1;
		for (var index = 0; index < briscas.data.players.length; index++) {
			var player_id = briscas.data.players[index];
			if (player_id === req.identity.id()) {
				currentTeam = (index) % briscas.data.tableSize;
			}
		}
		briscas.player_data = briscas.data.players.map( (p, i) => {
			let pd = {
				player_id: "bot",
				name: "Bot"
			};

			if (briscas.player_data[i]) {
				pd = briscas.player_data[i];
				if (pd.name === null) {
					pd.name = "_Anonymous_";
				}
			}
			pd.team = (i) % briscas.data.tableSize;
			pd.isFriendly = pd.team === currentTeam;

			return pd;
		});

		req.game = briscas;
		next();
	});
};
export default find;