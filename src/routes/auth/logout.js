let logout = function(req, res, next) {
	req.identity.forget();
	res.json({success: true}).flush();
};
export default logout;