let fromDatabase = (db, id, playerId, callback) => {
	db.brisca.vw_games.findOne({id}, (err, row) => {
		if (err || typeof(row) === "undefined") {
			callback(null);
			return;
		}
		let briscas = row;
		let currentTeam = -1;
		for (var index = 0; index < briscas.data.players.length; index++) {
			var player_id = briscas.data.players[index];
			if (player_id === playerId) {
				currentTeam = (index) % briscas.data.tableSize;
			}
		}

		const publicDefault = {
			deckAsset: "1993"
		};		
		briscas.player_data = briscas.data.players.map( (p, i) => {
			let pd = {
				player_id: "bot",
				name: "_Bot_",
				public: publicDefault
			};

			if (briscas.player_data[i]) {
				pd = briscas.player_data[i];
				if (pd.name === null) {
					pd.name = "_Anonymous_";
				}
				if (pd.public === null) {
					pd.public = publicDefault;
				}
				if (pd.private) {
					delete pd.private;
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
	let id = new Number(req.params.id).valueOf();
	fromDatabase(req.db, id, req.identity.id(), (game) => {
		if (game == null) {
			res.json({}).flush();
			return;
		}

		req.game = game;
		if (next.length > 1) {
			next(req, res);
		}
		else {
			next();
		}
	});
};
export { find, fromDatabase };