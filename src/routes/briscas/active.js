let find = function(req, res, next) {
	const gameIds = Object.keys(req.briscaSockets);
	if (gameIds.length > 0) {
		req.db.brisca.vw_games.find({id : gameIds}, (err, rows) => {		
			res.json(rows).flush();	
		});
	} else {
		res.json([]).flush();		
	}
};
export default find;