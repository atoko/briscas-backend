
let injectDb = function(req, res, next) {
	req.db = {};
	next();
}

export default injectDb;