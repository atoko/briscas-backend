let anonymous = function(req, res, next) {
	let anon = req.sessionID.slice(0, 8);

	req.db.membership.register(anon, anon, anon, function(err, row) {
		let response = row[0].register;
		if (err || response.success === false) {
			res.status(403).json(response);
			res.send();
		}
		else {
			let s = req.session;
			s.data = s.data ? s.data : {};
			s.data["player_id"] = response.new_id;
			s.save();			
			res.json(response).send();
		}	
	});
};
export default anonymous;