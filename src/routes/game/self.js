let self = function(req, res, next) {
	res.json(req.game).flush();
};
export default self;