let fromDatabase = (db, id, playerId, callback) => {
	db.briscas.get(id, (err, row) => {
		if (err || row.length == 0) {
			return;
		}
		let briscas = row[0];
		let currentTeam = -1;
		for (var index = 0; index < briscas.data.players.length; index++) {
			var player_id = briscas.data.players[index];
			if (player_id === playerId) {
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

		callback(briscas);
	});
};

let find = function(req, res, next) {
	let gameForDb = () =>
	{
		let game = {...req.game };
		game.player_data = null;
		delete game.player_data;

		return game;		
	}
	let id = new Number(req.params.id).valueOf();
	fromDatabase(req.db, id, req.identity.id(), (game) => {
		req.game = game;
		req.gameForDb = gameForDb;
		next();
	});
};
export { find, fromDatabase };