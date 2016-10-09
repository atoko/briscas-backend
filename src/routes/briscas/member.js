let read = function(req, res, next) {
	let id = req.identity.id();

	res.json(id).flush();
};
export default {read};