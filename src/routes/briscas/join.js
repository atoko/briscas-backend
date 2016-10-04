import briscas from '../game';

let join = function(req, res) {
	const gameIds = Object.keys(req.briscaSockets);
	if (gameIds.length > 0) {
		let ids = gameIds.reduce( 
			(p, c) => { return (p == "" ? "" : p + ",") + c; }
		);
		let query = `id IN (${ids}) 
			AND jsonb_array_length(data->'players'::text) = 1
			AND access = 'public'`; 
		req.db.brisca.vw_games.where(query, null, (err, rows) => {
			if (err || typeof(rows) === "undefined") {
				briscas.createNew(req, res);				
				return;
			}

			let found = false;
			rows.forEach((row) => {
				if (!found) {
					found = true;
					req.game = row;
					briscas.join(req, res);
					return;
				}
			});
		});
	} else { 
		briscas.createNew(req, res);
	}	
};
export default join;