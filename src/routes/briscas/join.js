import briscas from '../game';

let join = function(req, res) {
	const gameIds = Object.keys(req.briscaSockets);
	if (gameIds.length > 0) {
		req.params = {id:gameIds[0]};
		briscas.find(req, res, briscas.join);
	} else { 
		briscas.createNew(req, res);
	}	
};
export default join;