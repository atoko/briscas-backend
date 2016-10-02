let find = function(req, res, next) {
	//res.json(Object.keys(req.briscaSockets)).flush();
	req.db.brisca.vw_games.where("1 = 1", null, (err, rows) => {
		res.json(rows).flush();	
	});
};
export default find;