let self = function(req, res, next) {
	res.json(req.game).end();
};
export default self;