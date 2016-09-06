let anonymous = function(req, res, next) {
	let anon = req.sessionID.slice(0, 8);

	req.db.membership.register(anon, anon, anon, function(err, row) {
		if (err || row[0].register.success === false) {
			res.status(403).json(response);
			res.send();
		}
		else {
			let response = row[0].register;
			let s = req.session;
			s.data = s.data ? s.data : {};
			s.data["player_id"] = response.new_id;
			s.save();			
			res.json(response).send();
		}	
	});
};
export default anonymous;